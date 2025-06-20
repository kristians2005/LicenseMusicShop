import { useEffect, useState } from "react";

export default function FontSize() {
    const [fontSize, setFontSize] = useState(
        localStorage.getItem("fontSize") || "normal"
    );

    const handleFontSizeChange = (size: string) => {
        setFontSize(size);
        localStorage.setItem("fontSize", size);
        document.documentElement.setAttribute("data-font-size", size);
    };

    useEffect(() => {
        document.documentElement.setAttribute("data-font-size", fontSize);
    }, [fontSize]);

    return (
        <div className="dropdown dropdown-end z-50">
            <label
                tabIndex={0}
                className="btn btn-ghost btn-circle flex justify-center items-center btn-sm"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mt-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0l3-3m-3 3l-3-3m6 9H6a2 2 0 01-2-2V4a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2z"
                    />
                </svg>
            </label>
            <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
                <li className="menu-title">
                    <span>Font Size</span>
                </li>
                {["small", "normal", "large"].map((size) => (
                    <li key={size}>
                        <button
                            className={`${
                                fontSize === size ? "font-bold" : ""
                            }`}
                            onClick={() => handleFontSizeChange(size)}
                        >
                            {size.charAt(0).toUpperCase() + size.slice(1)}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
