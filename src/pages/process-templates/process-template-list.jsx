import React from 'react';
import { useState } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import CreateProcessList from '../../components/process-templates/create-process-list';
import CreatedTemplateSuccess from '../../components/process-templates/created-template-success';
import ProcessListGroup from '../../components/process-templates/process-list-group';
import ViewProcess from '../../components/process-templates/view-process';
import VotingDetails from '../../components/process-templates/voting-details';
import VotingSteps from '../../components/process-templates/voting-steps';

const ProcessList = (props) => {
    const [createDetails, setCreateDetails] = useState(false)
    const [processModal, setProcessModal] = useState(false)
    const [modal, setModal] = useState(false)
    const [onTrackModal, setOnTrackModal] = useState(false)
    const [votedModal, setVotedModal] = useState(false)
    const [votingStepModal, setVotingStepModal] = useState(false)

    const CreatePage = () => {
        setProcessList(false);
        setCreateDetails(false);
        setProcessModal(false);
        setModal(false);
        setOnTrackModal(false)
        setVotedModal(false)
        setVotingStepModal(false)

        console.log({
            project: project,
            name: proName,
            duration: estDuration,
            description: desc,
            step: step,
            title: stepTitle,
            textDescription: text

        })
    }
 
    const createList = () => {
        setProcessModal(false);
        setOnTrackModal(false)
        setVotedModal(false)
        setVotingStepModal(false)
        setModal(false)
    }
    const processCreated = () => {
        setProcessModal(true);
        setOnTrackModal(false)
        setCreateDetails(false);
        setProcessList(false);
        setVotedModal(false)
        setVotingStepModal(false)
        setModal(false)
        console.log()
    }
    const createdModal = () => {
        setProcessModal(false);
        setOnTrackModal(false)
        setVotedModal(false)
        setVotingStepModal(false)
        setCreateDetails(false);
        setProcessList(false);
        setModal(true)
    }
    const ontrackModal = () => {
        setProcessModal(false);
        setOnTrackModal(true)
        setVotedModal(false)
        setVotingStepModal(false)
        setCreateDetails(false);
        setProcessList(false);
        setModal(false)
    }
    const showVotedModal = () => {
        setProcessModal(false);
        setOnTrackModal(false)
        setVotedModal(true)
        setVotingStepModal(false)
        setCreateDetails(false);
        setProcessList(false);
        setModal(false)
    }
    const showVotingStepModal=()=>{
        setProcessModal(false);
        setOnTrackModal(false)
        setVotedModal(false)
        setVotingStepModal(true)
        setCreateDetails(false);
        setProcessList(false);
        setModal(false)
    }

    const closeModal = () => {
        setCreateDetails(false)
    }
    const closeVotingModal = () => {
        setVotedModal(false)
        setOnTrackModal(true)

    }
    const closeVotingStepModal = () => {
        setVotingStepModal(false)
        setVotedModal(false)
        setOnTrackModal(true)

    }


    return (
        <>
         <head>
                <meta charSet="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Project Kelvin Widget</title>
                <script src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio,line-clamp"></script>
                <link rel="stylesheet" href="https://unpkg.com/flowbite@1.4.4/dist/flowbite.min.css" />
                <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/js/all.min.js"
                    integrity="sha512-6PM0qYu5KExuNcKt5bURAoT6KCThUmHRewN3zUFNaoI6Di7XJPTMoT6K0nsagZKk2OB4L7E3q1uQKHNHd4stIQ=="
                    crossOrigin="anonymous" referrerPolicy="no-referrer"></script>
                <link
                    href="https://fonts.googleapis.com/css?family=Poppins:100,100italic,200,200italic,300,300italic,regular,italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic"
                    rel="stylesheet" />
                <link rel="stylesheet" href="./assets/css/style.css" />
                <script src="/tailwind.js"></script>
            </head>
        <MainLayout>
        {!createDetails && !processModal && !modal && !onTrackModal && !votedModal && !votingStepModal?

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
                            <p className="text-sm opacity-50 mr-2 font-normal w-32" style={{ marginRight: '37%' }}>R&D</p>
                            <div className="flex items-center">
                                <button onClick={createList}
                                    className="text-white bg-kelvinMedium hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-md text-sm px-5 py- h-6 text-left w-44 text-center items-center mr-2"
                                    data-modal-toggle="large-modal">
                                    <i className="fa-solid fa-play text-white mt-1 mr-1 text-xs"></i>
                                    Create Processes</button>
                                <button onClick={createList}
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
                            <p className="text-sm opacity-50 mr-2 font-normal w-32" style={{ marginRight: '37%' }}>R&D</p>
                            <div className="flex items-center">
                                <button onClick={createList}
                                    className="text-white bg-kelvinMedium hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-md text-sm px-5 py- h-6 text-left w-44 text-center items-center mr-2"
                                    data-modal-toggle="large-modal">
                                    <i className="fa-solid fa-play text-white mt-1 mr-1 text-xs"></i>
                                    Create Processes
                                </button>
                                <button onClick={createList}
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

            : null
                }


            {createDetails ? <CreateProcessList closeModal={closeModal} processCreated={processCreated} /> : null}
                {processModal ? <CreatedTemplateSuccess createdModal={createdModal} /> : null}
                {modal ? <ProcessListGroup ontrackModal={ontrackModal} /> : null}
                {onTrackModal ? <ViewProcess votedModal={showVotedModal} /> : null}
                {votedModal ? <VotingDetails closeModal={closeVotingModal}  votingStepModal={showVotingStepModal} /> : null}
                {votingStepModal ?<VotingSteps closeModal={closeVotingStepModal}  /> :null}
            </MainLayout>
        </>
    )
}
export default ProcessList;