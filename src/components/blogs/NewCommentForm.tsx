import React, { useState } from 'react';
import "./new-comment-form.scss"
import ".."
const MAX_LENGTH = 200;

interface CommentFormProps {
    handleCommenting: () => void;
    postId: string | undefined;
}

export const NewCommentForm = ({ handleCommenting, postId }: CommentFormProps) => {
    const [value, setValue] = useState('');
    const chars = value.length;

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const inputValue = event.target.value.slice(0, MAX_LENGTH);
        setValue(inputValue);
    };


    const handleChildCommenting = () => {
        handleCommenting();
    }

    return (
        <div className='comment-input-container'>
            <textarea
                className="comment-input"
                id="textInput"
                value={value}
                onChange={handleChange}
                maxLength={MAX_LENGTH}
                placeholder='Add comment'
            />
            <footer className='comment-input-footer'>
                <p className='char-count  '>{`${chars}/200`}</p>
                <div className='buttons'>
                    <button className='submit'>Submit</button>
                    <button className='cancel' onClick={handleChildCommenting}>Cancel</button>
                </div>


            </footer>

        </div>
    );
};
