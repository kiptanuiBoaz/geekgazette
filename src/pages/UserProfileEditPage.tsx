import React, { useRef, useEffect, useState } from 'react';
import "./user-edit-profile-page.scss";
import { FiEdit } from "react-icons/fi";
import heroImage from "../assets/hero/illustrator.png";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import usePrivateApi from "../hooks/usePrivateApi";
import { updateAuth } from "../api/authSlice";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { v4 } from "uuid";
import { storage } from "../firebase/firebase";


const USER_URL = "/users";

const UserProfileForm = () => {
    const [formData, setFormData] = useState({ ...useSelector((state: any) => state.auth.user) });

    const { fname, lname, dob, headTag, avatarUrl } = formData;
    const [image, setImage] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [errMsg, setErrMsg] = useState<string | null>(null);
    const [uploadingImage, setUploadingImage] = useState<boolean>(false);

    const fnameRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLInputElement>(null);
    const [newAvatarUrl, setNewAvatarUrl] = useState<string | null>(formData.avatarUrl);

    //fns from hooks
    const navigate = useNavigate();
    const location = useLocation();
    const privateApi = usePrivateApi();
    const dispatch = useDispatch();

    const from = location?.state?.from?.pathname || "/";

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        setImage(file);
    };

    const handleDataChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFormData((prevFormData: any) => ({
            ...prevFormData,
            [name]: value,
        }));
    }

    useEffect(() => {
        const uploadImage = async () => {
            try {
                setUploadingImage(true);
                if (image == null) return;
                const imageRef = ref(storage, `/userProfiles/${image.name + v4()} `);
                const snapshot = await uploadBytesResumable(imageRef, image);
                const url = await getDownloadURL(snapshot.ref);
                setNewAvatarUrl(url);

            } catch (e) {
                console.log(e);
            } finally {
                setUploadingImage(false);
            }

        };
        uploadImage();
    }, [image]);

    useEffect(() => { fnameRef.current?.focus(); }, []);

    const handleSubmit = async () => {
        formData.avatarUrl = newAvatarUrl;
        setLoading(true);
        try {
            const res = await privateApi.put(USER_URL, JSON.stringify({ ...formData }),);
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

    return (
        <section className='profile-form-container'>
            <form className='eprofile-form'>
                <p className='instruction'>Please fill in your info before proceeding</p>
                <label htmlFor="file-upload" className='custom-file-upload'>

                    <img
                        className='file-upload-image'
                        src={newAvatarUrl ?? "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"}
                    />
                    <span className='prompt'> <FiEdit /> {' '}{" "}{uploadingImage ? "Uploading..." : "Edit Image"} </span>
                </label>

                <input
                    id="file-upload"
                    className='image-input'
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}

                />
                <br />

                <input ref={fnameRef} value={fname} className='fname' onChange={handleDataChange} name='fname' type='text' placeholder="First Name" />
                <input className='lname' value={lname} name='lname' type='text' onChange={handleDataChange} placeholder="Last Name" />
                <br />

                <input className='headline' value={headTag} name='headTag' onChange={handleDataChange} placeholder='Headline e.g Software Developer' />
                <br />

                <select className='gender-select' name='gender' onChange={handleDataChange} required>
                    <option value="">Selcet your gender</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="">Rather not say</option>
                </select>

                <div className="dob-div">
                    <label className='dob-label' htmlFor="dob" > Date of birth:</label>
                    <input name='dob' onChange={handleDataChange} value={dob} className='dob-input' id="dob" type='date' />

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

            <img className='illustrator-img' src={heroImage} alt="illustrator" />
        </section>
    )
}

export default UserProfileForm;