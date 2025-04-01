import { useState } from "react";
import Theme from "./Theme";

export default function PageDropDownSettings() {
    return (
        <div>
            <div>
                <h1 className=" text-lg font-bold text-center m-2">Themes</h1>
                <div className=" bg-base-100 p-4 rounded-md grid grid-cols-3 gap-4 h-60 overflow-auto">
                    <Theme />
                </div>
            </div>
            <div>
                <h1 className=" text-lg font-bold text-center m-2">Language</h1>
            </div>
        </div>
    );
}
