import { BrowserRouter as Router, Routes, Route } from "react-router";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Home";
import AppLayout from "./layout/AppLayout";
import CoursesDetailsPage from "./pages/CoursesDetailsPage";

function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Home />} />
            <Route index path="/courses/:id" element={<CoursesDetailsPage />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
