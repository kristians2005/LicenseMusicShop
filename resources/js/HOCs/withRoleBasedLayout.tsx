// withRoleBasedLayout.tsx
// higher-order component (HOC)

import Guest from "@/Layouts/GuestLayout";
import User from "@/Layouts/UserLayout";
import Admin from "@/Layouts/AdminLayout";
import Artist from "@/Layouts/ArtistLayout";

import React from "react";
import { PageProps } from "@/types";

const withRoleBasedLayout = (Component: React.FC<PageProps>) => {
    return (props: PageProps) => {
        // Handle unauthenticated users
        if (!props.auth?.user) {
            return (
                <Guest>
                    <Component {...props} />
                </Guest>
            );
        }

        // Get user role
        const role = props.auth.user.role;

        // Return appropriate layout based on role
        switch (role) {
            case "admin":
                return (
                    <Admin>
                        <Component {...props} />
                    </Admin>
                );
            case "artist":
                return (
                    <Artist>
                        <Component {...props} />
                    </Artist>
                );
            case "user":
                return (
                    <User>
                        <Component {...props} />
                    </User>
                );

            default:
                return (
                    <Guest>
                        <Component {...props} />
                    </Guest>
                );
        }
    };
};

export default withRoleBasedLayout;
