import { Route, Routes, Navigate } from "react-router-dom";
import { Layout } from "./Layout";
import { HomePage, Navbar } from "./pages/index";
import { FullBlogPage, EditBlog, NewBlogForm } from './pages/index';


export const App = () => {

  return (
    <Routes>
      {/* parent element emitting children */}
      <Route path="/" element={<Layout />}>
        {/* read and hero page */}
        <Route index element={<HomePage />} />
        {/* blog main page */}
        
        <Route path="blog">
          {/* root of /posts */}
          <Route path="write" element={<NewBlogForm />} />
          <Route path=":postId" element={<FullBlogPage />} />
          <Route path="edit/:blogId" element={<EditBlog />} />

        </Route>
        {/* catching all the exceptions */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

