import { Outlet } from "react-router"
import AppHeader from "./AppHeader"
import AppFooter from "./AppFooter"


const LayoutContent: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#ffffff] text-black">
            <div>
                <AppHeader />
            </div>
            <div>
                <Outlet />
            </div>
            <div>
                <AppFooter />
            </div>
        </div>
    )
}


const AppLayout = () => {
  return (
    <LayoutContent />
  )
}

export default AppLayout