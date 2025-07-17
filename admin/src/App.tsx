import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/theme-context";
import Layout from "./layouts/layout";
import DashboardPage from "./pages/Dashboard";

import { ScrollToTop } from "@/components/common/ScrollToTop";
import SignIn from "./pages/SignIn";
import AuthCheck from "./hooks/AuthCheck";
import RequireAuth from "./components/common/RequiredAuth";
import AddCourse from "./pages/AddCourse";
import EditCourse from "./pages/EditCourse";
import AddChapter from "./pages/AddChapter";
import CoursesList from "./pages/CoursesList";

function App() {
  return (
    <ThemeProvider storageKey="theme">
      <Router>
        <AuthCheck />
        <ScrollToTop />
        <Routes>
          <Route path="/admin/sign-in" element={<SignIn />} />

          <Route
            path="/"
            element={
              <RequireAuth>
                <Layout />
              </RequireAuth>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route
              path="analytics"
              element={<h1 className="title">Analytics</h1>}
            />
            <Route
              path="reports"
              element={<h1 className="title">Reports</h1>}
            />
            <Route
              path="customers"
              element={<h1 className="title">Customers</h1>}
            />
            <Route
              path="new-customer"
              element={<h1 className="title">New Customer</h1>}
            />
            <Route
              path="verified-customers"
              element={<h1 className="title">Verified Customers</h1>}
            />
            <Route
              path="courses"
              element={<CoursesList />}
            />
            <Route path="courses/:id" element={<EditCourse />} />
            <Route path="courses/:id/chapters/:chapterId" element={<AddChapter />} />

            <Route path="add-course" element={<AddCourse />} />
            <Route
              path="settings"
              element={<h1 className="title">Settings</h1>}
            />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
