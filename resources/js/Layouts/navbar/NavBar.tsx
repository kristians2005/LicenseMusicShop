import PageDropDownSettings from "@/Components/PageSettings/PageDropDownSettings";
import DropDownList from "@/Components/ProfileDropdown/DropDownList";
import ThemeSwitcher from "@/Components/ThemeSwitcher";
import FontSize from "@/Components/FontSize";
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
import { useState } from "react";

export default function NavBar() {
    const { auth } = usePage<PageProps>().props;
    const [mobileOpen, setMobileOpen] = useState(false);

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

                    {/* Hamburger for mobile */}
                    <div className="flex md:hidden items-center gap-2">
                        {/* Theme Switcher */}
                        <ThemeSwitcher />
                        {/* Font Size Switcher */}
                        <FontSize />
                        {/* Hamburger for mobile */}
                        <button
                            className="btn btn-ghost btn-circle"
                            onClick={() => setMobileOpen((open) => !open)}
                        >
                            {mobileOpen ? (
                                <XMarkIcon className="w-6 h-6" />
                            ) : (
                                <Bars3Icon className="w-6 h-6" />
                            )}
                        </button>
                    </div>

                    {/* Center (Store) - hidden on mobile */}
                    <div className="flex-1 h-full p-2 justify-center hidden md:flex">
                        <Link
                            href={route("songs.index")}
                            className="inline-flex items-center px-1 pt-1 text-sm font-medium text-base-content hover:text-primary border-b-2 border-transparent hover:border-primary"
                        >
                            Store
                        </Link>
                    </div>

                    {/* Right side - hidden on mobile */}
                    <div className="hidden md:flex items-center space-x-4">
                        {/* Theme Switcher */}
                        <ThemeSwitcher />
                        {/* Font Size Switcher */}
                        <FontSize />
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
                            <div className="z-30 dropdown dropdown-end">
                                <label
                                    tabIndex={0}
                                    className="btn btn-ghost btn-circle btn-sm"
                                >
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                        <span className="text-sm font-bold text-primary">
                                            {auth.user.name
                                                .charAt(0)
                                                .toUpperCase()}
                                        </span>
                                    </div>
                                </label>
                                <ul
                                    tabIndex={0}
                                    className="dropdown-content z-50 menu p-4 shadow-lg bg-base-100 rounded-box w-64"
                                >
                                    <li className="mb-2 pb-2 border-b border-base-200">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-lg font-bold text-primary">
                                                {auth.user.name
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="font-semibold text-base-content">
                                                    {auth.user.name}
                                                </div>
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
                                        </div>
                                    </li>
                                    {/* Menu items */}
                                    <DropDownList auth={auth} />
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile menu */}
                {mobileOpen && (
                    <div className="md:hidden mt-2 space-y-2 pb-4 border-b border-base-200">
                        <Link
                            href={route("songs.index")}
                            className="block px-4 py-2 text-base font-medium text-base-content hover:text-primary"
                            onClick={() => setMobileOpen(false)}
                        >
                            Store
                        </Link>
                        {!auth.user ? (
                            <div className="flex flex-col gap-2 px-4">
                                <Link
                                    href={route("login")}
                                    className="btn btn-ghost btn-sm w-full"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    Login
                                </Link>
                                <Link
                                    href={route("register")}
                                    className="btn btn-primary btn-sm w-full"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    Register
                                </Link>
                            </div>
                        ) : (
                            <div className="bg-base-100 rounded-xl shadow p-4 mx-2 mt-2">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-lg font-bold text-primary">
                                        {auth.user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-base-content">
                                            {auth.user.name}
                                        </div>
                                        <div
                                            className={`badge badge-xs ${
                                                auth.user.role === "user"
                                                    ? "badge-primary"
                                                    : auth.user.role === "admin"
                                                    ? "badge-warning"
                                                    : "badge-secondary"
                                            }`}
                                        >
                                            {auth.user.role}
                                        </div>
                                    </div>
                                </div>
                                <div className="border-t border-base-200 my-2"></div>
                                <DropDownList auth={auth} mobile />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
