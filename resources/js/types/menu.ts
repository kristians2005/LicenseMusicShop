import { ReactNode } from "react";

export type MenuItem = {
    name: string;
    href: string;
    icon: ReactNode;
    method?: string;
    roles: string[];
};