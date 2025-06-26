import React, { useState } from "react";
import { CommentTable } from "./commentTable/CommentTable";
import { useComments } from "./hooks/useComments";
import { CommentModal } from "./commentModal/CommentModal";
import type { Comment } from "./types";
import styles from "./commentTable/CommentTable.module.css";

const CommentsPage: React.FC = () => {
    const { comments, setComments, loading, error } = useComments();
    const [selectedComment, setSelectedComment] = useState<Comment | null>(
        null
    );
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (comment: Comment) => {
        setSelectedComment(comment);
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedComment(null), 200);
    };
    const deleteComment = (id: number) => {
        setComments((prev) => prev.filter((c) => c.id !== id));
        if (selectedComment?.id === id) closeModal();
    };

    return (
        <div className={styles.tableContainer}>
            <h2 style={{ marginBottom: "1rem" }}>Comments</h2>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div style={{ color: "red" }}>{error}</div>
            ) : (
                <CommentTable
                    comments={comments}
                    onCommentClick={openModal}
                    onDeleteComment={deleteComment}
                />
            )}
            <CommentModal
                comment={selectedComment}
                isOpen={isModalOpen}
                onClose={closeModal}
            />
        </div>
    );
};

export default CommentsPage;
