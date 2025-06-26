import { useState, useEffect } from "react";

export default function DashboardChunked() {
    const [d, setD] = useState<number | null>(null);

    useEffect(() => {
        let t = 0;
        let i = 0;
        const chunkSize = 1000000;
        const maxIterations = 1e9;

        const processChunk = () => {
            const end = Math.min(i + chunkSize, maxIterations);

            while (i < end) {
                t += i;
                i++;
            }

            if (i < maxIterations) {
                requestAnimationFrame(processChunk);
            } else {
                setD(t);
            }
        };

        requestAnimationFrame(processChunk);
    }, []);

    return <div>{d ?? "Computing..."}</div>;
}
