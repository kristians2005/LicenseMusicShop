export interface Song {
    id: number;
    name: string;
    artist: string;
    duration: string;
    price: number;
    is_private: boolean;
    file: string;
    cover: string;
    user_id: number;
    genres: Genre[];
    created_at: string;
    updated_at: string;
}

export interface Genre {
    id: number;
    name: string;
}

export interface PaginatedSongs {
    data: Song[];
    current_page: number;
    from: number;
    to: number;
    total: number;
    per_page: number;
    last_page: number;
}

export interface PageProps {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
        };
    };
    songs: PaginatedSongs;
    genres: Genre[];
    filters: {
        search: string;
        genre: string;
        sort: string;
    };
} 