export interface BlogProps {
    date: string;
    body: string;
    title: string;
    imgUrl: string;
    author: {
        fname: string;
        lname: string;
        avatarUrl: string;
    }
}