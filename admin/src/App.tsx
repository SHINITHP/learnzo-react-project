import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/theme-context";
import Layout from "./layouts/layout";
import DashboardPage from "./pages/Dashboard";

// Optional: Scroll restoration if needed
import { ScrollToTop } from "@/components/common/ScrollToTop";
import SignIn from "./pages/SignIn";

function App() {
  return (
    <ThemeProvider storageKey="theme">
      <Router>
        <ScrollToTop /> 
        <Routes>
          <Route element={<Layout />}>
            <Route index path="/" element={<DashboardPage />} />
            <Route path="analytics" element={<h1 className="title">Analytics</h1>} />
            <Route path="reports" element={<h1 className="title">Reports</h1>} />
            <Route path="customers" element={<h1 className="title">Customers</h1>} />
            <Route path="new-customer" element={<h1 className="title">New Customer</h1>} />
            <Route path="verified-customers" element={<h1 className="title">Verified Customers</h1>} />
            <Route path="products" element={<h1 className="title">Products</h1>} />
            <Route path="new-product" element={<h1 className="title">New Product</h1>} />
            <Route path="inventory" element={<h1 className="title">Inventory</h1>} />
            <Route path="settings" element={<h1 className="title">Settings</h1>} />
          </Route>
          <Route path="/sign-in" element={<SignIn />}/>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
