import React, { useState,useRef,useEffect } from 'react';
import "./new-blog-form.scss";
import { RiImageAddFill } from "react-icons/ri";



 const NewBlogForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const titleRef= useRef<HTMLInputElement>(null);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setImage(file);
  };

  useEffect(() => { titleRef.current?.focus(); }, [])
  
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('category', category);
    if (image) {
      formData.append('image', image);
    }

    // onSubmit(formData);

    // clear form after submit
    setTitle('');
    setContent('');
    setCategory('');
    setImage(null);
  };

  return (
    <form className='blog-form' onSubmit={handleSubmit}>

      <input
      ref= {titleRef}
        className='title-input'
        type="text"
        value={title}
        onChange={handleTitleChange}
        placeholder='Title'
        required
      />
      <br />

      <textarea
        className='content'
        placeholder='Content'
        value={content}
        onChange={handleContentChange}
        rows={6} cols={50}
        required
      />
      <br />

      <select className='category-select' value={category} onChange={handleCategoryChange} required>
        <option value="">Select a category</option>
        <option value="technology">Technology</option>
        <option value="food">Food</option>
        <option value="travel">Travel</option>
      </select>
      <br />

      <label htmlFor="file-upload" className='custom-file-upload'>
        <RiImageAddFill /> Add Image
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
      <button onClick={()=>console.log(content)} className='submit-button' type="submit">Submit</button>
    </form>
  );
};

export default NewBlogForm;
