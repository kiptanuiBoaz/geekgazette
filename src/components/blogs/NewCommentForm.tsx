import React, { useState } from 'react';

const MAX_LENGTH = 200;

interface CommentFormProps {
    handleCommenting: () => void;
}

export const NewCommentForm = ({ handleCommenting }: CommentFormProps) => {
    const [value, setValue] = useState('');
    const remainingChars = MAX_LENGTH - value.length;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value.slice(0, MAX_LENGTH);
        setValue(inputValue);
    };


    const handleChildCommenting = () => {
        handleCommenting();
    }

    return (
        <div>
            <input
                id="textInput"
                type="text"
                value={value}
                onChange={handleChange}
                maxLength={MAX_LENGTH}
                placeholder='Add comment'
            />
            <footer>
                <button>Submit</button>
                <button onClick={handleChildCommenting}>Cancel</button>
                <p>{`${remainingChars}/200`}</p>
            </footer>

        </div>
    );
};
