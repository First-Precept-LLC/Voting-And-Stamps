import React, { useEffect, useState } from 'react'


const VotingSteps = (props) => {
    const {
        closeModal,
        stepName,
        values,
        selectedStep,
        onSaveClick
    } = props;

    const [search, setSearch] = useState('');
    const [searchedValues, setSearchedValues] = useState([...values]);
    const [selectedStepVotes, setSelectedStepVotes] = useState({});

    useEffect(() => {
        if (selectedStep?.votes) {
            setSelectedStepVotes({
                ...selectedStep?.votes
            })
        }
    }, [selectedStep]);

    const handleUpVoteHandler = (item) => {
        const copyStepValue = { ...selectedStepVotes };
        const totalValueVotes = Number(item.votes ?? 0);
        const stepValuePresent = copyStepValue?.[item?.id] ? { ...copyStepValue?.[item?.id] } : null;
        if (stepValuePresent) {
            const valueDownVotes = Number(stepValuePresent.downVotes);
            const valueUpVotes = Number(stepValuePresent.upVotes);
            if ((valueDownVotes + valueUpVotes + 1) <= totalValueVotes) {
                stepValuePresent.upVotes = stepValuePresent.upVotes + 1;
            }
            copyStepValue[item?.id] = stepValuePresent;
        } else {
            copyStepValue[item.id] = {
                downVotes: 0,
                upVotes: 1,
                valueId: item.id,
                valueName: item.name,
                stepId: selectedStep.id
            }
        }
        setSelectedStepVotes(copyStepValue);
    }

    const handleDownVoteHandler = (item) => {
        const copyStepValue = { ...selectedStepVotes };
        const totalValueVotes = Number(item.votes ?? 0);
        const stepValuePresent = copyStepValue?.[item?.id] ? { ...copyStepValue?.[item?.id] } : null;
        if (stepValuePresent) {
            const valueDownVotes = Number(stepValuePresent.downVotes);
            const valueUpVotes = Number(stepValuePresent.upVotes);
            if ((valueDownVotes + valueUpVotes + 1) <= totalValueVotes) {
                stepValuePresent.downVotes = stepValuePresent.downVotes + 1;
            }
            copyStepValue[item?.id] = stepValuePresent;
        } else {
            copyStepValue[item.id] = {
                downVotes: 1,
                upVotes: 0,
                valueId: item.id,
                valueName: item.name,
                stepId: selectedStep.id
            }
        }
        setSelectedStepVotes(copyStepValue);

    }

    const searchInputHandler = (e) => {
        e.preventDefault();
        const { value } = e.target;
        setSearch(value);
        if (value) {
            setSearchedValues(values.filter(e => e.title?.includes(value)))
        } else {
            setSearchedValues([...values])
        }
    }

    const handleSave = () => {
        onSaveClick(selectedStepVotes);
        closeModal();
    }

    return (
        <>

            <div id="success-modal"
                className=" overflow-y-auto overflow-x-hidden md:inset-0 "
                style={{ zIndex: 1, display: 'flex', justifyContent: 'center' }}
            >
                <div className="relative p-4 w-full max-w-xl md:h-auto">

                    <div className="relative bg-white rounded-lg shadow ">

                        <div className="flex justify-between items-center p-5 pb-0 rounded-t" style={{ display: 'block' }}>
                            <h3 className="text-xl font-medium text-gray-900 text-center">

                            </h3>
                            <div className='flex justify-between'>
                                {/* <div onClick={()=>{setVotingStepModal(false),setVotedModal(true)}}>
                                    <i
                                        
                                        className="fa-solid text-kelvinDark mr-6 fa-chevron-left text-3xl"></i>
                                </div> */}
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
                                <h1 className="text-3xl font-medium">Voting for Step - <span className="text-kelvinDark">{stepName}</span></h1>
                            </div>
                            <div className="px-10 my-4">

                                <form >
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
                                        <input
                                            type="search"
                                            id="default-search"
                                            onChange={e => { searchInputHandler(e) }}
                                            className="block p-4 pl-10 w-full text-sm text-gray-900 bg-kelvinLight rounded-lg border-2 border-gray-300 focus:ring-kelvinMedium focus:border-kelvinMedium dark:bg-kelvinLight dark:border-gray-300 dark:placeholder-gray-400 dark:text-white dark:focus:ring-kelvinMedium dark:focus:border-kelvinMedium"
                                            placeholder={`Search ${values.length} values`}
                                            required
                                            value={search}
                                        />
                                        {/* <button type="submit"  style={{marginRight:'40px'}}
                                           
                                           className="text-white absolute right-2.5 bottom-2.5 bg-kelvinMedium hover:bg-kelvinDark focus:ring-4 focus:outline-none focus:ring-kelvinMedium font-medium rounded-lg text-sm px-4 py-2 dark:bg-kelvinMedium dark:hover:bg-kelvinDark dark:focus:ring-blue-800">Search</button> */}
                                    </div>
                                </form>

                            </div>
                            {/* <!-- cards --> */}
                            <div className="flex flex-col px-10">
                                {/* <!-- card --> */}
                                {/* <div className="flex shadow shadow-md rounded-md py-4 px-6 my-2 items-center justify-between">
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
                                </div> */}
                                {/* <!-- card --> */}
                                {searchedValues.map(item =>
                                    <div key={item.id} className="flex shadow shadow-md rounded-md py-4 px-6 my-2 items-center justify-between">
                                        <div className="flex">
                                            <div className="flex flex-col justify-start items-start mr-2">
                                                <i className="fa-solid text-kelvinDark mr-2 fa-circle text-xl"></i>
                                            </div>
                                            <div className="mr-8">
                                                <h6 className="leading-none mb-2 ">{item.title}</h6>
                                                <p className="text-gray-400">{item.description}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <div className="flex">
                                                <p className="text-kelvinDark bg-kelvinLight px-3 py-2  font-bold rounded">{item.votes - ((selectedStepVotes?.[item.id]?.upVotes ?? 0) + (selectedStepVotes?.[item.id]?.downVotes ?? 0))}</p>
                                            </div>
                                            <div className="flex my-4">
                                                <button onClick={() => { handleUpVoteHandler(item) }}
                                                    className="focus:outline-none text-white bg-kelvinDark hover:bg-kelvinBold focus:ring-4 focus:ring-kelvinDark font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-kelvinDark dark:hover:bg-kelvinBold dark:focus:ring-kelvinDark"><i
                                                        className="fa-solid text-white fa-thumbs-up"></i></button>
                                                <label htmlFor="" className="p-2 mx-2 font-medium text-lg">{selectedStepVotes?.[item.id]?.upVotes ?? ''}</label>
                                                <button onClick={() => { handleDownVoteHandler(item) }}
                                                    className="focus:outline-none text-white bg-kelvinDark hover:bg-kelvinBold focus:ring-4 focus:ring-kelvinDark font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-kelvinDark dark:hover:bg-kelvinBold dark:focus:ring-kelvinDark"><i
                                                        className="fa-solid text-white fa-thumbs-down"></i></button>
                                                <label htmlFor="" className="p-2 mx-2 font-medium text-lg">{selectedStepVotes?.[item.id]?.downVotes ?? ''}</label>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* <!-- card --> */}
                                {/* <div className="flex shadow shadow-md rounded-md py-4 px-6 my-2 items-center justify-between">
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
                                </div> */}
                                {/* <!-- card --> */}
                                {/* <div className="flex shadow shadow-md rounded-md py-4 px-6 my-2 items-center justify-between">
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
                                </div> */}
                                {/* <!-- card --> */}
                                {/* <div className="flex shadow shadow-md rounded-md py-4 px-6 my-2 items-center justify-between">
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
                                </div> */}
                            </div>
                            <div className="flex px-10 mt-4">
                                <button type="button"
                                    onClick={handleSave}
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