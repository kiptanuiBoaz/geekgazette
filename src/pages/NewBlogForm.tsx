import React, { useState, useRef, useEffect } from 'react';
import "./new-blog-form.scss";
import { RiImageAddFill } from "react-icons/ri";
import { storage } from "../firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL, } from "firebase/storage";
import { v4 } from "uuid";
import { useSelector } from 'react-redux';
import usePrivateApi from "../hooks/usePrivateApi";
import { categoryList } from '../assets/read/categories';
import { addPost } from '../api/postsSlice';
import { useDispatch } from 'react-redux';
import { PostInterface } from '../api/reduxTypes';

const POSTS_URL = "/posts";
interface PostFormPros {
  postId: string | undefined;
}

const NewBlogForm = ({ postId }: PostFormPros) => {

  //posts from state and filter blog curently editing
    const blogs = useSelector((state: any) => state?.posts.posts);
    const blog: PostInterface = postId ? blogs.find((b: PostInterface) => b._id === postId) : null;
  
  const [title, setTitle] = useState(blog ? blog.title : "" );
  const [body, setBody] = useState(blog ? blog.body : "" );
  const [category, setCategory] = useState(blog ? blog.category: "" );
  const [image, setImage] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState<string>(blog ? blog.imgUrl: "");
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUploading, setImageUploading] = useState<boolean>(false);

  const privateApi = usePrivateApi();
  const dispatch = useDispatch();
  const date = new Date();


  const authorEmail = useSelector((state: any) => state.auth.user.email);
  const postData = { title, date, body, authorEmail, category, imgUrl }
  const titleRef = useRef<HTMLInputElement>(null);


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
        dispatch(addPost(response.data._doc));
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
        {categoryList.map(category => <option value={category}>{category}</option>)}

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
