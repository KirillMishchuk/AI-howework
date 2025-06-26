import React from "react";
import { Modal } from "../../../components/modal/Modal";
import type { Comment } from "../types";
import modalStyles from "./CommentModal.module.css";

interface CommentModalProps {
    comment: Comment | null;
    isOpen: boolean;
    onClose: () => void;
}

export const CommentModal: React.FC<CommentModalProps> = ({
    comment,
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
        {comment && (
            <div>
                <div className={modalStyles.modalHeader}>{comment.name}</div>
                <a
                    href={`mailto:${comment.email}`}
                    className={modalStyles.emailLink}
                >
                    {comment.email}
                </a>
                <div className={modalStyles.body}>{comment.body}</div>
            </div>
        )}
    </Modal>
);
