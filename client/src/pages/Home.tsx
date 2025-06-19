import { useNavigate, useSearchParams } from "react-router-dom"
import PageMeta from "../components/common/PageMeta"
import AuthPage from "./AuthPage";

const Home = () => {
  const [ searchParams ] = useSearchParams();
  const navigate = useNavigate();
  const authMode = searchParams.get("authMode");
  const isAuthModalOpen = !!authMode; // (!!) :- convert any value to a strict boolean (true or false).

  const handleCloseModal = () => {
    navigate("/", { replace: true });
  };

  return (
    <>
        <PageMeta 
            title="LearnEase"
            description="LearnEase dashboard page"
        />
        home
        {isAuthModalOpen && (
        <AuthPage authMode={authMode || "login"} onClose={handleCloseModal} />
      )}
        
    </>
  )
}

export default Home