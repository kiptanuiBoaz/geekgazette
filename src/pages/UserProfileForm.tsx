import React, { useRef, useEffect, useState } from 'react';
import "./user-profile-form.scss";
import { FiEdit } from "react-icons/fi";
import { storage } from "../firebase/firebase";
import { ref, uploadBytes, getDownloadURL, } from "firebase/storage";
import { v4 } from "uuid";
import { useNavigate, useLocation } from 'react-router-dom';
import { updateAuth } from '../api/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import usePrivateApi from "../hooks/usePrivateApi";

const USER_URL = "/users"

const UserProfileForm = () => {
    const [image, setImage] = useState<File | null>(null);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState<boolean>(false);
    const [errMsg, setErrMsg] = useState<string | null>(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const privateApi = usePrivateApi();

    const from = location?.state?.from?.pathname || "/";
    const email = useSelector((state: { auth: { user: { email: string } } }) => state.auth.user.email);
    const userData = { ...formData, avatarUrl, email };

    const fnameRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLInputElement>(null);



    useEffect(() => { fnameRef.current?.focus(); }, []);

    useEffect(() => {
        const uploadImage = () => {
            if (image == null) return;
            const imageRef = ref(storage, `/userProfiles/${image.name + v4()} `);
            uploadBytes(imageRef, image).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    setAvatarUrl(url);
                });
                alert("image uploaded")
            })
        };
        uploadImage();
    }, [image]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        setImage(file);
    };

    const handleDataChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
    }
    console.log(userData);
    const handleSubmit = async () => {

        setLoading(true);
        try {
            const res = await privateApi.put(USER_URL, JSON.stringify({ ...userData }),);
            if (res.status === 200) {
                dispatch(updateAuth({ ...res.data }))
                navigate(from, { replace: true });
            }
            console.log(res);

        } catch (err: any) {

            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Password is incorrect');
            } else {
                setErrMsg('Login Failed');
            }
            //focus for screen readers
            errRef?.current?.focus();

        }
        setLoading(false);
    }

    console.log(email);
    return (

        <form className='profile-form'>
            <p className='instruction'>Please fill in your info before proceeding</p>
            <label htmlFor="file-upload" className='custom-file-upload'>

                <img
                    className='file-upload-image'
                    src={avatarUrl ?? "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"}
                />
                <span className='prompt'> <FiEdit /> {' '}{" "}Upload Image </span>
            </label>

            <input
                id="file-upload"
                className='image-input'
                type="file"
                accept="image/*"
                onChange={handleImageChange}

            />
            <br />

            <input ref={fnameRef} className='fname' onChange={handleDataChange} name='fname' type='text' placeholder="First Name" />
            <input className='lname' name='lname' type='text' onChange={handleDataChange} placeholder="Last Name" />
            <br />

            <input className='headline' name='headTag' onChange={handleDataChange} placeholder='Headline e.g Software Developer' />
            <br />

            <select className='gender-select' name='gender' onChange={handleDataChange} required>
                <option value="">Selcet your gender</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="">Rather not say</option>
            </select>

            <div className="dob-div">
                <label className='dob-label' htmlFor="dob" > Date of birth:</label>
                {/* <BsFillCalendar2PlusFill/> */}
                <input name='dob' onChange={handleDataChange} className='dob-input' id="dob" type='date' />

            </div>

            <button
                onClick={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
                className='submit-button'
            >
                {loading ? "Submitting..." : "Submit"}
            </button>
        </form>


    )
}

export default UserProfileForm;