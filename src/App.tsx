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
        const postsWithoutAuthor = response.data;

        const authorRequests = postsWithoutAuthor.map(async (post: any) => {
          // or handle the missing email property in some other way
          if (!post.authorEmail) return post;
          //get author info from users
          try {
            const res = await privateApi.get(`/users/user?email=${post.authorEmail}`);
            const user = res.data;
            //retrun new users with added author info
            return {
              ...post,
              author: {
                fname: user.fname,
                lname: user.lname,
                avatarUrl: user.avatarUrl,
                headTag: user.headTag
              }

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
  }, []);


  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />

          <Route path="blog">
            <Route element={<RequireAuth />} >
              <Route path="write" element={<NewBlogForm postId={undefined} />} />
              <Route path="edit/:postId" element={<EditBlog />} />
              <Route path="read/:postId" element={<FullBlogPage />} />
            </Route>
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

