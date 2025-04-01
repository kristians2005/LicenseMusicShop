import { useEffect, useState } from "react";

export default function Theme() {
    const [theme, setTheme] = useState(localStorage.theme || "dark");
    const themes = [
        "light",
        "dark",
        "cupcake",
        "bumblebee",
        "emerald",
        "corporate",
        "synthwave",
        "retro",
        "cyberpunk",
        "valentine",
        "halloween",
        "garden",
        "forest",
        "aqua",
        "lofi",
        "pastel",
        "fantasy",
        "wireframe",
        "black",
        "luxury",
        "dracula",
        "cmyk",
        "autumn",
        "business",
        "acid",
        "lemonade",
        "night",
        "coffee",
        "winter",
        "dim",
        "nord",
        "sunset",
    ];

    useEffect(() => {
        localStorage.setItem("theme", theme);
        document.querySelector("html")?.setAttribute("data-theme", theme);
    }, [theme]);

    return (
        <>
            {themes.map((themeOption) => (
                <input
                    key={themeOption}
                    onChange={(e) => setTheme(e.target.value)}
                    type="radio"
                    name="theme-buttons"
                    className="btn theme-controller shadow-md join-item btn-md w-24"
                    data-theme={themeOption}
                    aria-label={themeOption}
                    value={themeOption}
                />
            ))}
        </>
    );
}
