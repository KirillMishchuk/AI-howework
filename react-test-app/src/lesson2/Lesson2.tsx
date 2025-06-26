import { useState } from "react";
import UserPage from "./pages/user/UserPage";
import CommentsPage from "./pages/comments/CommentsPage";
import { NavigationPanel } from "./components/navigationPanel/NavigationPanel";

export const Lesson2 = () => {
    const [page, setPage] = useState<"users" | "comments">("users");
    return (
        <>
            <NavigationPanel current={page} onNavigate={setPage} />
            {page === "users" ? <UserPage /> : <CommentsPage />}
        </>
    );
};
