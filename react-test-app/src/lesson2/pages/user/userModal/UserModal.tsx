import React from "react";
import { Modal } from "../../../components/modal/Modal";
import type { User } from "../types";
import modalStyles from "./UserModal.module.css";

interface UserModalProps {
    user: User | null;
    isOpen: boolean;
    onClose: () => void;
}

export const UserModal: React.FC<UserModalProps> = ({
    user,
    isOpen,
    onClose,
}) => (
    <Modal isOpen={isOpen} onClose={onClose}>
        <button
            className={modalStyles.closeButton}
            onClick={onClose}
            aria-label="Close"
        >
            &times;
        </button>
        {user && (
            <div>
                <div className={modalStyles.modalHeader}>{user.name}</div>
                <a
                    href={`mailto:${user.email}`}
                    className={modalStyles.emailLink}
                >
                    {user.email}
                </a>

                <div className={modalStyles.sectionTitle}>Address</div>
                <div className={modalStyles.section}>
                    {user.address.suite}, {user.address.street}
                    <br />
                    {user.address.city}, {user.address.zipcode}
                    <br />
                    <a
                        href={`https://www.google.com/maps/search/?api=1&query=${user.address.geo.lat},${user.address.geo.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={modalStyles.mapLink}
                    >
                        <span className={modalStyles.mapIcon}>📍</span> View on
                        map
                    </a>
                </div>

                <div className={modalStyles.sectionTitle}>Contact</div>
                <div className={modalStyles.section}>
                    <span className={modalStyles.label}>Phone:</span>{" "}
                    {user.phone}
                    <br />
                    <span className={modalStyles.label}>Website:</span>{" "}
                    <a
                        href={`http://${user.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#2563eb" }}
                    >
                        {user.website}
                    </a>
                </div>

                <div className={modalStyles.sectionTitle}>Company</div>
                <div className={modalStyles.section}>
                    <span className={modalStyles.label}>Name:</span>{" "}
                    {user.company.name}
                    <br />
                    <span className={modalStyles.label}>Catchphrase:</span>{" "}
                    {user.company.catchPhrase}
                    <br />
                    <span className={modalStyles.label}>Business:</span>{" "}
                    {user.company.bs}
                </div>
            </div>
        )}
    </Modal>
);
