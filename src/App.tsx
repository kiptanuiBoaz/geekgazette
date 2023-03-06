import { Route, Routes } from "react-router-dom";
import { Layout } from "./Layout";
import { HomePage, Navbar } from "./pages/index"


export const App = () => {

  return (
    <Routes>
      {/* parent element emitting children */}
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
      </Route>
    </Routes>
  )
}

