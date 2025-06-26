import React from "react";
import styles from "./Table.module.css";

export type TableColumn<T> = {
    header: string;
    accessor: keyof T;
    render?: (value: unknown, row: T) => React.ReactNode;
};

interface TableProps<T> {
    columns: TableColumn<T>[];
    data: T[];
    onRowClick?: (row: T) => void;
}

export function Table<T extends object>({
    columns,
    data,
    onRowClick,
}: TableProps<T>) {
    return (
        <table className={styles.table}>
            <thead className={styles.thead}>
                <tr>
                    {columns.map((col) => (
                        <th key={col.header} className={styles.th}>
                            {col.header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, i) => (
                    <tr
                        key={i}
                        className={styles.tr}
                        style={onRowClick ? { cursor: "pointer" } : {}}
                        onClick={onRowClick ? () => onRowClick(row) : undefined}
                    >
                        {columns.map((col) => (
                            <td
                                key={String(col.accessor)}
                                className={styles.td}
                            >
                                {col.render
                                    ? col.render(row[col.accessor], row)
                                    : String(row[col.accessor])}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
