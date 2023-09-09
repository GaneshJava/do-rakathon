import AppRoutes from "utils/AppRoutes";
import LeftSideNav from "./leftNavBar";
import Header from "./header";

const AppLayout = (props) => {
    return (
        <div>
            <div className="bg-dark-app text-white h-screen w-screen overflow-hidden flex flex-row">
                <LeftSideNav />
                <div className="flex flex-col flex-1">
                    <Header />
                    <div className="flex-1 p-4 h-screen overflow-auto">
                        <AppRoutes />
                    </div>
                </div>
            </div>

        </div>
    );
}

export default AppLayout;