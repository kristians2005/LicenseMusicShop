import PageDropDownSettings from "@/Components/PageSettings/PageDropDownSettings";
import DropDownList from "@/Components/ProfileDropdown/DropDownList";
import { Link } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import { PageProps } from "@/types";

export default function NavBar() {
    const { auth } = usePage<PageProps>().props;
    return (
        <div className="bg-base-100 border-b border-base-200 ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Left side */}
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Link
                                href="/"
                                className="text-2xl font-bold text-primary"
                            >
                                BuyMusic
                            </Link>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link
                                href="/songs"
                                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-base-content hover:text-primary border-b-2 border-transparent hover:border-primary"
                            >
                                Store
                            </Link>
                            <Link
                                href={route("License")}
                                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-base-content hover:text-primary border-b-2 border-transparent hover:border-primary"
                            >
                                License
                            </Link>
                            <Link
                                href={route("About")}
                                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-base-content hover:text-primary border-b-2 border-transparent hover:border-primary"
                            >
                                About
                            </Link>
                        </div>
                    </div>

                    {/* Right side */}
                    <div className="flex items-center space-x-4">
                        <div className="hidden md:block">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search songs..."
                                    className="input input-bordered input-sm w-64 bg-base-200 focus:bg-base-100"
                                />
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="dropdown dropdown-end">
                                <label
                                    tabIndex={0}
                                    className="btn btn-ghost btn-circle btn-sm"
                                >
                                    <div className="indicator">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="1.5"
                                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                            />
                                        </svg>
                                        <span className="badge badge-xs indicator-item bg-primary text-primary-content">
                                            3
                                        </span>
                                    </div>
                                </label>
                                <div
                                    tabIndex={0}
                                    className="dropdown-content z-[1] menu p-2 shadow-lg bg-base-100 rounded-box w-52"
                                >
                                    <div className="p-2">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-bold text-sm">
                                                3 Items
                                            </span>
                                            <span className="text-info text-sm">
                                                Total: $999
                                            </span>
                                        </div>
                                        <button className="btn btn-primary btn-sm w-full">
                                            View cart
                                        </button>
                                    </div>
                                </div>
                            </div>

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
