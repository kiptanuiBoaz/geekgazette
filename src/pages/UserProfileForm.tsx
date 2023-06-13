import React, { useRef, useEffect, useState } from 'react';
import "./user-profile-form.scss";
import { FiEdit } from "react-icons/fi";
import { storage } from "../firebase/firebase";
import { ref, uploadBytes, getDownloadURL, uploadBytesResumable, deleteObject, } from "firebase/storage";
import { v4 } from "uuid";
import { useNavigate, useLocation } from 'react-router-dom';
import { updateAuth } from '../api/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import usePrivateApi from "../hooks/usePrivateApi";
import { Notify } from 'notiflix';
import { UserDataInterface } from '../types/new-user-types/newUserTypes';
import { USER_URL } from '../utils/apiroutes';


const UserProfileForm = () => {
    const [image, setImage] = useState<File | null>(null);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [formData, setFormData] = useState<any>({});
    const [uploadingImage, setUploadingImage] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [errMsg, setErrMsg] = useState<string | null>(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const privateApi = usePrivateApi();

    const from = location?.state?.from?.pathname || "/";
    const email = useSelector((state: { auth: { user: { email: string } } }) => state.auth.user.email);
    const userData: UserDataInterface = { ...formData, avatarUrl, email };

    const fnameRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLInputElement>(null);

    Notify.merge({
        success: {
            background: " #4d7e3e",
            notiflixIconColor: " #eeeee4",
            textColor: " #eeeee4"
        }
    });

    useEffect(() => { fnameRef.current?.focus(); }, []);

    useEffect(() => {
        setUploadingImage(true);
        const uploadImage = async () => {
            try {

                if (image == null) return;
                if (avatarUrl) await deleteObject(ref(storage,avatarUrl));

                const imageRef = ref(storage, `/userProfiles/${image.name + v4()} `);
                const snapshot = await uploadBytesResumable(imageRef, image);
                const url = await getDownloadURL(snapshot.ref);
                setAvatarUrl(url);

                Notify.success(
                    "Image uploaded successfully",
                    { timeout: 1000, cssAnimationStyle: "from-right" }
                );
            } catch (error) {
                console.log(error);
            } finally {
                setUploadingImage(false);
            }

        };
        uploadImage();
    }, [image]);

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
    const handleSubmit = async () => {

        setLoading(true);
        try {
            const res = await privateApi.put(USER_URL, JSON.stringify({ ...userData }),);
            if (res.status === 200) {
                dispatch(updateAuth({ ...res.data }));
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
        <form className='profile-form'>
            <p className='instruction'>Please fill in your info before proceeding</p>
            <label htmlFor="file-upload" className='custom-file-upload'>

                <img
                    className='file-upload-image'
                    src={avatarUrl ?? "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"}
                />
                <span className='prompt'> <FiEdit /> {' '}{" "} {uploadingImage ? "Uploading..." : "Upload Image"} </span>
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
                style={{
                    backgroundColor: loading ? " #d1d2d2" : "",
                    color: loading ? " #4d7e3e" : ""
                }}
                className='submit-button'
                disabled={!avatarUrl || !formData.dob || !formData.gender || !formData.headTag || !formData.fname || !formData.lname}
            >
                {loading ? "Submitting..." : "Submit"}
            </button>
        </form>


    )
}

export default UserProfileForm;