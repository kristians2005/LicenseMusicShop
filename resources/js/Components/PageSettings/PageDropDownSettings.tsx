import { useState } from "react";
import Theme from "./Theme";

export default function PageDropDownSettings() {
    return (
        <div className="space-y-6">
            {/* Theme Section */}
            <div className="bg-base-100 rounded-lg shadow-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-primary"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <h2 className="text-xl font-semibold">Theme Settings</h2>
                </div>
                <p className="text-base-content/70 text-sm mb-4">
                    Choose a theme that matches your style. Your selection will
                    be saved automatically.
                </p>
                <div className="join join-vertical w-full max-h-[400px] overflow-y-auto">
                    <Theme />
                </div>
            </div>

            {/* Language Section */}
            <div className="bg-base-100 rounded-lg shadow-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-primary"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389 21.034 21.034 0 01-.554-.6 19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l3.553 7.106a1 1 0 01-1.788.894l-2.553-5.106a1 1 0 00-1.788 0l-2.553 5.106a1 1 0 01-1.788-.894l3.553-7.106A1 1 0 0113 8z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <h2 className="text-xl font-semibold">Language Settings</h2>
                </div>
                <p className="text-base-content/70 text-sm mb-4">
                    Select your preferred language for the interface.
                </p>
                <div className="join join-vertical w-full">
                    <button className="btn btn-outline join-item">
                        <span className="text-lg">🇺🇸</span>
                        English
                    </button>
                    <button className="btn btn-outline join-item">
                        <span className="text-lg">🇱🇻</span>
                        Latvian
                    </button>
                </div>
            </div>
        </div>
    );
}
