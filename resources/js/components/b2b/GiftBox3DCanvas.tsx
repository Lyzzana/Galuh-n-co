import { ContactShadows, OrbitControls, RoundedBox } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import type { ParcelItemId } from '@/components/b2b/parcel-catalog';

export interface GiftBox3DCanvasProps {
    boxColor: string;
    ribbonColor: string;
    logoPreviewUrl: string | null;
    isOpen: boolean;
    slots: Array<ParcelItemId | null>;
    activeSlotIndex?: number | null;
    autoRotate?: boolean;
}

// Koordinat 6 kompartemen (3 kolom × 2 baris) di dalam kotak
const SLOT_POSITIONS: ReadonlyArray<readonly [number, number, number]> = [
    [-0.72, -0.32, -0.38],
    [0, -0.32, -0.38],
    [0.72, -0.32, -0.38],
    [-0.72, -0.32, 0.38],
    [0, -0.32, 0.38],
    [0.72, -0.32, 0.38],
];

function ParcelItemMesh({ itemId }: { itemId: ParcelItemId }) {
    switch (itemId) {
        case 'nastar-jar':
            return (
                <group position={[0, 0.24, 0]}>
                    {/* Toples kaca silinder */}
                    <mesh castShadow>
                        <cylinderGeometry args={[0.21, 0.21, 0.42, 24]} />
                        <meshPhysicalMaterial
                            color="#FDFBF7"
                            transparent
                            opacity={0.42}
                            roughness={0.12}
                            transmission={0.35}
                        />
                    </mesh>
                    {/* Isian kue nastar keemasan di dalam */}
                    <mesh position={[0, -0.04, 0]}>
                        <cylinderGeometry args={[0.175, 0.175, 0.28, 20]} />
                        <meshStandardMaterial
                            color="#D99B38"
                            roughness={0.65}
                            metalness={0.05}
                        />
                    </mesh>
                    {/* Label kertas ivory */}
                    <mesh position={[0, 0.01, 0]}>
                        <cylinderGeometry args={[0.214, 0.214, 0.14, 24]} />
                        <meshStandardMaterial color="#F2EBDC" roughness={0.6} />
                    </mesh>
                    {/* Tutup brass */}
                    <mesh position={[0, 0.23, 0]} castShadow>
                        <cylinderGeometry args={[0.22, 0.22, 0.06, 24]} />
                        <meshStandardMaterial
                            color="#A88B54"
                            roughness={0.25}
                            metalness={0.72}
                        />
                    </mesh>
                </group>
            );

        case 'earl-grey-tin':
            return (
                <group position={[0, 0.26, 0]}>
                    {/* Badan kaleng teh Deep Navy */}
                    <mesh castShadow>
                        <cylinderGeometry args={[0.19, 0.19, 0.48, 24]} />
                        <meshStandardMaterial
                            color="#16233B"
                            roughness={0.35}
                            metalness={0.32}
                        />
                    </mesh>
                    {/* Lis emas atas & bawah */}
                    <mesh position={[0, 0.16, 0]}>
                        <cylinderGeometry args={[0.194, 0.194, 0.035, 24]} />
                        <meshStandardMaterial
                            color="#A88B54"
                            roughness={0.25}
                            metalness={0.75}
                        />
                    </mesh>
                    <mesh position={[0, -0.18, 0]}>
                        <cylinderGeometry args={[0.194, 0.194, 0.03, 24]} />
                        <meshStandardMaterial
                            color="#A88B54"
                            roughness={0.25}
                            metalness={0.75}
                        />
                    </mesh>
                    {/* Tutup & kenop emas */}
                    <mesh position={[0, 0.25, 0]} castShadow>
                        <cylinderGeometry args={[0.196, 0.196, 0.04, 24]} />
                        <meshStandardMaterial
                            color="#A88B54"
                            roughness={0.25}
                            metalness={0.75}
                        />
                    </mesh>
                    <mesh position={[0, 0.29, 0]}>
                        <sphereGeometry args={[0.04, 14, 14]} />
                        <meshStandardMaterial
                            color="#D4AF37"
                            roughness={0.2}
                            metalness={0.8}
                        />
                    </mesh>
                </group>
            );

        case 'raw-honey':
            return (
                <group position={[0, 0.22, 0]}>
                    {/* Botol kaca berisi madu amber */}
                    <mesh castShadow>
                        <cylinderGeometry args={[0.18, 0.19, 0.36, 20]} />
                        <meshStandardMaterial
                            color="#C87A19"
                            roughness={0.18}
                            metalness={0.08}
                        />
                    </mesh>
                    {/* Leher botol */}
                    <mesh position={[0, 0.22, 0]} castShadow>
                        <cylinderGeometry args={[0.095, 0.13, 0.1, 20]} />
                        <meshStandardMaterial color="#D98F2B" roughness={0.2} />
                    </mesh>
                    {/* Pita label ivory */}
                    <mesh position={[0, 0, 0]}>
                        <cylinderGeometry args={[0.192, 0.192, 0.12, 20]} />
                        <meshStandardMaterial color="#FAF7F0" roughness={0.6} />
                    </mesh>
                    {/* Tutup brass */}
                    <mesh position={[0, 0.28, 0]} castShadow>
                        <cylinderGeometry args={[0.105, 0.105, 0.055, 20]} />
                        <meshStandardMaterial
                            color="#A88B54"
                            roughness={0.28}
                            metalness={0.7}
                        />
                    </mesh>
                </group>
            );

        case 'scented-candle':
            return (
                <group position={[0, 0.19, 0]}>
                    {/* Wadah keramik Warm Ivory */}
                    <mesh castShadow>
                        <cylinderGeometry args={[0.2, 0.18, 0.36, 24]} />
                        <meshStandardMaterial
                            color="#F2EBDC"
                            roughness={0.45}
                            metalness={0.04}
                        />
                    </mesh>
                    {/* Lis brass tipis di badan keramik */}
                    <mesh position={[0, 0.08, 0]}>
                        <cylinderGeometry args={[0.203, 0.2, 0.025, 24]} />
                        <meshStandardMaterial
                            color="#A88B54"
                            roughness={0.25}
                            metalness={0.72}
                        />
                    </mesh>
                    {/* Permukaan lilin & sumbu */}
                    <mesh position={[0, 0.175, 0]}>
                        <cylinderGeometry args={[0.18, 0.18, 0.02, 24]} />
                        <meshStandardMaterial color="#E6D5B8" roughness={0.5} />
                    </mesh>
                    <mesh position={[0, 0.205, 0]}>
                        <cylinderGeometry args={[0.012, 0.012, 0.05, 10]} />
                        <meshStandardMaterial color="#2C1E16" roughness={0.9} />
                    </mesh>
                </group>
            );

        case 'brass-mug':
            return (
                <group position={[-0.03, 0.2, 0]}>
                    {/* Badan cangkir porselen Deep Navy */}
                    <mesh castShadow>
                        <cylinderGeometry args={[0.18, 0.16, 0.38, 24]} />
                        <meshStandardMaterial
                            color="#16233B"
                            roughness={0.28}
                            metalness={0.18}
                        />
                    </mesh>
                    {/* Lis emas di bibir cangkir */}
                    <mesh
                        position={[0, 0.185, 0]}
                        rotation={[Math.PI / 2, 0, 0]}
                    >
                        <torusGeometry args={[0.178, 0.014, 12, 28]} />
                        <meshStandardMaterial
                            color="#A88B54"
                            roughness={0.22}
                            metalness={0.8}
                        />
                    </mesh>
                    {/* Gagang cangkir emas */}
                    <mesh position={[0.19, 0.01, 0]} rotation={[0, 0, 0]}>
                        <torusGeometry args={[0.095, 0.02, 12, 24, Math.PI]} />
                        <meshStandardMaterial
                            color="#A88B54"
                            roughness={0.25}
                            metalness={0.75}
                        />
                    </mesh>
                </group>
            );

        case 'dark-chocolate':
            return (
                <group position={[0, 0.14, 0]} rotation={[0.12, 0.18, 0]}>
                    {/* Kotak cokelat tipis elegan */}
                    <RoundedBox
                        args={[0.42, 0.11, 0.56]}
                        radius={0.02}
                        smoothness={3}
                        castShadow
                    >
                        <meshStandardMaterial
                            color="#3B2318"
                            roughness={0.48}
                            metalness={0.1}
                        />
                    </RoundedBox>
                    {/* Sleeve foil emas di tengah */}
                    <mesh position={[0, 0, 0]}>
                        <boxGeometry args={[0.43, 0.118, 0.16]} />
                        <meshStandardMaterial
                            color="#A88B54"
                            roughness={0.28}
                            metalness={0.7}
                        />
                    </mesh>
                </group>
            );
    }
}

function LuxuryGiftBoxScene({
    boxColor,
    ribbonColor,
    logoPreviewUrl,
    isOpen,
    slots,
    activeSlotIndex,
}: Omit<GiftBox3DCanvasProps, 'autoRotate'>) {
    const [logoTexture, setLogoTexture] = useState<THREE.Texture | null>(null);
    const lidGroupRef = useRef<THREE.Group>(null);
    const openProgressRef = useRef(0);

    useEffect(() => {
        if (!logoPreviewUrl) {
            setLogoTexture(null);
            return;
        }

        let disposed = false;
        const loader = new THREE.TextureLoader();
        const texture = loader.load(logoPreviewUrl, (loaded) => {
            if (!disposed) {
                loaded.colorSpace = THREE.SRGBColorSpace;
                loaded.needsUpdate = true;
                setLogoTexture(loaded);
            } else {
                loaded.dispose();
            }
        });

        return () => {
            disposed = true;
            texture.dispose();
        };
    }, [logoPreviewUrl]);

    useFrame((_state, delta) => {
        const lidGroup = lidGroupRef.current;
        if (!lidGroup) {
            return;
        }

        const target = isOpen ? 1 : 0;
        openProgressRef.current = THREE.MathUtils.damp(
            openProgressRef.current,
            target,
            5.5,
            delta,
        );
        const t = openProgressRef.current;

        // Angkat sedikit terlebih dulu lalu geser menyamping dengan kemiringan elegan
        const liftPhase = Math.min(1, t * 1.45);
        const slidePhase = Math.max(0, (t - 0.18) / 0.82);

        lidGroup.position.y = 0.25 + liftPhase * 0.48 - slidePhase * 0.65;
        lidGroup.position.x = slidePhase * 1.95;
        lidGroup.position.z = -slidePhase * 0.45;
        lidGroup.rotation.z = -slidePhase * 0.42;
        lidGroup.rotation.y = slidePhase * 0.18;
    });

    const boxWidth = 2.4;
    const boxDepth = 1.65;
    const baseHeight = 0.72;
    const wallThickness = 0.08;

    return (
        <group position={[0, 0.15, 0]}>
            {/* ── Base Kotak Terbuka dengan Sekat Partisi 3×2 ── */}
            <group position={[0, 0, 0]}>
                {/* Alas Bawah */}
                <mesh position={[0, -0.35, 0]} castShadow receiveShadow>
                    <boxGeometry args={[boxWidth, 0.08, boxDepth]} />
                    <meshStandardMaterial
                        color={boxColor}
                        roughness={0.58}
                        metalness={0.08}
                    />
                </mesh>

                {/* Liner Kain Satin Lembut di Dalam Alas */}
                <mesh position={[0, -0.3, 0]} receiveShadow>
                    <boxGeometry
                        args={[boxWidth - 0.18, 0.025, boxDepth - 0.18]}
                    />
                    <meshStandardMaterial color="#E9DFC9" roughness={0.85} />
                </mesh>

                {/* 4 Dinding Kotak */}
                {/* Depan & Belakang */}
                <mesh
                    position={[0, -0.01, boxDepth / 2 - wallThickness / 2]}
                    castShadow
                    receiveShadow
                >
                    <boxGeometry args={[boxWidth, baseHeight, wallThickness]} />
                    <meshStandardMaterial
                        color={boxColor}
                        roughness={0.58}
                        metalness={0.08}
                    />
                </mesh>
                <mesh
                    position={[0, -0.01, -(boxDepth / 2 - wallThickness / 2)]}
                    castShadow
                    receiveShadow
                >
                    <boxGeometry args={[boxWidth, baseHeight, wallThickness]} />
                    <meshStandardMaterial
                        color={boxColor}
                        roughness={0.58}
                        metalness={0.08}
                    />
                </mesh>
                {/* Kiri & Kanan */}
                <mesh
                    position={[-(boxWidth / 2 - wallThickness / 2), -0.01, 0]}
                    castShadow
                    receiveShadow
                >
                    <boxGeometry args={[wallThickness, baseHeight, boxDepth]} />
                    <meshStandardMaterial
                        color={boxColor}
                        roughness={0.58}
                        metalness={0.08}
                    />
                </mesh>
                <mesh
                    position={[boxWidth / 2 - wallThickness / 2, -0.01, 0]}
                    castShadow
                    receiveShadow
                >
                    <boxGeometry args={[wallThickness, baseHeight, boxDepth]} />
                    <meshStandardMaterial
                        color={boxColor}
                        roughness={0.58}
                        metalness={0.08}
                    />
                </mesh>

                {/* Lis Brass Collar Interior */}
                <mesh position={[0, 0.34, 0]}>
                    <boxGeometry
                        args={[boxWidth - 0.04, 0.04, boxDepth - 0.04]}
                    />
                    <meshStandardMaterial
                        color="#A88B54"
                        roughness={0.28}
                        metalness={0.7}
                        wireframe={false}
                        visible={false}
                    />
                </mesh>

                {/* Sekat Partisi Interior 3×2 */}
                {/* Sekat Tengah Horizontal (membagi 2 baris) */}
                <mesh position={[0, -0.14, 0]} receiveShadow>
                    <boxGeometry args={[boxWidth - 0.16, 0.36, 0.035]} />
                    <meshStandardMaterial
                        color="#A88B54"
                        roughness={0.42}
                        metalness={0.45}
                    />
                </mesh>
                {/* 2 Sekat Vertikal (membagi 3 kolom) */}
                <mesh position={[-0.38, -0.14, 0]} receiveShadow>
                    <boxGeometry args={[0.035, 0.36, boxDepth - 0.16]} />
                    <meshStandardMaterial
                        color="#A88B54"
                        roughness={0.42}
                        metalness={0.45}
                    />
                </mesh>
                <mesh position={[0.38, -0.14, 0]} receiveShadow>
                    <boxGeometry args={[0.035, 0.36, boxDepth - 0.16]} />
                    <meshStandardMaterial
                        color="#A88B54"
                        roughness={0.42}
                        metalness={0.45}
                    />
                </mesh>

                {/* Pita Samping pada Base */}
                <mesh position={[0, -0.02, 0]} castShadow>
                    <boxGeometry args={[boxWidth + 0.03, 0.72, 0.18]} />
                    <meshStandardMaterial
                        color={ribbonColor}
                        roughness={0.28}
                        metalness={0.52}
                    />
                </mesh>
                <mesh position={[0, -0.02, 0]} castShadow>
                    <boxGeometry args={[0.18, 0.72, boxDepth + 0.03]} />
                    <meshStandardMaterial
                        color={ribbonColor}
                        roughness={0.28}
                        metalness={0.52}
                    />
                </mesh>

                {/* ── 6 Slot Isi Parsel Modular ── */}
                {SLOT_POSITIONS.map((pos, index) => {
                    const itemId = slots[index] ?? null;
                    const isHighlighted = isOpen && activeSlotIndex === index;
                    return (
                        <group key={index} position={[pos[0], pos[1], pos[2]]}>
                            {isOpen && (
                                <mesh
                                    position={[0, 0.035, 0]}
                                    rotation={[-Math.PI / 2, 0, 0]}
                                >
                                    <ringGeometry args={[0.21, 0.25, 24]} />
                                    <meshBasicMaterial
                                        color={
                                            isHighlighted
                                                ? '#A88B54'
                                                : itemId
                                                  ? '#A88B54'
                                                  : '#6E675D'
                                        }
                                        transparent
                                        opacity={isHighlighted ? 0.95 : 0.35}
                                    />
                                </mesh>
                            )}
                            {itemId && <ParcelItemMesh itemId={itemId} />}
                        </group>
                    );
                })}
            </group>

            {/* ── Grup Tutup Kotak + Pita Simpul + Logo Perusahaan (Animated) ── */}
            <group ref={lidGroupRef} position={[0, 0.25, 0]}>
                <RoundedBox
                    args={[boxWidth + 0.09, 0.24, boxDepth + 0.09]}
                    position={[0, 0.21, 0]}
                    radius={0.04}
                    smoothness={4}
                    castShadow
                    receiveShadow
                >
                    <meshStandardMaterial
                        color={boxColor}
                        roughness={0.54}
                        metalness={0.08}
                    />
                </RoundedBox>

                {/* Pita Tutup */}
                <mesh position={[0, 0.215, 0]} castShadow>
                    <boxGeometry args={[boxWidth + 0.13, 0.25, 0.18]} />
                    <meshStandardMaterial
                        color={ribbonColor}
                        roughness={0.28}
                        metalness={0.52}
                    />
                </mesh>
                <mesh position={[0, 0.215, 0]} castShadow>
                    <boxGeometry args={[0.18, 0.25, boxDepth + 0.13]} />
                    <meshStandardMaterial
                        color={ribbonColor}
                        roughness={0.28}
                        metalness={0.52}
                    />
                </mesh>

                {/* Simpul Pita Satin */}
                <group position={[0, 0.39, 0]}>
                    <mesh castShadow>
                        <sphereGeometry args={[0.1, 18, 18]} />
                        <meshStandardMaterial
                            color={ribbonColor}
                            roughness={0.26}
                            metalness={0.56}
                        />
                    </mesh>

                    {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map(
                        (angle, idx) => (
                            <group
                                key={idx}
                                rotation={[0, angle + Math.PI / 4, 0]}
                            >
                                <mesh
                                    position={[0.2, 0.06, 0]}
                                    rotation={[0.4, 0, -0.35]}
                                    scale={[1.2, 0.75, 0.9]}
                                    castShadow
                                >
                                    <torusGeometry
                                        args={[0.15, 0.04, 14, 24]}
                                    />
                                    <meshStandardMaterial
                                        color={ribbonColor}
                                        roughness={0.26}
                                        metalness={0.56}
                                    />
                                </mesh>
                            </group>
                        ),
                    )}
                </group>

                {/* Corporate Logo Foil Plate */}
                {logoTexture && (
                    <group
                        position={[0.66, 0.342, 0.44]}
                        rotation={[-Math.PI / 2, 0, 0]}
                    >
                        <mesh position={[0, 0, -0.004]}>
                            <planeGeometry args={[0.6, 0.4]} />
                            <meshStandardMaterial
                                color="#A88B54"
                                roughness={0.3}
                                metalness={0.7}
                            />
                        </mesh>
                        <mesh position={[0, 0, 0.002]}>
                            <planeGeometry args={[0.54, 0.34]} />
                            <meshStandardMaterial
                                map={logoTexture}
                                transparent
                                roughness={0.35}
                                metalness={0.1}
                            />
                        </mesh>
                    </group>
                )}
            </group>
        </group>
    );
}

export default function GiftBox3DCanvas({
    boxColor,
    ribbonColor,
    logoPreviewUrl,
    isOpen,
    slots,
    activeSlotIndex = null,
    autoRotate = true,
}: GiftBox3DCanvasProps) {
    return (
        <Canvas
            shadows
            dpr={[1, 1.5]}
            camera={{ position: [3.2, 2.75, 3.6], fov: 38 }}
            className="h-full w-full"
        >
            <ambientLight intensity={0.8} />
            <directionalLight
                position={[4, 6, 4]}
                intensity={1.5}
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
            />
            <directionalLight
                position={[-4, 3, -3]}
                intensity={0.65}
                color="#F2EBDC"
            />
            <pointLight position={[0, 3, 2]} intensity={0.45} color="#A88B54" />

            <LuxuryGiftBoxScene
                boxColor={boxColor}
                ribbonColor={ribbonColor}
                logoPreviewUrl={logoPreviewUrl}
                isOpen={isOpen}
                slots={slots}
                activeSlotIndex={activeSlotIndex}
            />

            <ContactShadows
                position={[0, -0.28, 0]}
                opacity={0.45}
                scale={7.5}
                blur={2.2}
                far={3}
                frames={1}
                color="#09101D"
            />

            <OrbitControls
                enablePan={false}
                minDistance={2.5}
                maxDistance={6.6}
                maxPolarAngle={Math.PI / 2 - 0.05}
                autoRotate={autoRotate}
                autoRotateSpeed={1.0}
            />
        </Canvas>
    );
}
