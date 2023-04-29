import NewBlogForm from './NewBlogForm';
import { useParams } from 'react-router-dom';

const EditBlog = () => {
  const { postId } = useParams();

  return (
    <NewBlogForm postId={postId} />
  )
}
export default EditBlog;