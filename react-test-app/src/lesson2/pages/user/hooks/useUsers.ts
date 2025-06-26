import { useEffect, useState } from "react";
import axios from "axios";
import type { User } from "../types";

export function useUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        axios
            .get<User[]>("https://jsonplaceholder.typicode.com/users")
            .then((res) => setUsers(res.data))
            .catch(() => setError("Failed to fetch users"))
            .finally(() => setLoading(false));
    }, []);

    return { users, setUsers, loading, error };
}
