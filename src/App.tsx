import { lazy, Suspense, useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Layout } from "./Layout";
const HomePage = lazy(() => import("./pages/HomePage"));
const FullBlogPage = lazy(() => import("./pages/FullBlogPage"));
const EditBlog = lazy(() => import("./pages/EditBlog"));
const NewBlogForm = lazy(() => import("./pages/NewBlogForm"));
const LoginForm = lazy(() => import("./pages/LoginForm"));
const About = lazy(() => import("./pages/About"));
const SignUpForm = lazy(() => import("./pages/SignUpForm"));
const UserProfileForm = lazy(() => import("./pages/UserProfileForm"));
const AuthHome = lazy(() => import("./pages/AuthHome"));
const UserProfileEditPage = lazy(() => import("./pages/UserProfileEditPage"));
const RequireAuth = lazy(() => import("./pages/RequireAuth"));
import { useDispatch, useSelector } from "react-redux";
import { api } from "./axios/axios";
import { setPosts } from "./api/postsSlice";
import { Spinner } from "./components";
import { PostInterface } from "./api/reduxTypes"
import { Loading } from 'notiflix/build/notiflix-loading-aio';

const POSTS_URL = "/posts";
interface PostsState {
  posts: { posts: PostInterface[]; }
}

export const App = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const blogs = useSelector((state: PostsState) => state?.posts.posts);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await api.get(POSTS_URL);
        const postsWithoutAuthor = response.data;

        const authorRequests = postsWithoutAuthor.map(async (post: any) => {
          // or handle the missing email property in some other way
          if (!post.authorEmail) return post;
          //get author info from users
          try {
            const res = await api.get(`/users/user?email=${post.authorEmail}`);
            const { fname, lname, avatarUrl, headTag } = res.data;
            //retrun new users with added author info
            return {
              ...post,
              author: { fname, lname, avatarUrl, headTag }
            };

          } catch (err) {
            return console.error(err);
          }
        });

        const postsWithAuthors = await Promise.all(authorRequests);

        dispatch(setPosts(postsWithAuthors));
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
    setIsLoading(false);
  },[]);

  if (isLoading) return <Spinner />
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />

          <Route path="blog">
            <Route element={<RequireAuth />} >
              <Route path="write" element={<NewBlogForm postId={undefined} />} />
              <Route path="edit/:postId" element={<EditBlog />} />
            </Route>
            <Route path="read/:postId" element={<FullBlogPage />} />
          </Route>

          <Route element={<RequireAuth />} >
            <Route path="edit/:username" element={<UserProfileEditPage />} />
          </Route>

          <Route path="about" element={<About />} />
        </Route>


        <Route path="auth" element={<AuthHome />}>
          <Route path="sign-in" element={<LoginForm />} />
          <Route path="sign-up" element={<SignUpForm />} />
          <Route element={<RequireAuth />} >
            <Route path="new-profile" element={<UserProfileForm />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}

// npm run dev -- --host
