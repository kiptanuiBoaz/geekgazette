export interface BlogProps {
    body: string;
    title: string;
    imgUrl: string;
    date: any;
    category: string;
    _id: string;
    authorEmail: string;
    likes: {
        userEmail: String,
        date: String
    }[];
    comments: {
        date: string;
        text: string;
        userEmail: string;
        _id: string;
    }[];
    author: {
        avatarUrl: string;
        fname: string;
        lname: string;
    }
}