import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter as Router, Routes,Route, Navigate} from "react-router-dom";
import { SingleBlog,EditBlog ,NewBlogForm} from './pages/index';
import {App} from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
     <Router>
        <Routes>
          <Route path='/*' element={<App />} />
          <Route path=":postId" element={<SingleBlog />} />

          <Route path="blog">
          {/* root of /posts */}
          <Route index element={<NewBlogForm />} />
          {/* /postId paramater */}
          <Route path="edit/:blogId" element={<EditBlog />} />
         
        </Route>
          {/* catching all the exceptions */}
        <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
  </React.StrictMode>
)
