import { Link } from "@inertiajs/react";
import { Method } from "@inertiajs/core";
import { PageProps } from "@/types";
import { menuItems } from "@/Config/navigation";

export default function DropDownList({ auth }: PageProps) {
    const role = auth.user?.role;

    const filteredItems = menuItems.filter((item) => {
        if (item.roles.length === 0 && !role) {
            return item;
        }
        return item.roles.includes(role || "");
    });

    return (
        <>
            {filteredItems.map((item, index) => (
                <li key={index} className="">
                    {/* {index == 1 ? (
                        <Switcher className="block px-4 py-2 text-sm" />
                    ) : null} */}
                    <Link
                        key={item.name}
                        href={item.href}
                        method={item.method as Method}
                        as={item.method ? "button" : undefined}
                        className="flex gap-2 w-full text-left px-4 py-2 text-sm "
                    >
                        <img
                            className="brightness-50"
                            src={item.icon}
                            alt={item.name}
                        />
                        {item.name}
                    </Link>
                </li>
            ))}
        </>
    );
}
