import { lazy, Suspense, useEffect } from "react";
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
import { useDispatch } from "react-redux";
import usePrivateApi from "./hooks/usePrivateApi";
import { setPosts } from "./api/postsSlice";

const POSTS_URL = "/posts";

export const App = () => {
  const dispatch = useDispatch();
  const privateApi = usePrivateApi();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await privateApi.get(POSTS_URL);
        dispatch(setPosts(response.data));
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchPosts();
  }, []);
  

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />

          <Route path="blog">
            <Route element={<RequireAuth />} >
              <Route path="write" element={<NewBlogForm />} />
              <Route path="edit/:blogId" element={<EditBlog />} />
              <Route path="edit/:username" element={<UserProfileEditPage />} />
            </Route>
          </Route>
          <Route path=":postId" element={<FullBlogPage />} />
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

