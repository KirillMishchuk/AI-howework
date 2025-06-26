import React, { useState } from "react";
import { UserTable } from "./userTable/UserTable";
import { UserModal } from "./userModal/UserModal";
import type { User } from "./types";
import { useUsers } from "./hooks/useUsers";
import styles from "./userTable/UserTable.module.css";

const UserPage: React.FC = () => {
    const { users, setUsers, loading, error } = useUsers();
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (user: User) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedUser(null), 200); // allow animation to finish
    };
    const deleteUser = (id: number) => {
        setUsers((prev) => prev.filter((u) => u.id !== id));
        if (selectedUser?.id === id) closeModal();
    };

    return (
        <div className={styles.tableContainer}>
            <h2 style={{ marginBottom: "1rem" }}>User Management</h2>
            <div>
                {loading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div style={{ color: "red" }}>{error}</div>
                ) : (
                    <UserTable
                        users={users}
                        onUserClick={openModal}
                        onDeleteUser={deleteUser}
                    />
                )}
            </div>
            <UserModal
                user={selectedUser}
                isOpen={isModalOpen}
                onClose={closeModal}
            />
        </div>
    );
};

export default UserPage;
