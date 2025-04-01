import { PropsWithChildren } from "react";
import NavBar from "./navbar/NavBar";

export default function Artist({ children }: PropsWithChildren<{}>) {
    return (
        <div className="min-h-screen">
            <NavBar />
            <main>
                <div className="">{children}</div>
            </main>
        </div>
    );
}
