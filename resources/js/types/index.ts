export interface User {
    id: number;
    name: string;
    email: string;
    role: 'user' | 'artist' | 'admin';
    email_verified_at: string | null;
}

export interface Genre {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface SongFile {
    id: number;
    song_id: number;
    path: string;
    created_at: string;
    updated_at: string;
}

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

export interface PageProps {
    auth: {
        user: User;
    };
    songs?: {
        data: Song[];
        current_page: number;
        last_page: number;
        next_page_url: string | null;
        prev_page_url: string | null;
        per_page: number;
        total: number;
    };
    song?: Song;
    genres?: Genre[];
    message?: string;
    [key: string]: any;
} 