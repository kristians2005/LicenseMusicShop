import { PropsWithChildren } from "react";
import NavBar from "./navbar/NavBar";

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen">
            <NavBar />
            <main>
                <div className="">{children}</div>
            </main>
        </div>
    );
}
