import { MenuItem } from "@/types/menu";
import {
    UserIcon,
    ArrowUpTrayIcon,
    ChartBarIcon,
    ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

export const menuItems: MenuItem[] = [
    {
        name: "Profile",
        href: "/profile",
        icon: <UserIcon className="w-5 h-5 text-primary" />,
        roles: ["user", "artist", "admin"],
    },
    {
        name: "Upload Song",
        href: route("songs.create"),
        icon: <ArrowUpTrayIcon className="w-5 h-5 text-secondary" />,
        roles: ["artist", "admin"],
    },
    {
        name: "Your songs",
        href: "/songs/artist",
        icon: <ChartBarIcon className="w-5 h-5 text-accent" />,
        roles: ["artist"],
    },
    {
        name: "Login",
        href: route("login"),
        icon: <ArrowRightOnRectangleIcon className="w-5 h-5 text-info" />,
        roles: [],
    },
    {
        name: "Register",
        href: route("register"),
        icon: <ArrowRightOnRectangleIcon className="w-5 h-5 text-info" />,
        roles: [],
    },
    {
        name: "Logout",
        href: route("logout"),
        icon: <ArrowRightOnRectangleIcon className="w-5 h-5 text-error" />,
        method: "post",
        roles: ["user", "artist", "admin"],
    },
];
