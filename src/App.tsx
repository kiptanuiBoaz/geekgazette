import { Route, Routes, Navigate } from "react-router-dom";
import { Layout } from "./Layout";
import { HomePage, Navbar } from "./pages/index";
import { FullBlogPage, EditBlog, NewBlogForm, LoginForm, SignUpForm } from './pages/index';


export const App = () => {

  return (
    <Routes>
   
      <Route path="/" element={<Layout />}>

        <Route index element={<HomePage />} />

        <Route path="blog">
          <Route path="write" element={<NewBlogForm />} />
          <Route path=":postId" element={<FullBlogPage />} />
          <Route path="edit/:blogId" element={<EditBlog />} />
        </Route>

        <Route path="auth">


        </Route>

     
      </Route>
      <Route path="sign-in" element={<LoginForm />} />
      <Route path="sign-up" element={<SignUpForm />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

