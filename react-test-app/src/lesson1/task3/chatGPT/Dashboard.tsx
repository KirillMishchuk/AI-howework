import React, { useState, useEffect } from "react";

function Dashboard() {
    const [d, setD] = useState<number | null>(null);

    useEffect(() => {
        const worker = new Worker(
            new URL("./heavyWorker.ts", import.meta.url),
            { type: "module" }
        );

        worker.onmessage = (e) => {
            setD(e.data);
            worker.terminate();
        };

        worker.postMessage(null);

        return () => worker.terminate();
    }, []);

    return <div>{d}</div>;
}

export { Dashboard as DashboardGPT };
