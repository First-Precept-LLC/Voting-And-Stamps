import Header from "./Header";
import Sidemenu from "./Sidemenu";

const MainLayout=(props)=>{
    return (
        <>
            <Header />
            <div className="flex min-h-screen ">
                <Sidemenu />
                <div className="flex w-full p-8 flex-col">
                    {props.children}
                </div>
            </div>
        </>
    )

}

export default MainLayout;