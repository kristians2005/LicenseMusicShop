import "../css/app.css";
import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";
import { useEffect } from "react";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

// Create a function component to handle theme
function ThemeHandler({ children }: { children: React.ReactNode }) {
    const theme = localStorage.theme || "light";

    useEffect(() => {
        document.querySelector("html")?.setAttribute("data-theme", theme);
    }, [theme]);

    return children;
}

createInertiaApp({
    title: (title) => `${title}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob("./Pages/**/*.tsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <ThemeHandler>
                <App {...props} />
            </ThemeHandler>
        );
    },
    progress: {
        color: "#4B5563",
    },
});
