import React from'react'

const ViewProcess=(props)=>{
    const {votedModal} = props;
    return (
        <>
        <div className="flex w-full p-8 flex-col">
            <div className="flex justify-between">
                <h1 className="text-3xl mb-8">Research for Model V1</h1>
            </div>


            <div className="flex flex-col">

                <div className="flex flex-col mb-4">
                    <div className="flex mb-4">
                        <p className="text-kelvinDark p-2 px-4 border-2 mr-4 text-sm border-gray-300 rounded">Due by 14 jun,
                            2022
                        </p>
                        <div className="text-kelvinDark p-2 px-4 border-2 text-sm border-gray-300 rounded">Assignee <span
                                className="text-white bg-kelvinDark p-1 px-2 ml-2 rounded text-sm">saidutt</span>
                        </div>
                    </div>
                    <p className="text-kelvinBlack text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
                        accusantium veritatis libero
                        doloremque. Possimus ut laboriosam, odit consequuntur, animi laborum minus nulla maiores culpa
                        totam quae, impedit quas enim reiciendis.</p>
                </div>
            </div>
            <div className="flex flex-col">
                <h6 className="text-kelvinDark">Steps</h6>
                <div className="flex grid grid-cols-2 gap-4">
                    <div className="flex  bg-kelvinLight p-4">
                        <div className="flex flex-col w-full">
                            <div
                                className="flex items-center w-full min-h-8 justify-start pl-4 py-1 bg-white shadow shadow-md rounded-md mb-2 flex-wrap border-2 border-gray-300">
                                <input id="link-checkbox" type="checkbox" value=""
                                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 mr-2"/>

                                <h6 className="">Reach $1Trillion revenue mark</h6>
                            </div>
                            <div
                                className="flex items-center w-full min-h-8 justify-start pl-4 py-1 bg-white shadow shadow-md rounded-md mb-2 flex-wrap">
                                <input id="link-checkbox" type="checkbox" value=""
                                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 mr-2"/>

                                <h6 className="">Reach $2Trillion revenue mark</h6>
                            </div>
                            <div
                                className="flex items-center w-full min-h-8 justify-start pl-4 py-1 bg-white shadow shadow-md rounded-md mb-2 flex-wrap">
                                <input id="link-checkbox" type="checkbox" value=""
                                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 mr-2"/>

                                <h6 className="">Reach $3Trillion revenue mark</h6>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col bg-kelvinLight p-8">
                        <h5 className="text-lg mb-4">Start Research</h5>
                        <div className="flex mb-4 flex-wrap">
                            <p className="text-kelvinDark p-2 px-4 border-2 mr-4 text-sm border-gray-200 rounded">Due by 14
                                jun,
                                2022
                            </p>
                            <div className="text-kelvinDark p-2 px-4 border-2 text-sm border-gray-200 rounded mr-2">Assignee
                                <span className="text-white bg-kelvinDark p-1 px-2 ml-2 rounded text-sm">saidutt</span>
                            </div>
                            <button onClick={votedModal} className="flex text-white bg-kelvinDark items-center px-2 rounded text-sm">
                                {/* <!-- navigate to voting widget --> */}
                                <i className="fa-solid fa-check-to-slot mr-1 text-white"></i>Votes (23)
                            </button>
                        </div>
                        <p className="text-black/75 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Maxime
                            accusantium veritatis libero
                            doloremque. Possimus ut laboriosam, odit consequuntur, animi laborum minus nulla maiores
                            culpa
                            totam quae, impedit quas enim reiciendis.</p>

                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default ViewProcess;