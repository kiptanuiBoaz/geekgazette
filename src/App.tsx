import { lazy, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Layout } from "./Layout";
const HomePage = lazy(() => import ("./pages/HomePage"));
const FullBlogPage = lazy(() => import ("./pages/FullBlogPage"));
const EditBlog = lazy(() => import ("./pages/EditBlog"));
const NewBlogForm = lazy(() => import ("./pages/NewBlogForm"));
const LoginForm = lazy(() => import ("./pages/LoginForm"));
const About = lazy(() => import ("./pages/About"));
const SignUpForm = lazy(() => import ("./pages/SignUpForm"));
const UserProfileForm = lazy(() => import ("./pages/UserProfileForm"));
const AuthHome = lazy(() => import ("./pages/AuthHome"));
const UserProfileEditPage = lazy(() => import ("./pages/UserProfileEditPage"));



export const App = () => {

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />

          <Route path="blog">
            <Route path="write" element={<NewBlogForm />} />
            <Route path=":postId" element={<FullBlogPage />} />
            <Route path="edit/:blogId" element={<EditBlog />} />
          </Route>
          <Route path="edit/:username" element={<UserProfileEditPage />}/>
        
          <Route path="about" element={<About />} />
        </Route>

        <Route path="auth" element={<AuthHome />}>
          <Route path="sign-in" element={<LoginForm />} />
          <Route path="sign-up" element={<SignUpForm />} />
          <Route path="new-profile" element={<UserProfileForm />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}

