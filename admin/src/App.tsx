import { BrowserRouter as Router, Route, Routes } from "react-router"
import { ScrollToTop } from "./components/common/ScrollToTop"
import Dashboard from "./pages/Dashboard"

function App() {

  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route index path="/" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
