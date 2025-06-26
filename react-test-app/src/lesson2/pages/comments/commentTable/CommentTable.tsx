import React from "react";
import { Table } from "../../../components/table/Table";
import type { TableColumn } from "../../../components/table/Table";
import type { Comment } from "../types";
import { getCommentTableColumns } from "./commentTableColumns";
import tableStyles from "../../../components/table/Table.module.css";

interface CommentTableProps {
    comments: Comment[];
    onCommentClick: (comment: Comment) => void;
    onDeleteComment: (id: number) => void;
}

export const CommentTable: React.FC<CommentTableProps> = ({
    comments,
    onCommentClick,
    onDeleteComment,
}) => {
    const columns: TableColumn<Comment>[] =
        getCommentTableColumns(onDeleteComment);
    return (
        <div className={tableStyles.responsiveWrapper}>
            <Table
                columns={columns}
                data={comments}
                onRowClick={onCommentClick}
            />
        </div>
    );
};
