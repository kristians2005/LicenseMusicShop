import PageDropDownSettings from "@/Components/PageSettings/PageDropDownSettings";
import DropDownList from "@/Components/ProfileDropdown/DropDownList";
import ThemeSwitcher from "@/Components/ThemeSwitcher";
import { Link } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import {
    Bars3Icon,
    XMarkIcon,
    UserCircleIcon,
    ShoppingCartIcon,
    Cog6ToothIcon,
    ArrowRightOnRectangleIcon,
    UserIcon,
    KeyIcon,
    CreditCardIcon,
    HeartIcon,
} from "@heroicons/react/24/outline";

export default function NavBar() {
    const { auth } = usePage<PageProps>().props;

    // List of the 10 most visually appealing themes
    const themes = [
        "light",
        "dark",
        "cupcake",
        "cyberpunk",
        "dracula",
        "luxury",
        "coffee",
        "valentine",
        "night",
        "winter",
    ];

    return (
        <div className="bg-base-100 border-b border-base-200 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Left side (Logo) */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link
                            href="/"
                            className="text-2xl font-bold text-primary"
                        >
                            BuyMusic
                        </Link>
                    </div>

                    {/* Center (Store) */}
                    <div className="flex-1 h-full p-2 flex justify-center">
                        <Link
                            href={route("songs.index")}
                            className="inline-flex items-center px-1 pt-1 text-sm font-medium text-base-content hover:text-primary border-b-2 border-transparent hover:border-primary"
                        >
                            Store
                        </Link>
                    </div>

                    {/* Right side */}
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-4">
                            {/* Theme Switcher */}
                            <ThemeSwitcher />
                            {!auth.user ? (
                                <div className="flex items-center space-x-2">
                                    <Link
                                        href={route("login")}
                                        className="btn btn-ghost btn-sm"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href={route("register")}
                                        className="btn btn-primary btn-sm"
                                    >
                                        Register
                                    </Link>
                                </div>
                            ) : (
                                <div className=" z-30 dropdown dropdown-end">
                                    <label
                                        tabIndex={0}
                                        className="btn btn-ghost btn-circle btn-sm"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                            <span className="text-sm font-medium text-primary">
                                                {auth.user.name
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </span>
                                        </div>
                                    </label>
                                    <ul
                                        tabIndex={0}
                                        className="dropdown-content z-[1] menu p-2 shadow-lg bg-base-100 rounded-box w-52"
                                    >
                                        <li className="menu-title">
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium text-sm">
                                                    {auth.user.name}
                                                </span>
                                                <div
                                                    className={`badge badge-xs ${
                                                        auth.user.role ===
                                                        "user"
                                                            ? "badge-primary"
                                                            : auth.user.role ===
                                                              "admin"
                                                            ? "badge-warning"
                                                            : "badge-secondary"
                                                    }`}
                                                >
                                                    {auth.user.role}
                                                </div>
                                            </div>
                                        </li>
                                        <DropDownList auth={auth} />
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
