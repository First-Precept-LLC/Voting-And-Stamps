import { PassThrough } from "stream";


const Index = () => {


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
    
    </head>
    
    <body>
    
        
        <div className="tabs ">
            <ul
                className=" text-sm font-medium text-center text-gray-500 rounded-lg divide-x divide-gray-200 shadow flex dark:divide-gray-700 dark:text-gray-400">
                <li className="w-full">
                    <a href="#"
                        className="inline-block p-4 w-full text-lg text-white bg-kelvinDark rounded-l-lg focus:ring-4 focus:ring-blue-300 active focus:outline-none dark:bg-kelvinDark dark:text-white"
                        aria-current="page">Voting</a>
                </li>
                <li className="w-full">
                    <a href="#"
                        className="inline-block p-4 w-full text-lg bg-kelvinMedium text-white rounded-r-lg hover:text-white hover:bg-kelvinDark focus:ring-4 focus:outline-none focus:ring-blue-300 dark:hover:text-white dark:bg-kelvinMedium dark:hover:bg-kelvinDark">Impact</a>
                </li>
            </ul>
    
        </div>
        <div className="flex flex-col ">
            <div className="flex px-10 mt-10 mb-4 items-center">
                <i className="hidden fa-solid text-kelvinDark mr-6 fa-chevron-left text-3xl"></i>
                <h1 className="text-3xl font-medium">Voting<span className="hidden text-kelvinDark">Start
                        Research</span></h1>
            </div>
            <div className="flex flex-col">
                <div className="flex flex-col border-b border-kelvinMedium py-4 px-10 my-4">
                    <div className="flex flex-col mb-2">
                        <h3 className="text-kelvinDark font-medium text-xl">Start Research</h3>
                        <p>Rates Highly in Power</p>
                    </div>
                    <div className="flex flex-wrap px-4 py-6 bg-kelvinLight rounded-md justify-start mb-4">
                        <div className="flex shadow shadow-md rounded-md py-2 px-4 mx-2 my-2 items-center">
                            <i className="fa-solid text-kelvinDark mr-2 fa-rocket"></i>
                            <p className="">32</p>
                        </div>
                        <div className="flex shadow shadow-md rounded-md py-2 px-4 mx-2 my-2 items-center">
                            <i className="fa-solid text-kelvinDark mr-2 fa-heart"></i>
                            <p className="">32</p>
                        </div>
                        <div className="flex shadow shadow-md rounded-md py-2 px-4 mx-2 my-2 items-center">
                            <i className="fa-solid text-kelvinDark mr-2 fa-leaf"></i>
                            <p className="">32</p>
                        </div>
                        <div className="flex shadow shadow-md rounded-md py-2 px-4 mx-2 my-2 items-center">
                            <i className="fa-solid text-kelvinDark mr-2 fa-bolt-lightning"></i>
                            <p className="">32</p>
                        </div>
                        <div className="flex shadow shadow-md rounded-md py-2 px-4 mx-2 my-2 items-center">
                            <i className="fa-solid text-kelvinDark mr-2 fa-atom"></i>
                            <p className="">32</p>
                        </div>
                        <div className="flex shadow shadow-md rounded-md py-2 px-4 mx-2 my-2 items-center">
                            <i className="fa-solid text-kelvinDark mr-2 fa-bomb"></i>
                            <p className="">32</p>
                        </div>
    
                    </div>
                    <div className="flex">
                        <button type="button"
                            className="text-white bg-gradient-to-r from-kelvinDark  to-kelvinBold hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                            onClick={
                                () => {return;} //TODO: redirect to details with this card's props; potentially implement this function higher up
                            }
                            >Rate this content</button>
                    </div>
                </div>
                <div className="flex flex-col border-b border-kelvinMedium py-4 px-10">
                    <div className="flex flex-col mb-2">
                        <h3 className="text-kelvinDark font-medium text-xl">Start Research</h3>
                        <p>Rates Highly in Power</p>
                    </div>
                    <div className="flex flex-wrap px-4 py-6 bg-kelvinLight rounded-md justify-start mb-4">
                        <div className="flex shadow shadow-md rounded-md py-2 px-4 mx-2 my-2 items-center">
                            <i className="fa-solid text-kelvinDark mr-2 fa-rocket"></i>
                            <p className="">32</p>
                        </div>
                        <div className="flex shadow shadow-md rounded-md py-2 px-4 mx-2 my-2 items-center">
                            <i className="fa-solid text-kelvinDark mr-2 fa-heart"></i>
                            <p className="">32</p>
                        </div>
                        <div className="flex shadow shadow-md rounded-md py-2 px-4 mx-2 my-2 items-center">
                            <i className="fa-solid text-kelvinDark mr-2 fa-leaf"></i>
                            <p className="">32</p>
                        </div>
                        <div className="flex shadow shadow-md rounded-md py-2 px-4 mx-2 my-2 items-center">
                            <i className="fa-solid text-kelvinDark mr-2 fa-bolt-lightning"></i>
                            <p className="">32</p>
                        </div>
                        <div className="flex shadow shadow-md rounded-md py-2 px-4 mx-2 my-2 items-center">
                            <i className="fa-solid text-kelvinDark mr-2 fa-atom"></i>
                            <p className="">32</p>
                        </div>
                        <div className="flex shadow shadow-md rounded-md py-2 px-4 mx-2 my-2 items-center">
                            <i className="fa-solid text-kelvinDark mr-2 fa-bomb"></i>
                            <p className="">32</p>
                        </div>
    
                    </div>
                    <div className="flex">
                        <button type="button"
                            className="text-white bg-gradient-to-r from-kelvinDark  to-kelvinBold hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Rate
                            this content</button>
                    </div>
                </div>
                <div className="flex flex-col border-b border-kelvinMedium py-4 px-10">
                    <div className="flex flex-col mb-2">
                        <h3 className="text-kelvinDark font-medium text-xl">Start Research</h3>
                        <p>Rates Highly in Power</p>
                    </div>
                    <div className="flex flex-wrap px-4 py-6 bg-kelvinLight rounded-md justify-start mb-4">
                        <div className="flex shadow shadow-md rounded-md py-2 px-4 mx-2 my-2 items-center">
                            <i className="fa-solid text-kelvinDark mr-2 fa-rocket"></i>
                            <p className="">32</p>
                        </div>
                        <div className="flex shadow shadow-md rounded-md py-2 px-4 mx-2 my-2 items-center">
                            <i className="fa-solid text-kelvinDark mr-2 fa-heart"></i>
                            <p className="">32</p>
                        </div>
                        <div className="flex shadow shadow-md rounded-md py-2 px-4 mx-2 my-2 items-center">
                            <i className="fa-solid text-kelvinDark mr-2 fa-leaf"></i>
                            <p className="">32</p>
                        </div>
                        <div className="flex shadow shadow-md rounded-md py-2 px-4 mx-2 my-2 items-center">
                            <i className="fa-solid text-kelvinDark mr-2 fa-bolt-lightning"></i>
                            <p className="">32</p>
                        </div>
                        <div className="flex shadow shadow-md rounded-md py-2 px-4 mx-2 my-2 items-center">
                            <i className="fa-solid text-kelvinDark mr-2 fa-atom"></i>
                            <p className="">32</p>
                        </div>
                        <div className="flex shadow shadow-md rounded-md py-2 px-4 mx-2 my-2 items-center">
                            <i className="fa-solid text-kelvinDark mr-2 fa-bomb"></i>
                            <p className="">32</p>
                        </div>
    
                    </div>
                    <div className="flex">
                        <button type="button"
                            className="text-white bg-gradient-to-r from-kelvinDark  to-kelvinBold hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Rate
                            this content</button>
                    </div>
                </div>
            </div>
        </div>
    </body>
    </>
    );

};

export default Index;