function Department(){
    return (
        <>
        <head>
        <meta charSet="UTF-8"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Project Kelvin Widget</title>
        <script src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio,line-clamp"></script>
        <link rel="stylesheet" href="https://unpkg.com/flowbite@1.4.4/dist/flowbite.min.css" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/js/all.min.js"
            integrity="sha512-6PM0qYu5KExuNcKt5bURAoT6KCThUmHRewN3zUFNaoI6Di7XJPTMoT6K0nsagZKk2OB4L7E3q1uQKHNHd4stIQ=="
            crossOrigin="anonymous" referrerPolicy="no-referrer"></script>
        <link
            href="https://fonts.googleapis.com/css?family=Poppins:100,100italic,200,200italic,300,300italic,regular,italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic"
            rel="stylesheet" />
        <link rel="stylesheet" href="./assets/css/style.css"/>
        <script src="/tailwind.js"></script>
    </head>
    <div className="flex flex-row">
        <div className="flex flex-col justify-between min-h-full w-64 p-8 bg-kelvinLight shadow shadow-md">
            <div className="flex flex-col">
                <div className="flex flex-col">
                    <a href="/process-templates" className="text-kelvinDark mb-3"><i className="fa-solid  fa-chart-simple mr-1"></i> Process
                        Templates</a>
                    <a href="#" className="text-kelvinDark mb-3"><i className="fa-solid  fa-chart-simple mr-1"></i>
                        Processes</a>
                </div>
                <hr className="my-10"/>
                <div className="flex flex-col">
                    <a href="/organizations" className="text-kelvinDark mb-3"><i className="fa-solid  fa-chart-simple mr-1"></i>
                        Organizations</a>
                    <a href="/department" className="text-kelvinDark mb-3"><i className="fa-solid  fa-chart-simple mr-1"></i>
                        Departments</a>
                    <a href="#" className="text-kelvinDark mb-3"><i className="fa-solid  fa-chart-simple mr-1"></i> Roles</a>
                    <a href="#" className="text-kelvinDark mb-3"><i className="fa-solid  fa-chart-simple mr-1"></i> Users</a>
                </div>
            </div>
            <div className="flex mt-10 text-center text-sm text-kelvinBlack opacity-50">
                <p className="font-normal">You're in a company-managed project. <br/><a href=""
                        className="font-medium  hover:text-kelvinBold">Learn More</a>
                </p>
            </div>
        </div>
        {/* <!-- right main section --> */}
        <div className="flex w-full p-8 flex-col">
            <h1 className="text-3xl mb-8">R & D Department</h1>
            
            {/* <!-- Process section --> */}
            <div className="flex flex-col mb-8">
                <div className="flex justify-between items-center">
                    <h4 className="mb-1 text-md">Process
                    </h4>
                </div>
                <div className="flex bg-kelvinLight p-4 rounded-md w-full flex-wrap">
                    <div
                        className="flex items-center w-full min-h-8 justify-between px-4 py-1 bg-white shadow shadow-md rounded-md mb-2 flex-wrap">
                        <h6 className="mr-2 w-1/2">Reach $1Trillion revenue mark</h6>
                        <p className="text-sm opacity-50 mr-2 font-normal w-48">Matt</p>
                        <p className="text-sm mr-2 opacity-50 w-36 font-normal">By Aug 24th, 2022</p>

                        <div className="flex">
                            <button type="button"
                                className="text-white bg-kelvinMedium hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-md text-sm px-5 py- h-6 text-left w-32 text-center "
                                data-modal-toggle="large-modal">
                                On Track</button>
                            <a href="#" className=" px-2 hover:bg-kelvinLight ml-2 rounded-full">
                                <i className="fa-solid fa-ellipsis-vertical text-xl"></i>
                            </a>
                        </div>
                    </div>
                    <div
                        className="flex items-center w-full min-h-8 justify-between px-4 py-1 bg-white shadow shadow-md rounded-md mb-2 flex-wrap">
                        <h6 className="mr-2 w-1/2">Increase production capacity to 100 cars per day </h6>
                        <p className="text-sm opacity-50 mr-2 font-normal w-48">Saidutt</p>
                        <p className="text-sm mr-2 opacity-50 w-36 font-normal">By Sept 24th, 2022</p>

                        <div className="flex">
                            <button type="button"
                                className="text-white bg-kelvinMedium hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-md text-sm px-5 py- h-6 text-left w-32 text-center "
                                data-modal-toggle="large-modal">
                                On Track</button>
                            <a href="#" className=" px-2 hover:bg-kelvinLight ml-2 rounded-full">
                                <i className="fa-solid fa-ellipsis-vertical text-xl"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        </>
    )
}
export default Department;