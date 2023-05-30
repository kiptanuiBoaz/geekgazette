export interface CommentProps {
    _id: string;
    userEmail: string;
    date: string;
    text: string;
}


export interface CommentFormProps {
  handleCommenting: () => void;
  postId: string | undefined;
}