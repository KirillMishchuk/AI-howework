import { DashboardGPT } from "./chatGPT/Dashboard";
import { DashboardCursor } from "./cursor/Dashboard";
import DashboardChunked from "./cursor/DashboardChunked";

export default function Dashboard() {
    // const [d, setD] = useState<number | null>(null);
    // useEffect(() => {
    //     let t = 0;
    //     for (let i = 0; i < 1e9; i++) {
    //         t += i;
    //     }

    //     setD(t);
    // }, []);
    return (
        <div>
            <DashboardGPT />
            <DashboardCursor />
            <DashboardChunked />
        </div>
    );
}
