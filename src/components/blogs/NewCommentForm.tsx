import React, { useState } from 'react';
import "./new-comment-form.scss"
import { useSelector } from 'react-redux';
import usePrivateApi from "../../hooks/usePrivateApi"
import { addComment } from '../../api/postsSlice';
import { useDispatch } from 'react-redux';
import { redirect } from 'react-router-dom';
const MAX_LENGTH = 200;

interface CommentFormProps {
    handleCommenting: () => void;
    postId: string | undefined;
}

export const NewCommentForm = ({ handleCommenting, postId }: CommentFormProps) => {
    const [text, setText] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const chars = text.length;
    const date = new Date;
    const dispatch = useDispatch();
    const privateApi = usePrivateApi();

    // currently signed in user from redux store
    const { email: userEmail } = useSelector((state: any) => state.auth.user);


    const handleSubmit = async () => {
        setLoading(true);
        try {
            const res = await privateApi.post("/comments", { text, date, userEmail, postId });
            if (res.status === 200) {
                dispatch(addComment({ postId, newComment: { ...res.data } }));
                setText("");
            }
        } catch (e) {
            console.log(e)
        }
        setLoading(false);
    };

    return (
        <div className='comment-input-container'>
            <textarea
                className="comment-input"
                id="textInput"
                value={text}
                onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                    const inputValue = event.target.value.slice(0, MAX_LENGTH);
                    setText(inputValue);
                }}
                maxLength={MAX_LENGTH}
                placeholder='Add comment'
            />
            <footer className='comment-input-footer'>

                <div className='buttons'>
                    <button 
                    onClick={() => handleSubmit()} 
                    className='submit'
                    disabled={!text}
                    >
                        {loading ? "Submitting..." : "Submit"}
                        </button>
                    <button className='cancel' onClick={() => handleCommenting()}>Cancel</button>

                </div>

                <p  className='char-count'>{`${chars}/200`}</p>
            </footer>

        </div>
    );
};
