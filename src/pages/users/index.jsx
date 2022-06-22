import React from "react";


function Users() {
    return (
        <div className="flex w-full p-8 flex-col">
        <div className="flex justify-between">
            <h1 className="text-3xl mb-8">Processes List</h1>
            <div className="flex">
                <input type="text" id="search-process-template"
                    className="block p-2 px-5  h-8  w-44 text-gray-900 bg-white rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 mr-2"
                    placeholder="Search..." />
                <button
                    className="bg-kelvinMedium hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-md text-sm px-5  h-8 text-left mb-2 hover:bg-kelvinBold"
                    id="dropdownDefault" data-dropdown-toggle="dropdown">
                    <i className="fa-solid fa-sort"></i>
                    Filters</button>
            </div>
        </div>
        {/* <!-- Process section --> */}
        <div className="flex flex-col mb-8">
        <div className="flex  py-1 pl-4 w-full items-center justify-between">
            <h4 className="mb-1 mr-5 text-md">Process
            </h4>
            <h4 className="mb-1 mx-5 text-md">Process Template
            </h4>
            <h4 className="mb-1 mx-5 text-md">Due by
            </h4>
            <h4 className="mb-1 mx-5 text-md">Assignees
            </h4>
            <h4 className="mb-1  text-md">Progress
            </h4>
        </div>
         
        
        <div className="flex bg-kelvinLight p-4 rounded-md w-full flex-wrap">
            <div
                className="flex items-center w-full min-h-8 justify-between pl-4 py-1 bg-white shadow shadow-md rounded-md mb-2 ">
                <h6 className="mr-2 "> Research of Model v1</h6>
                <h6 className="mr-2 text-black/50">Start research development</h6>
                <p className="text-sm opacity-50 mr-2 font-normal">by Aug 22, 2022</p>
                <p className="text-sm opacity-50 mr-2 font-normal">Matt</p>
                <div className="flex flex-col">
                    <div className="mb-1 text-xs text-black/50"style={{textAlign:'center'}}>33%</div>
                    <div className="w-32 bg-gray-400 rounded-full h-1.5">
                        <div className=" h-1.5 rounded-full " style={{width: '45%',background:"#6cef6c"}}></div>
                    </div>
                </div>
                <div className="flex">
                    <button 
                    // onClick={ontrackModal}
                    className=" bg-kelvinMedium hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-md text-sm px-2  h-6 text-left mr-2 w-24 text-center "
                        data-modal-toggle="large-modal">
                        On Track</button>
                    {/* <button 
                        className=" bg-kelvinMedium hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-md text-sm px-2 h-6 text-left w-24 text-center "
                        data-modal-toggle="large-modal">
                        24 Votes</button> */}<p style={{lineHeight:'10px',textAlign:'center'}}><span style={{fontSize:'20px'}} >24</span><br/><span style={{fontSize:'10px'}}>Votes</span></p>
                    <a href="#" className=" px-4 hover:bg-kelvinLight rounded-full">
                        <i className="fa-solid fa-ellipsis-vertical text-xl"></i>
                    </a>
                </div>
            </div>
            <div
                className="flex items-center w-full min-h-8 justify-between pl-4 py-1 bg-white shadow shadow-md rounded-md mb-2 ">
                <h6 className="mr-2 ">Submission of Model v2</h6>
                <h6 className="mr-2 text-black/50">Submitting Designs</h6>
                <p className="text-sm opacity-50 mr-2 font-normal">by Aug 28, 2022</p>
                <p className="text-sm opacity-50 mr-2 font-normal">Saidutt</p>
                <div className="flex flex-col">
                    <div className="mb-1 text-xs text-black/50"style={{textAlign:'center'}}>33%</div>
                    <div className="w-32 bg-gray-400 rounded-full h-1.5">
                        <div className=" h-1.5 rounded-full " style={{width: '45%',background:"#6cef6c"}}></div>
                    </div>
                </div>
                <div className="flex">
                    <button 
                    // onClick={ontrackModal}
                        className=" bg-kelvinMedium hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-md text-sm px-2  h-6 text-left mr-2 w-24 text-center "
                        data-modal-toggle="large-modal">
                        On Track</button>
                    {/* <button
                        className=" bg-kelvinMedium hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-md text-sm px-2 h-6 text-left w-24 text-center "
                        data-modal-toggle="large-modal">
                        24 Votes</button> */}<p style={{lineHeight:'10px',textAlign:'center'}}><span style={{fontSize:'20px'}} >2</span><br/><span style={{fontSize:'10px'}}>Votes</span></p>
                    <a href="#" className=" px-4 hover:bg-kelvinLight rounded-full">
                        <i className="fa-solid fa-ellipsis-vertical text-xl"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>
       
    </div>
    )
}
export default Users;