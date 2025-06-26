import type { FC } from "react";

interface NavigationPanelProps {
    activeLesson: "lesson1" | "lesson2";
    onNavigate: (lesson: "lesson1" | "lesson2") => void;
}

const navItems = [
    { key: "lesson1", label: "Lesson1" },
    { key: "lesson2", label: "Lesson2" },
] as const;

export const NavigationPanel: FC<NavigationPanelProps> = ({
    activeLesson,
    onNavigate,
}) => (
    <nav
        className="fixed top-0 left-0 w-full z-50 bg-white shadow flex items-center justify-center h-16"
        aria-label="Main navigation"
    >
        <ul className="flex gap-6">
            {navItems.map((item) => (
                <li key={item.key}>
                    <button
                        type="button"
                        className={
                            `px-4 py-2 rounded font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition ` +
                            (activeLesson === item.key
                                ? "bg-blue-600 text-white cursor-default"
                                : "bg-transparent text-blue-700 hover:bg-blue-100")
                        }
                        aria-current={
                            activeLesson === item.key ? "page" : undefined
                        }
                        aria-label={`Go to ${item.label}`}
                        tabIndex={0}
                        onClick={() => onNavigate(item.key)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ")
                                onNavigate(item.key);
                        }}
                        disabled={activeLesson === item.key}
                    >
                        {item.label}
                    </button>
                </li>
            ))}
        </ul>
    </nav>
);
