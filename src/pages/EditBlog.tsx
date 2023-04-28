import  NewBlogForm  from './NewBlogForm';
import { useParams } from 'react-router-dom';

 const EditBlog = () => {
  const {postId} = useParams();

    // //posts from state and filter blog curently editing
    // const blogs = useSelector((state: any) => state?.posts.posts);
    // const blog: PostInterface = blogs.find((b: PostInterface) => b._id === postId);
  
  return (
   <NewBlogForm postId={postId}/>
  )
}
export default EditBlog;