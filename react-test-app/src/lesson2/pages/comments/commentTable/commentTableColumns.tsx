import type { TableColumn } from "../../../components/table/Table";
import type { Comment } from "../types";
import styles from "./CommentTable.module.css";

export function getCommentTableColumns(
    onDeleteComment: (id: number) => void
): TableColumn<Comment>[] {
    return [
        {
            header: "Name",
            accessor: "name",
            render: (value) => (
                <span className="nameCell">{String(value)}</span>
            ),
        },
        {
            header: "Email",
            accessor: "email",
            render: (value) => (
                <span className="emailCell">{String(value)}</span>
            ),
        },
        {
            header: "Body",
            accessor: "body",
            render: (value) => (
                <span className={styles.bodyCell}>{String(value)}</span>
            ),
        },
        {
            header: "Actions",
            accessor: "id",
            render: (_, row) => (
                <button
                    className="actionButton"
                    title="Delete comment"
                    aria-label="Delete comment"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDeleteComment(row.id);
                    }}
                >
                    &times;
                </button>
            ),
        },
    ];
}
