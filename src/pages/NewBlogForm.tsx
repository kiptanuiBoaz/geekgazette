import React, { useState, useRef, useEffect } from 'react';
import "./new-blog-form.scss";
import { RiImageAddFill } from "react-icons/ri";
import { storage } from "../firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL, } from "firebase/storage";
import { v4 } from "uuid";
import { useSelector } from 'react-redux';
import usePrivateApi from "../hooks/usePrivateApi";

const POSTS_URL = "/posts"

const NewBlogForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUploading, setImageUploading] = useState<boolean>(false);

  const date = new Date();
  const { email } = useSelector((state: any) => state.auth.user);
  const postData = { title, date, body, email, category, imgUrl }
  const titleRef = useRef<HTMLInputElement>(null);
  const privateApi = usePrivateApi();


  useEffect(() => {
    const uploadImage = async () => {
      try {
        setImageUploading(true);
        if (image == null) return;
        const imageRef = ref(storage, `/blogImgs/${image.name + v4()} `);
        const snapshot = await uploadBytesResumable(imageRef, image);
        const url = await getDownloadURL(snapshot.ref);
        setImgUrl(url);
      } catch (error) {
        console.log(error);
      } finally {
        setImageUploading(false);
      }
    };

    uploadImage();
  }, [image]);


  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setImage(file);
  };

  useEffect(() => { titleRef.current?.focus(); }, [])

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await privateApi.post(POSTS_URL, { ...postData });

      if (response.status === 201) {
        console.log(response.data._doc);
       
      }

    } catch (e: any) {
      console.error(e.message);
    };
    setLoading(false);
  };

  return (
    <form className='blog-form' onSubmit={handleSubmit}>

      <input
        ref={titleRef}
        className='title-input'
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder='Title'
        required
      />
      <br />

      <textarea
        className='content'
        placeholder='Content'
        value={body}
        rows={6} cols={50}
        onChange={(e) => setBody(e.target.value)}
        required
      />
      <br />

      <select onChange={(e) => setCategory(e.target.value)} className='category-select' value={category} required>
        <option value="">Select a category</option>
        <option value="technology">Technology</option>
        <option value="food">Food</option>
        <option value="travel">Travel</option>
      </select>
      <br />

      <label htmlFor="file-upload" className='custom-file-upload'>
        <RiImageAddFill /> {
          imageUploading
            ? "Uploading..."
            : imgUrl !== ""
              ? "Change Image"
              : "Upload Image"
        }
      </label>

      <input
        id="file-upload"
        className='image-input'
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        required
      />
      <br />
      <img className='preview-img' src={imgUrl} />
      <button onClick={(e) => handleSubmit(e)} className='submit-button' type="submit">{loading ? "Submiting..." : "Submit"}</button>

    </form>
  );
};

export default NewBlogForm;
