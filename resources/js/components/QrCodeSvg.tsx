import { useMemo } from 'react';

interface QrCodeSvgProps {
    value: string;
    size?: number;
    className?: string;
    fgColor?: string;
    bgColor?: string;
}

// Version specs for ECC Level M (Versions 1..8)
// [dataBytes, eccPerBlock, group1Blocks, group1Data, group2Blocks, group2Data, alignCoords]
type VersionSpec = {
    version: number;
    dataCodewords: number;
    eccPerBlock: number;
    blocks: Array<{ count: number; dataCount: number }>;
    align: number[];
};

const VERSION_SPECS_M: VersionSpec[] = [
    {
        version: 1,
        dataCodewords: 16,
        eccPerBlock: 10,
        blocks: [{ count: 1, dataCount: 16 }],
        align: [],
    },
    {
        version: 2,
        dataCodewords: 28,
        eccPerBlock: 16,
        blocks: [{ count: 1, dataCount: 28 }],
        align: [6, 18],
    },
    {
        version: 3,
        dataCodewords: 44,
        eccPerBlock: 26,
        blocks: [{ count: 1, dataCount: 44 }],
        align: [6, 22],
    },
    {
        version: 4,
        dataCodewords: 64,
        eccPerBlock: 18,
        blocks: [{ count: 2, dataCount: 32 }],
        align: [6, 26],
    },
    {
        version: 5,
        dataCodewords: 86,
        eccPerBlock: 24,
        blocks: [{ count: 2, dataCount: 43 }],
        align: [6, 30],
    },
    {
        version: 6,
        dataCodewords: 108,
        eccPerBlock: 16,
        blocks: [{ count: 4, dataCount: 27 }],
        align: [6, 34],
    },
    {
        version: 7,
        dataCodewords: 124,
        eccPerBlock: 18,
        blocks: [{ count: 4, dataCount: 31 }],
        align: [6, 22, 38],
    },
    {
        version: 8,
        dataCodewords: 154,
        eccPerBlock: 22,
        blocks: [
            { count: 2, dataCount: 38 },
            { count: 2, dataCount: 39 },
        ],
        align: [6, 24, 42],
    },
];

// GF(256) log / exp tables with primitive poly 0x11d
const GF_EXP = new Uint8Array(512);
const GF_LOG = new Uint8Array(256);
(() => {
    let x = 1;
    for (let i = 0; i < 255; i++) {
        GF_EXP[i] = x;
        GF_LOG[x] = i;
        x <<= 1;
        if (x & 0x100) {
            x ^= 0x11d;
        }
    }
    for (let i = 255; i < 512; i++) {
        GF_EXP[i] = GF_EXP[i - 255];
    }
})();

function gfMul(a: number, b: number): number {
    if (a === 0 || b === 0) {
        return 0;
    }
    return GF_EXP[GF_LOG[a] + GF_LOG[b]];
}

function computeRsEcc(data: number[], eccCount: number): number[] {
    let gen = [1];
    for (let i = 0; i < eccCount; i++) {
        const next = Array.from({ length: gen.length + 1 }, () => 0);
        const factor = GF_EXP[i];
        for (let j = 0; j < gen.length; j++) {
            next[j] ^= gen[j];
            next[j + 1] ^= gfMul(gen[j], factor);
        }
        gen = next;
    }

    const res = Array.from({ length: eccCount }, () => 0);
    for (const byte of data) {
        const factor = byte ^ res[0];
        res.shift();
        res.push(0);
        for (let i = 0; i < eccCount; i++) {
            res[i] ^= gfMul(gen[i + 1], factor);
        }
    }
    return res;
}

function encodeQrMatrix(text: string): boolean[][] {
    const utf8 = new TextEncoder().encode(text);
    const bytes = Array.from(utf8);
    // Byte mode header for versions 1..9: 4-bit mode (0100) + 8-bit length = 2 bytes overhead
    const spec =
        VERSION_SPECS_M.find((s) => bytes.length + 2 <= s.dataCodewords) ??
        VERSION_SPECS_M[VERSION_SPECS_M.length - 1];

    const maxBytes = spec.dataCodewords - 2;
    const payload = bytes.slice(0, maxBytes);

    // Pack bits: mode 0100 (4), count (8), data bytes, terminator (up to 4 zeros)
    const bits: number[] = [];
    const pushBits = (val: number, len: number) => {
        for (let i = len - 1; i >= 0; i--) {
            bits.push((val >> i) & 1);
        }
    };

    pushBits(0b0100, 4);
    pushBits(payload.length, 8);
    for (const b of payload) {
        pushBits(b, 8);
    }

    const totalDataBits = spec.dataCodewords * 8;
    for (let i = 0; i < 4 && bits.length < totalDataBits; i++) {
        bits.push(0);
    }
    while (bits.length % 8 !== 0) {
        bits.push(0);
    }

    const codewords: number[] = [];
    for (let i = 0; i < bits.length; i += 8) {
        let byte = 0;
        for (let j = 0; j < 8; j++) {
            byte = (byte << 1) | bits[i + j];
        }
        codewords.push(byte);
    }

    const padBytes = [0xec, 0x11];
    let padIdx = 0;
    while (codewords.length < spec.dataCodewords) {
        codewords.push(padBytes[padIdx % 2]);
        padIdx++;
    }

    // Split into RS blocks & interleave
    const dataBlocks: number[][] = [];
    const eccBlocks: number[][] = [];
    let offset = 0;
    for (const grp of spec.blocks) {
        for (let b = 0; b < grp.count; b++) {
            const blockData = codewords.slice(offset, offset + grp.dataCount);
            offset += grp.dataCount;
            dataBlocks.push(blockData);
            eccBlocks.push(computeRsEcc(blockData, spec.eccPerBlock));
        }
    }

    const interleaved: number[] = [];
    const maxDataLen = Math.max(...dataBlocks.map((b) => b.length));
    for (let i = 0; i < maxDataLen; i++) {
        for (const blk of dataBlocks) {
            if (i < blk.length) {
                interleaved.push(blk[i]);
            }
        }
    }
    for (let i = 0; i < spec.eccPerBlock; i++) {
        for (const blk of eccBlocks) {
            interleaved.push(blk[i]);
        }
    }

    const size = 17 + 4 * spec.version;
    const modules: boolean[][] = Array.from({ length: size }, () =>
        Array.from({ length: size }, () => false),
    );
    const isFunction: boolean[][] = Array.from({ length: size }, () =>
        Array.from({ length: size }, () => false),
    );

    const setFunctionModule = (r: number, c: number, dark: boolean) => {
        modules[r][c] = dark;
        isFunction[r][c] = true;
    };

    const drawFinder = (row: number, col: number) => {
        for (let dr = -1; dr <= 7; dr++) {
            for (let dc = -1; dc <= 7; dc++) {
                const rr = row + dr;
                const cc = col + dc;
                if (rr < 0 || rr >= size || cc < 0 || cc >= size) {
                    continue;
                }
                const inOuter =
                    dr >= 0 &&
                    dr <= 6 &&
                    dc >= 0 &&
                    dc <= 6 &&
                    (dr === 0 || dr === 6 || dc === 0 || dc === 6);
                const inInner = dr >= 2 && dr <= 4 && dc >= 2 && dc <= 4;
                setFunctionModule(rr, cc, inOuter || inInner);
            }
        }
    };

    drawFinder(0, 0);
    drawFinder(0, size - 7);
    drawFinder(size - 7, 0);

    // Timing patterns
    for (let i = 8; i < size - 8; i++) {
        setFunctionModule(6, i, i % 2 === 0);
        setFunctionModule(i, 6, i % 2 === 0);
    }

    // Alignment patterns
    for (const r of spec.align) {
        for (const c of spec.align) {
            if (isFunction[r][c]) {
                continue;
            }
            for (let dr = -2; dr <= 2; dr++) {
                for (let dc = -2; dc <= 2; dc++) {
                    const dist = Math.max(Math.abs(dr), Math.abs(dc));
                    setFunctionModule(r + dr, c + dc, dist === 2 || dist === 0);
                }
            }
        }
    }

    // Dark module & reserve format info areas
    setFunctionModule(size - 8, 8, true);
    for (let i = 0; i <= 8; i++) {
        if (!isFunction[8][i]) {
            setFunctionModule(8, i, false);
        }
        if (!isFunction[i][8]) {
            setFunctionModule(i, 8, false);
        }
    }
    for (let i = size - 8; i < size; i++) {
        if (!isFunction[8][i]) {
            setFunctionModule(8, i, false);
        }
        if (!isFunction[i][8]) {
            setFunctionModule(i, 8, false);
        }
    }

    // Version info for versions >= 7
    if (spec.version >= 7) {
        let rem = spec.version;
        for (let i = 0; i < 12; i++) {
            rem = (rem << 1) ^ ((rem >> 11) * 0x1f25);
        }
        const verBits = (spec.version << 12) | rem;
        for (let i = 0; i < 18; i++) {
            const bit = ((verBits >> i) & 1) === 1;
            const a = Math.floor(i / 3);
            const b = size - 11 + (i % 3);
            setFunctionModule(a, b, bit);
            setFunctionModule(b, a, bit);
        }
    }

    // Place data bits in zig-zag
    const allBits: number[] = [];
    for (const cw of interleaved) {
        for (let i = 7; i >= 0; i--) {
            allBits.push((cw >> i) & 1);
        }
    }

    let bitIdx = 0;
    for (let right = size - 1; right >= 1; right -= 2) {
        if (right === 6) {
            right = 5;
        }
        for (let vert = 0; vert < size; vert++) {
            for (let j = 0; j < 2; j++) {
                const c = right - j;
                const upward = ((right + 1) & 2) === 0;
                const r = upward ? size - 1 - vert : vert;
                if (!isFunction[r][c]) {
                    modules[r][c] =
                        bitIdx < allBits.length && allBits[bitIdx] === 1;
                    bitIdx++;
                }
            }
        }
    }

    // Evaluate masks 0..7 and select best mask
    const applyMaskAndFormat = (
        grid: boolean[][],
        mask: number,
    ): boolean[][] => {
        const res = grid.map((row) => [...row]);
        for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
                if (isFunction[r][c]) {
                    continue;
                }
                let invert = false;
                switch (mask) {
                    case 0:
                        invert = (r + c) % 2 === 0;
                        break;
                    case 1:
                        invert = r % 2 === 0;
                        break;
                    case 2:
                        invert = c % 3 === 0;
                        break;
                    case 3:
                        invert = (r + c) % 3 === 0;
                        break;
                    case 4:
                        invert =
                            (Math.floor(r / 2) + Math.floor(c / 3)) % 2 === 0;
                        break;
                    case 5:
                        invert = ((r * c) % 2) + ((r * c) % 3) === 0;
                        break;
                    case 6:
                        invert = (((r * c) % 2) + ((r * c) % 3)) % 2 === 0;
                        break;
                    case 7:
                        invert = (((r + c) % 2) + ((r * c) % 3)) % 2 === 0;
                        break;
                }
                if (invert) {
                    res[r][c] = !res[r][c];
                }
            }
        }

        // Format info: ECC M = 0b00
        const data = (0b00 << 3) | mask;
        let rem = data;
        for (let i = 0; i < 10; i++) {
            rem = (rem << 1) ^ ((rem >> 9) * 0x537);
        }
        const fmt = ((data << 10) | rem) ^ 0x5412;

        for (let i = 0; i <= 5; i++) {
            res[8][i] = ((fmt >> i) & 1) === 1;
        }
        res[8][7] = ((fmt >> 6) & 1) === 1;
        res[8][8] = ((fmt >> 7) & 1) === 1;
        res[7][8] = ((fmt >> 8) & 1) === 1;
        for (let i = 9; i < 15; i++) {
            res[14 - i][8] = ((fmt >> i) & 1) === 1;
        }

        for (let i = 0; i < 8; i++) {
            res[8][size - 1 - i] = ((fmt >> i) & 1) === 1;
        }
        for (let i = 8; i < 15; i++) {
            res[size - 15 + i][8] = ((fmt >> i) & 1) === 1;
        }
        res[size - 8][8] = true;

        return res;
    };

    const scorePenalty = (grid: boolean[][]): number => {
        let penalty = 0;
        for (let r = 0; r < size; r++) {
            let runColor = grid[r][0];
            let runLen = 1;
            for (let c = 1; c < size; c++) {
                if (grid[r][c] === runColor) {
                    runLen++;
                } else {
                    if (runLen >= 5) {
                        penalty += 3 + (runLen - 5);
                    }
                    runColor = grid[r][c];
                    runLen = 1;
                }
            }
            if (runLen >= 5) {
                penalty += 3 + (runLen - 5);
            }
        }
        for (let c = 0; c < size; c++) {
            let runColor = grid[0][c];
            let runLen = 1;
            for (let r = 1; r < size; r++) {
                if (grid[r][c] === runColor) {
                    runLen++;
                } else {
                    if (runLen >= 5) {
                        penalty += 3 + (runLen - 5);
                    }
                    runColor = grid[r][c];
                    runLen = 1;
                }
            }
            if (runLen >= 5) {
                penalty += 3 + (runLen - 5);
            }
        }
        for (let r = 0; r < size - 1; r++) {
            for (let c = 0; c < size - 1; c++) {
                const color = grid[r][c];
                if (
                    color === grid[r][c + 1] &&
                    color === grid[r + 1][c] &&
                    color === grid[r + 1][c + 1]
                ) {
                    penalty += 3;
                }
            }
        }
        return penalty;
    };

    let bestMask = 0;
    let bestScore = Infinity;
    let bestGrid = modules;

    for (let mask = 0; mask < 8; mask++) {
        const candidate = applyMaskAndFormat(modules, mask);
        const score = scorePenalty(candidate);
        if (score < bestScore) {
            bestScore = score;
            bestMask = mask;
            bestGrid = candidate;
        }
    }

    void bestMask;
    return bestGrid;
}

export default function QrCodeSvg({
    value,
    size = 128,
    className = '',
    fgColor = '#16233B',
    bgColor = '#FAF7F0',
}: QrCodeSvgProps) {
    const { moduleCount, pathD } = useMemo(() => {
        const matrix = encodeQrMatrix(value);
        const count = matrix.length;
        const parts: string[] = [];
        for (let r = 0; r < count; r++) {
            for (let c = 0; c < count; c++) {
                if (matrix[r][c]) {
                    parts.push(`M${c},${r}h1v1h-1z`);
                }
            }
        }
        return {
            moduleCount: count,
            pathD: parts.join(''),
        };
    }, [value]);

    const quiet = 2;
    const viewSize = moduleCount + quiet * 2;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox={`0 0 ${viewSize} ${viewSize}`}
            shapeRendering="crispEdges"
            role="img"
            aria-label={`QR Code untuk ${value}`}
            className={className}
        >
            <rect width={viewSize} height={viewSize} fill={bgColor} />
            <path
                d={pathD}
                transform={`translate(${quiet}, ${quiet})`}
                fill={fgColor}
            />
        </svg>
    );
}
