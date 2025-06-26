import { useEffect, useState } from "react";
import axios from "axios";
import type { Comment } from "../types";

export function useComments() {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        axios
            .get<Comment[]>("https://jsonplaceholder.typicode.com/comments")
            .then((res) => setComments(res.data))
            .catch(() => setError("Failed to fetch comments"))
            .finally(() => setLoading(false));
    }, []);

    return { comments, setComments, loading, error };
}
