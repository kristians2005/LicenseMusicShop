import { useEffect, useState } from "react";

const themes = [
    "light",
    "dark",
    "aqua",
    "cupcake",
    "cyberpunk",
    "synthwave",
    "dracula",
    "luxury",
    "coffee",
    "valentine",
    "night",
    "winter",
];

// Theme color indicators
const themeColors: { [key: string]: string } = {
    light: "#1e40af", // blue-800
    dark: "#1e293b", // slate-800
    aqua: "#7dd3fc", // sky-400
    cupcake: "#ff8ba7", // pink-400
    cyberpunk: "#f0db4f", // yellow-400
    synthwave: "#ff00ff", // magenta-400
    dracula: "#bd93f9", // purple-400
    luxury: "#b8860b", // darkgoldenrod
    coffee: "#8b4513", // saddlebrown
    valentine: "#ff69b4", // hotpink
    night: "#1a1a1a", // near-black
    winter: "#e2e8f0", // slate-200
};

export default function ThemeSwitcher() {
    const [currentTheme, setCurrentTheme] = useState<string>("light");

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "light";
        setCurrentTheme(savedTheme);
        document.documentElement.setAttribute("data-theme", savedTheme);
    }, []);

    const handleThemeChange = (theme: string) => {
        setCurrentTheme(theme);
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    };

    return (
        <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle btn-sm">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                    />
                </svg>
            </label>
            <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow-lg bg-base-100 rounded-box w-52 max-w-xs sm:w-52"
                style={{ minWidth: "12rem" }}
            >
                <li className="menu-title">
                    <span>Choose Theme</span>
                </li>
                <div className="flex flex-wrap gap-1 sm:flex-col">
                    {themes.map((theme) => (
                        <button
                            key={theme}
                            className={`capitalize flex items-center gap-2 px-2 py-1 rounded ${
                                currentTheme === theme
                                    ? "active bg-primary/10"
                                    : ""
                            }`}
                            onClick={() => handleThemeChange(theme)}
                        >
                            <div
                                className="w-1 h-5 rounded-full"
                                style={{ backgroundColor: themeColors[theme] }}
                            />
                            {theme}
                        </button>
                    ))}
                </div>
            </ul>
        </div>
    );
}
