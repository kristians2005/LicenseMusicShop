export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    role: string;
}

export interface Genre {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
            role: string;
            email_verified_at: string | null;
        } | null;
    };
    genres?: Genre[];
    songs?: Song[];
    song?: Song;
};

export interface Song {
    id: number;
    name: string;
    artist: string;
    duration: string;
    price: number;
    cover: string | null;
    file: string;
    is_private: boolean;
    user_id: number;
    created_at: string;
    updated_at: string;
    genres: { id: number; name: string }[];
}
