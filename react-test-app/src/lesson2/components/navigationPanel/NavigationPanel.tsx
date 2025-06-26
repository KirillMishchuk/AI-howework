import React from "react";
import styles from "./NavigationPanel.module.css";

interface NavigationPanelProps {
    current: "users" | "comments";
    onNavigate: (page: "users" | "comments") => void;
}

const navItems = [
    { key: "users", label: "Users" },
    { key: "comments", label: "Comments" },
] as const;

export const NavigationPanel: React.FC<NavigationPanelProps> = ({
    current,
    onNavigate,
}) => (
    <nav className={styles.nav}>
        {navItems.map((item) => (
            <button
                key={item.key}
                onClick={() => onNavigate(item.key)}
                className={
                    styles.button +
                    (current === item.key ? " " + styles.active : "")
                }
                disabled={current === item.key}
                aria-current={current === item.key ? "page" : undefined}
            >
                {item.label}
            </button>
        ))}
    </nav>
);
