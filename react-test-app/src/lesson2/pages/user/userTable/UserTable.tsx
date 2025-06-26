import React from "react";
import { Table } from "../../../components/table/Table";
import type { TableColumn } from "../../../components/table/Table";
import type { User } from "../types";
import { getUserTableColumns } from "./userTableColumns";
import tableStyles from "../../../components/table/Table.module.css";

interface UserTableProps {
    users: User[];
    onUserClick: (user: User) => void;
    onDeleteUser: (id: number) => void;
}

export const UserTable: React.FC<UserTableProps> = ({
    users,
    onUserClick,
    onDeleteUser,
}) => {
    const columns: TableColumn<User>[] = getUserTableColumns(onDeleteUser);
    return (
        <div className={tableStyles.responsiveWrapper}>
            <Table columns={columns} data={users} onRowClick={onUserClick} />
        </div>
    );
};
