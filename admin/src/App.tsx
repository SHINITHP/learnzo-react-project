import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/theme-context";
import Layout from "./layouts/layout";
import DashboardPage from "./pages/Dashboard";
import { ScrollToTop } from "@/components/common/ScrollToTop";
import SignIn from "./pages/SignIn";
// import AuthCheck from "./hooks/AuthCheck";
import RequireAuth from "./components/common/RequiredAuth";
import AddCourse from "./pages/AddCourse";
import EditCourse from "./pages/EditCourse";
import AddChapter from "./pages/AddEditChapter";
import CoursesList from "./pages/CoursesList";
import AddModules from "./pages/AddEditModules";
import { useCrossTabLogout } from "./hooks/useCrossTabLogout";

function CrossTabLogoutHandler() {
  useCrossTabLogout();
  return null;
}

function App() {
  return (
    <ThemeProvider storageKey="theme">
      <Router>
        <CrossTabLogoutHandler />
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
            <Route path="courses" element={<CoursesList />} />
            <Route path="courses/:id" element={<EditCourse />} />
            <Route
              path="courses/:id/module/:moduleId"
              element={<AddModules />}
            />
            <Route
              path="courses/:id/module/:moduleId/chapters/:chapterId"
              element={<AddChapter />}
            />

            <Route path="create-course" element={<AddCourse />} />
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
