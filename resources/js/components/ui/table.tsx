import { cn } from '@/utils';
import type { ReactNode } from 'react';

interface TableProps {
    children: ReactNode;
    className?: string;
}

interface TableHeaderProps {
    children: ReactNode;
    className?: string;
}

interface TableBodyProps {
    children: ReactNode;
    className?: string;
}

interface TableRowProps {
    children: ReactNode;
    className?: string;
}

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
    children?: ReactNode;
    isHeader?: boolean;
    className?: string;
}

function Table({ children, className }: TableProps) {
    return (
        <div className="overflow-x-auto">
            <table className={cn('min-w-full', className)}>{children}</table>
        </div>
    );
}

function TableHeader({ children, className }: TableHeaderProps) {
    return <thead className={className}>{children}</thead>;
}

function TableBody({ children, className }: TableBodyProps) {
    return <tbody className={className}>{children}</tbody>;
}

function TableRow({ children, className }: TableRowProps) {
    return <tr className={className}>{children}</tr>;
}

function TableHead({ children, className, ...props }: TableCellProps) {
    return (
        <th
            className={cn(
                'border-b border-gray-100 px-5 py-3 text-left text-sm font-medium text-gray-500 dark:border-gray-800 dark:text-gray-400',
                className,
            )}
            {...props}
        >
            {children}
        </th>
    );
}

function TableCell({ children, isHeader = false, className, ...props }: TableCellProps) {
    const Tag = isHeader ? 'th' : 'td';
    return (
        <Tag
            className={cn(
                'border-b border-gray-100 px-5 py-4 text-sm text-gray-700 dark:border-gray-800 dark:text-gray-300',
                className,
            )}
            {...props}
        >
            {children}
        </Tag>
    );
}

export { Table, TableBody, TableCell, TableHead, TableHeader, TableRow };
