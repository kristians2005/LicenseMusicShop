import React, { useState } from "react";
import DarkModeSwitch from "../HOCs/darkModeSwitch";

export default function Switcher({ className = "" }: { className?: string }) {
    const [colorTheme, setTheme] = DarkModeSwitch();
    const [darkSide, setDarkSide] = useState(
        colorTheme === "light" ? true : false
    );

    const toggleDarkMode = () => {
        const newTheme = colorTheme === "light" ? "dark" : "light";
        setTheme(newTheme);
        setDarkSide(!darkSide);
    };

    return (
        <div className={className}>
            <button
                className="flex gap-2 items-center"
                onClick={toggleDarkMode}
            >
                <img
                    className="brightness-50"
                    src={
                        darkSide
                            ? "/images/icons/light_mode.svg"
                            : "/images/icons/dark_mode.svg"
                    }
                    alt="theme"
                />
                {darkSide ? "Light" : "Dark"} theme
            </button>
        </div>
    );
}
