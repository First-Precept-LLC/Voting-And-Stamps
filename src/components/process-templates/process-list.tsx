import React from 'react';

const ProcessList = (props) => {
    const {createList} = props;
    return (
        <>
            <div className="flex w-full flex-col">
                <div className="flex justify-between">
                    <h1 className="text-3xl mb-8">Process Template List</h1>
                    <div className="flex">
                        <input type="text" id="search-process-template"
                            className="block p-2 px-5  h-8  w-44 text-gray-900 bg-white rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 mr-2"
                            placeholder="Search..." />
                        <button
                            className="text-white  bg-kelvinMedium hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-md text-sm px-5  h-8 text-left mb-2 hover:bg-kelvinBold"
                            id="dropdownDefault" data-dropdown-toggle="dropdown">
                            <i className="fa-solid fa-sort"></i>
                            Filters</button>
                    </div>
                </div>
                {/* <!-- Process section --> */}
                <div className="flex flex-col mb-8">
                    <div className="flex  items-center">
                        <h4 className="text-kelvinDark mb-1 text-md">Process Template
                        </h4>
                        <h4 className="text-kelvinDark mb-1 text-md" style={{ marginLeft: '190px' }}>Project
                        </h4>
                    </div>
                    <div className="flex bg-kelvinLight p-4 rounded-md w-full flex-wrap">
                        <div
                            className="flex items-center w-full min-h-8 justify-between pl-4 py-1 bg-white shadow shadow-md rounded-md mb-2 ">
                            <h6 className="mr-2 w-1/2">Start research development</h6>
                            <p className="text-sm opacity-50 mr-2 font-normal w-32" style={{ marginRight: '27%' }}>R&D</p>
                            <div className="flex items-center">
                                <button onClick={createList}
                                    className="text-white bg-kelvinMedium hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-md text-sm px-5 py- h-6 text-left w-44 text-center items-center mr-2"
                                    data-modal-toggle="large-modal">
                                    <i className="fa-solid fa-play text-white mt-1 mr-1 text-xs"></i>
                                    Create Processes</button>
                                <button
                                    className="text-white bg-kelvinMedium hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-md text-sm px-5 py- h-6 text-left w-20 text-center "
                                    data-modal-toggle="large-modal">
                                    Edit</button>
                                <a href="#" className=" px-4 hover:bg-kelvinLight rounded-full">
                                    <i className="fa-solid fa-ellipsis-vertical mt-1 text-xl"></i>
                                </a>
                            </div>
                        </div>

                        <div
                            className="flex items-center w-full min-h-8 justify-between pl-4 py-1 bg-white shadow shadow-md rounded-md mb-2">
                            <h6 className="mr-2 w-1/2">Submiting Designs</h6>
                            <p className="text-sm opacity-50 mr-2 font-normal w-32" style={{ marginRight: '27%' }}>R&D</p>
                            <div className="flex items-center">
                                <button onClick={createList}
                                    className="text-white bg-kelvinMedium hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-md text-sm px-5 py- h-6 text-left w-44 text-center items-center mr-2"
                                    data-modal-toggle="large-modal">
                                    <i className="fa-solid fa-play text-white mt-1 mr-1 text-xs"></i>
                                    Create Processes
                                </button>
                                <button
                                    className="text-white bg-kelvinMedium hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-md text-sm px-5 py- h-6 text-left w-20 text-center "
                                    data-modal-toggle="large-modal">
                                    Edit</button>
                                <a href="#" className=" px-4 hover:bg-kelvinLight rounded-full">
                                    <i className="fa-solid fa-ellipsis-vertical mt-1 text-xl"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ProcessList;