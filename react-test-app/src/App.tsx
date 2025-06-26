import { useState } from "react";
import "./App.css";
// import { Lesson1 } from "./lesson1/Lesson1";
import { Lesson2 } from "./lesson2/Lesson2";
import { Lesson1 } from "./lesson1/Lesson1";
import { NavigationPanel } from "./components/navigation-panel/NavigationPanel";

function App() {
    const [activeLesson, setActiveLesson] = useState<"lesson1" | "lesson2">(
        "lesson2"
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <NavigationPanel
                activeLesson={activeLesson}
                onNavigate={setActiveLesson}
            />
            <main className="pt-16 max-w-screen-2xl mx-auto px-4">
                {activeLesson === "lesson1" && <Lesson1 />}
                {activeLesson === "lesson2" && <Lesson2 />}
            </main>
        </div>
    );
}

export default App;
