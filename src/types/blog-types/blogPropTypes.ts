export interface BlogProps {
    body: string;
    title: string;
    imgUrl: string;
    date: string;
    category: string;
    _id: string;
    author:{
        avatarUrl: string;
        fname: string;
        lname: string;
    }
}