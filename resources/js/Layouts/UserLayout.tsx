import { PropsWithChildren } from "react";
import NavBar from "./navbar/NavBar";

export default function User({ children }: PropsWithChildren<{}>) {
    return (
        <div className="min-h-screen ">
            <NavBar />
            <main>
                <div className="p-10">{children}</div>
            </main>
        </div>
    );
}
