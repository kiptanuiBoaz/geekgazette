import React, { useState, useRef, useEffect } from 'react';
import "./new-blog-form.scss";
import { RiImageAddFill } from "react-icons/ri";
import { storage } from "../firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL, } from "firebase/storage";
import { v4 } from "uuid";
import usePrivateApi from "../hooks/usePrivateApi";
import { categoryList } from '../assets/read/categories';
import { addPost, updatePost } from '../api/postsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { PostInterface } from '../api/reduxTypes';
import { useNavigate } from 'react-router-dom';
import { api } from "../axios/axios";
import { Report, IReportOptions } from 'notiflix';

const POSTS_URL = "/posts";
interface PostFormPros {
  postId: string | undefined;
}

interface ICustomReportOptions extends IReportOptions {
  buttonBackground: string;
  svgColor: string;
titleColor: string;
backOverlayColor: string;
}

const options: ICustomReportOptions = {
  buttonBackground: "#4d7e3e",
  svgColor: " #4d7e3e",
  titleColor: " #4d7e3e",
  backOverlayColor: " rgba(76, 76, 76, 0.82)",
  // specify other allowed properties from IReportOptions
};


const NewBlogForm = ({ postId }: PostFormPros) => {
  //posts from state and filter blog curently editing
  const blogs = useSelector((state: any) => state?.posts.posts);
  const blog: PostInterface = postId ? blogs.find((b: PostInterface) => b._id === postId) : null;

  const [title, setTitle] = useState(blog ? blog.title : null);
  const [body, setBody] = useState(blog ? blog.body : "");
  const [category, setCategory] = useState<string | null>(blog ? blog.category : null);
  const [image, setImage] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState<string | null>(blog ? blog.imgUrl : null);
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUploading, setImageUploading] = useState<boolean>(false);

  const privateApi = usePrivateApi();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const date = new Date();

  const authorEmail = useSelector((state: any) => state.auth.user.email);
  const postData = { title, date, body, authorEmail, category, imgUrl, postId }
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
      const response = await privateApi({
        method: blog ? "put" : "post",
        url: POSTS_URL,
        data: postData,
      });

      let postId;
      //from new blog
      if (response.status === 201) {
        const res = await api.get(`/users/user?email=${authorEmail}`);
        const { fname, lname, avatarUrl, headTag } = res.data;

        const PostWithAuthor = {
          ...response.data._doc,
          author: { fname, lname, avatarUrl, headTag }
        }

        dispatch(addPost(PostWithAuthor));
        postId = response.data._doc._id;

        //notify the user
        Report.success(
          "Blog Created!",
          "Your blog will now be available on the timeline, you can alsa make  changes anytime by visiting your profile on the top right",
          "Okay",
          () => { },
          options
        )
      }
      //from edited blog
      if (response.status === 200 && blog !== null) {
        dispatch(updatePost(response.data));
        postId = response.data._id;

        //notify the user
        Report.success(
          "Changes Submitted!",
          "Changes will be visible when you visit the blog on the timeline or on your profile on the top left",
          "Okay",
          () => { },
          options
        )
      }
      //to the full blog page
      navigate(`/blog/read/${postId}`);


    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <form className='blog-form' onSubmit={handleSubmit}>

      <input
        ref={titleRef}
        className='title-input'
        type="text"
        value={title ?? ""}
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

      <select onChange={(e) => setCategory(e.target.value)} className='category-select' value={category ?? ""} required>
        <option value="">Select a category</option>
        {categoryList.map(category => <option value={category}>{category}</option>)}

      </select>
      <br />

      <label htmlFor="file-upload" className='custom-file-upload'>
        <RiImageAddFill /> {
          imageUploading
            ? "Uploading..."
            : imgUrl !== ""
              ? "Edit Image"
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
      <img className='preview-img' src={imgUrl ?? ""} />
      <button
        onClick={(e) => handleSubmit(e)}
        disabled={!title || !body || !category || !imgUrl}
        style={{
          backgroundColor: loading ? " #d1d2d2" : "",
          color: loading ? " #fff" : ""
        }}
        className='submit-button'
        type="submit"
      >
        {loading ? "Submiting..." : "Submit"}
      </button>

    </form>
  );
};

export default NewBlogForm;
