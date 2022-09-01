import Header from "./Header";
import Sidemenu from "./Sidemenu";
import ErrorBoundary from "./ErrorBoundry";

const MainLayout = (props) => {
    return (
        <ErrorBoundary>
            <Header />
            <div className="flex min-h-screen ">
                <Sidemenu />
                <div className="flex w-full p-8 flex-col">
                    {props.children}
                </div>
            </div>
        </ErrorBoundary>
    )
}

export default MainLayout;