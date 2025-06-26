import type { TableColumn } from "../../../components/table/Table";
import type { User } from "../types";
import "../../../components/table/Table.module.css";

export function getUserTableColumns(
    onDeleteUser: (id: number) => void
): TableColumn<User>[] {
    return [
        {
            header: "Name / Email",
            accessor: "name",
            render: (_, row) => (
                <>
                    <div className="nameCell">{row.name}</div>
                    <span className="emailCell">{row.email}</span>
                </>
            ),
        },
        {
            header: "Address",
            accessor: "address",
            render: (_, row) => (
                <>
                    {row.address.suite}, {row.address.street},<br />
                    {row.address.city}, {row.address.zipcode}
                </>
            ),
        },
        { header: "Phone", accessor: "phone" },
        {
            header: "Website",
            accessor: "website",
            render: (value) => (
                <span className="linkCell">
                    <a
                        href={`http://${String(value)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {String(value)}
                    </a>
                </span>
            ),
        },
        {
            header: "Company",
            accessor: "company",
            render: (_, row) => row.company.name,
        },
        {
            header: "Actions",
            accessor: "id",
            render: (_, row) => (
                <button
                    className="actionButton"
                    style={{
                        padding: 0,
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        border: "none",
                        background: "#ef4444",
                        color: "#fff",
                        fontSize: "1.5rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        lineHeight: 0,
                        cursor: "pointer",
                        transition: "background 0.2s",
                    }}
                    title="Delete user"
                    aria-label="Delete user"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDeleteUser(row.id);
                    }}
                >
                    &times;
                </button>
            ),
        },
    ];
}
