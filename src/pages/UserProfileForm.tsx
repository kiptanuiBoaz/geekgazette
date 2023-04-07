import React, { useRef, useEffect, useState } from 'react';
import "./user-profile-form.scss";
import { FiEdit } from "react-icons/fi";
import heroImage from "../assets/hero/illustrator.png";

 const UserProfileForm = () => {
    const [image, setImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fnameRef = useRef<HTMLInputElement>(null);
    useEffect(() => { fnameRef.current?.focus(); }, [])

    console.log(image);
    return (
        <section className='profile-form-container'>
            <form className='profile-form'>
                <p className='instruction'>Please fill in your info before proceeding</p>
                <label htmlFor="file-upload" className='custom-file-upload'>

                    <img
                        className='file-upload-image'
                        src={previewUrl ?? "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"}
                    />
                    <span className='prompt'> <FiEdit /> {' '}{" "}Upload Image </span>
                </label>

                <input
                    id="file-upload"
                    className='image-input'
                    type="file"
                    accept="image/*"
                    onChange={
                        (e: React.ChangeEvent<HTMLInputElement>) => {
                            const selectedFile = e.target.files?.[0];
                            if (selectedFile) {
                                setImage(selectedFile);
                                setPreviewUrl( URL.createObjectURL(selectedFile));
                            }
                        }
                    }

                />
                <br />

                <input ref={fnameRef} className='fname' type='text' placeholder="First Name" />
                <input className='lname' type='text' placeholder="Last Name" />
                <br />

                <input className='headline' placeholder='Headline e.g Software Developer' />
                <br />

                <select className='gender-select' required>
                    <option value="">Selcet your gender</option>
                    <option value="male">Female</option>
                    <option value="female">Male</option>
                    <option value="">Rather not say</option>
                </select>

                <div className="dob-div">
                    <label className='dob-label' htmlFor="dob" > Date of birth:</label>
                    {/* <BsFillCalendar2PlusFill/> */}
                    <input className='dob-input' id="dob" type='date' />

                </div>

                <button className='submit-button' type="submit">Submit</button>
            </form>

            <img className='illustrator-img' src={heroImage} alt="illustrator" />
        </section>
    )
}

export default UserProfileForm;