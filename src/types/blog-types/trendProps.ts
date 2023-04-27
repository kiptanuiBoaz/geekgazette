export interface TrendProps {
    title: string

    date: string;
    category: string;
    author: {
        avatarUrl: string;
        fname: string;
        lname: string;
    }
}