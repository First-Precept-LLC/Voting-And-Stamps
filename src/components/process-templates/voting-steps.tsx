import React from 'react'

const VotingSteps = (props) => {
    const { closeModal } = props
    return (
        <>

            <div id="success-modal"
                className=" overflow-y-auto overflow-x-hidden md:inset-0 "
                style={{ zIndex: 1,display: 'flex',justifyContent: 'center' }}
            >
                <div className="relative p-4 w-full max-w-xl md:h-auto">

                    <div className="relative bg-white rounded-lg shadow ">

                        <div className="flex justify-between items-center p-5 pb-0 rounded-t" style={{ display: 'block' }}>
                            <h3 className="text-xl font-medium text-gray-900 text-center">

                            </h3>
                            <div className='flex justify-between'>
                                <div>
                                    <i
                                        onClick={closeModal}
                                        className="fa-solid text-kelvinDark mr-6 fa-chevron-left text-3xl"></i>
                                </div>
                                <div>
                                    <button type="button"
                                        onClick={closeModal}
                                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                        data-modal-toggle="large-modal">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clip-rule="evenodd"></path>
                                        </svg>
                                    </button>
                                </div>

                            </div>
                        </div>


                        <div className="flex flex-col ">
                            <div className="flex px-10 mt-10 mb-4 items-center">
                                <h1 className="text-3xl font-medium">Voting for Step - <span className="text-kelvinDark">Start Research</span></h1>
                            </div>
                            <div className="px-10 my-4">

                                <form>
                                    <label
                                        htmlFor="default-search"
                                        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
                                    <div className="relative">
                                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor"
                                                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                            </svg>
                                        </div>
                                        <input type="search" id="default-search"
                                            className="block p-4 pl-10 w-full text-sm text-gray-900 bg-kelvinLight rounded-lg border-2 border-gray-300 focus:ring-kelvinMedium focus:border-kelvinMedium dark:bg-kelvinLight dark:border-gray-300 dark:placeholder-gray-400 dark:text-white dark:focus:ring-kelvinMedium dark:focus:border-kelvinMedium"
                                            placeholder="Search 1021 values" required />
                                        <button type="submit"
                                            className="text-white absolute right-2.5 bottom-2.5 bg-kelvinMedium hover:bg-kelvinDark focus:ring-4 focus:outline-none focus:ring-kelvinMedium font-medium rounded-lg text-sm px-4 py-2 dark:bg-kelvinMedium dark:hover:bg-kelvinDark dark:focus:ring-blue-800">Search</button>
                                    </div>
                                </form>

                            </div>
                            {/* <!-- cards --> */}
                            <div className="flex flex-col px-10">
                                {/* <!-- card --> */}
                                <div className="flex shadow shadow-md rounded-md py-4 px-6 my-2 items-center justify-between">
                                    <div className="flex">
                                        <div className="flex flex-col justify-start items-start mr-2">
                                            <i className="fa-solid text-kelvinDark mr-2 fa-circle text-xl"></i>
                                        </div>
                                        <div className="mr-8">
                                            <h6 className="leading-none mb-2 ">Modern</h6>
                                            <p className="text-gray-400">Short description of value here accommodates two lines</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <div className="flex">
                                            <p className="text-kelvinDark bg-kelvinLight px-3 py-2  font-bold rounded">10</p>
                                        </div>
                                        <div className="flex my-4">
                                            <button
                                                className="focus:outline-none text-white bg-kelvinDark hover:bg-kelvinBold focus:ring-4 focus:ring-kelvinDark font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-kelvinDark dark:hover:bg-kelvinBold dark:focus:ring-kelvinDark">
                                                <i className="fa-solid text-white fa-thumbs-up"></i></button>
                                            <label htmlFor="" className="p-2 mx-2 font-medium text-lg">5</label>
                                            <button
                                                className="focus:outline-none text-white bg-kelvinDark hover:bg-kelvinBold focus:ring-4 focus:ring-kelvinDark font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-kelvinDark dark:hover:bg-kelvinBold dark:focus:ring-kelvinDark"><i
                                                    className="fa-solid text-white fa-thumbs-down"></i></button>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- card --> */}
                                <div className="flex shadow shadow-md rounded-md py-4 px-6 my-2 items-center justify-between">
                                    <div className="flex">
                                        <div className="flex flex-col justify-start items-start mr-2">
                                            <i className="fa-solid text-kelvinDark mr-2 fa-circle text-xl"></i>
                                        </div>
                                        <div className="mr-8">
                                            <h6 className="leading-none mb-2 ">Passion</h6>
                                            <p className="text-gray-400">Short description of value here accommodates two lines</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <div className="flex">
                                            <p className="text-kelvinDark bg-kelvinLight px-3 py-2  font-bold rounded">8</p>
                                        </div>
                                        <div className="flex my-4">
                                            <button
                                                className="focus:outline-none text-white bg-kelvinDark hover:bg-kelvinBold focus:ring-4 focus:ring-kelvinDark font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-kelvinDark dark:hover:bg-kelvinBold dark:focus:ring-kelvinDark"><i
                                                    className="fa-solid text-white fa-thumbs-up"></i></button>
                                            <label htmlFor="" className="p-2 mx-2 font-medium text-lg">5</label>
                                            <button
                                                className="focus:outline-none text-white bg-kelvinDark hover:bg-kelvinBold focus:ring-4 focus:ring-kelvinDark font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-kelvinDark dark:hover:bg-kelvinBold dark:focus:ring-kelvinDark"><i
                                                    className="fa-solid text-white fa-thumbs-down"></i></button>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- card --> */}
                                <div className="flex shadow shadow-md rounded-md py-4 px-6 my-2 items-center justify-between">
                                    <div className="flex">
                                        <div className="flex flex-col justify-start items-start mr-2">
                                            <i className="fa-solid text-kelvinDark mr-2 fa-circle text-xl"></i>
                                        </div>
                                        <div className="mr-8">
                                            <h6 className="leading-none mb-2 ">Futuristic</h6>
                                            <p className="text-gray-400">Short description of value here accommodates two lines</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <div className="flex">
                                            <p className="text-kelvinDark bg-kelvinLight px-3 py-2  font-bold rounded">30</p>
                                        </div>
                                        <div className="flex my-4">
                                            <button
                                                className="focus:outline-none text-white bg-kelvinDark hover:bg-kelvinBold focus:ring-4 focus:ring-kelvinDark font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-kelvinDark dark:hover:bg-kelvinBold dark:focus:ring-kelvinDark"><i
                                                    className="fa-solid text-white fa-thumbs-up"></i></button>
                                            <label htmlFor="" className="p-2 mx-2 font-medium text-lg">5</label>
                                            <button
                                                className="focus:outline-none text-white bg-kelvinDark hover:bg-kelvinBold focus:ring-4 focus:ring-kelvinDark font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-kelvinDark dark:hover:bg-kelvinBold dark:focus:ring-kelvinDark"><i
                                                    className="fa-solid text-white fa-thumbs-down"></i></button>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- card --> */}
                                <div className="flex shadow shadow-md rounded-md py-4 px-6 my-2 items-center justify-between">
                                    <div className="flex">
                                        <div className="flex flex-col justify-start items-start mr-2">
                                            <i className="fa-solid text-kelvinDark mr-2 fa-circle text-xl"></i>
                                        </div>
                                        <div className="mr-8">
                                            <h6 className="leading-none mb-2 ">Collaberative</h6>
                                            <p className="text-gray-400">Short description of value here accommodates two lines</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <div className="flex">
                                            <p className="text-kelvinDark bg-kelvinLight px-3 py-2  font-bold rounded">21</p>
                                        </div>
                                        <div className="flex my-4">
                                            <button
                                                className="focus:outline-none text-white bg-kelvinDark hover:bg-kelvinBold focus:ring-4 focus:ring-kelvinDark font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-kelvinDark dark:hover:bg-kelvinBold dark:focus:ring-kelvinDark"><i
                                                    className="fa-solid text-white fa-thumbs-up"></i></button>
                                            <label htmlFor="" className="p-2 mx-2 font-medium text-lg">5</label>
                                            <button
                                                className="focus:outline-none text-white bg-kelvinDark hover:bg-kelvinBold focus:ring-4 focus:ring-kelvinDark font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-kelvinDark dark:hover:bg-kelvinBold dark:focus:ring-kelvinDark"><i
                                                    className="fa-solid text-white fa-thumbs-down"></i></button>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- card --> */}
                                <div className="flex shadow shadow-md rounded-md py-4 px-6 my-2 items-center justify-between">
                                    <div className="flex">
                                        <div className="flex flex-col justify-start items-start mr-2">
                                            <i className="fa-solid text-kelvinDark mr-2 fa-circle text-xl"></i>
                                        </div>
                                        <div className="mr-8">
                                            <h6 className="leading-none mb-2 ">Accountability</h6>
                                            <p className="text-gray-400">Short description of value here accommodates two lines</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <div className="flex">
                                            <p className="text-kelvinDark bg-kelvinLight px-3 py-2  font-bold rounded">5</p>
                                        </div>
                                        <div className="flex my-4">
                                            <button
                                                className="focus:outline-none text-white bg-kelvinDark hover:bg-kelvinBold focus:ring-4 focus:ring-kelvinDark font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-kelvinDark dark:hover:bg-kelvinBold dark:focus:ring-kelvinDark"><i
                                                    className="fa-solid text-white fa-thumbs-up"></i></button>
                                            <label htmlFor="" className="p-2 mx-2 font-medium text-lg">5</label>
                                            <button
                                                className="focus:outline-none text-white bg-kelvinDark hover:bg-kelvinBold focus:ring-4 focus:ring-kelvinDark font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-kelvinDark dark:hover:bg-kelvinBold dark:focus:ring-kelvinDark"><i
                                                    className="fa-solid text-white fa-thumbs-down"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex px-10 mt-4">
                                <button type="button"
                                    onClick={closeModal}
                                    className="text-white bg-gradient-to-r from-kelvinDark  to-kelvinBold hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 w-36">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}
export default VotingSteps;