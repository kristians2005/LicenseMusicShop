import { MenuItem } from "@/types/menu";

export const menuItems: MenuItem[] = [
    {
        name: "Profile",
        href: "/profile",
        icon: "/images/icons/person.svg",
        roles: ["user", "artist", "admin"],
    },
    {
        name: "Upload Song",
        href: route("songs.create"),
        icon: "/images/icons/upload.svg",
        roles: ["artist", "admin"],
    },
    {
        name: "Statistics",
        href: "/stats",
        icon: "/images/icons/stats.svg",
        roles: ["artist"],
    },
    {
        name: "Login",
        href: route("login"),
        icon: "/images/icons/logout.svg",
        roles: [],
    },
    {
        name: "Register",
        href: route("register"),
        icon: "/images/icons/logout.svg",
        roles: [],
    },
    {
        name: "Logout",
        href: route("logout"),
        icon: "/images/icons/logout.svg",
        method: "post",
        roles: ["user", "artist", "admin"],
    },
];
