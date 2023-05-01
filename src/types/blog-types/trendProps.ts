export interface TrendProps {
    title: string
    _id: string;
    date: string;
    category: string;
    author: {
        avatarUrl: string;
        fname: string;
        lname: string;
    }
}