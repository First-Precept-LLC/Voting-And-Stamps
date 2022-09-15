import React, { useState, useEffect } from 'react';
import VotingSteps from './voting-steps';


const ViewProcess = (props) => {

    const [votingStepModal, setVotingStepModal] = useState(false)
    const [selectedStep, setSelectedStep] = useState({});

    const [templateData, setTemplateData] = useState(props.processItem);


    const [selectedValue, setSelectedValue] = useState({})



    useEffect(() => {
        if (props.processItem) {
            setTemplateData(props.processItem);
            if (selectedStep && selectedStep.id) {
                const selectSelectedStep = props.processItem?.steps?.find(step => step.id === selectedStep.id);
                setSelectedStep(selectSelectedStep);
            } else {
                const copySelectedStep = props.processItem?.steps?.[0] ?? {};
                setSelectedStep(copySelectedStep);
            }
        }
    }, [props.processItem]);

    useEffect(() => {
        if (props.isStepVoteUpdated && selectedStep && Object.keys(selectedStep).length) {
            const selectSelectedStep = props.processItem?.steps?.find(step => step.id === selectedStep.id);
            setSelectedStep(selectSelectedStep);
            props?.resetProcessRequestStatus?.();
        }
    }, [props.isStepVoteUpdated]);

    const closeVotingStepModal = () => {
        setVotingStepModal(false)
    }

    const handleSelectStep = (item) => {
        setSelectedStep(item);
    }

    const handleCheckBox = (event, currentItem) => {
        const { checked } = event.target;
        const requestData = {
            processId: templateData?.id,
            stepId: currentItem?.id,
            eventType: 'isComplete',
            isCompleted: checked
        }
        props.updateProcessStepVotes?.(requestData);
    }

    const handleSaveClick = (stepVotes) => {
        console.log(stepVotes, 'stepVotes');
        const requestData = {
            stepVotes,
            processId: templateData?.id,
            stepId: selectedStep?.id,
            eventType: 'votes'
        }
        props.updateProcessStepVotes?.(requestData);
    }

    const getStepVotesCount = (stepVotes) => {
        let totalVotes = 0
        if (stepVotes && Object.keys(stepVotes).length) {
            Object.keys(stepVotes).forEach((key) => {
                const currentVote = stepVotes[key] ?? {};
                totalVotes += (Number(currentVote.downVotes ?? 0) + Number(currentVote.upVotes ?? 0));
            })
        }
        return totalVotes;
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
            <>
                <p onClick={props.onCloseModal}>Back</p>
                {!votingStepModal &&
                    <div className="flex w-full p-8 flex-col">
                        <div className="flex justify-between">
                            <h1 className="text-3xl mb-8">{templateData?.name}</h1>
                        </div>


                        <div className="flex flex-col">

                            <div className="flex flex-col mb-4">
                                <div className="flex mb-4">
                                    <p className="text-kelvinDark p-2 px-4 border-2 mr-4 text-sm border-gray-300 rounded">Due by {templateData?.dueDate}

                                    </p>
                                    <div className="text-kelvinDark p-2 px-4 border-2 text-sm border-gray-300 rounded">Assignee <span
                                        className="text-white bg-kelvinDark p-1 px-2 ml-2 rounded text-sm">{templateData?.user?.name}</span>
                                    </div>
                                </div>
                                <p className="text-kelvinBlack text-sm">{templateData?.processTemplateDescription}</p>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <h6 className="text-kelvinDark">Steps</h6>
                            <div className="flex grid grid-cols-2 gap-4">
                                <div className="flex  bg-kelvinLight p-4">
                                    <div className="flex flex-col w-full">
                                        {templateData?.steps?.map(item => {
                                            return (
                                                <div key={item.id} onClick={() => { handleSelectStep(item) }}
                                                    className="flex items-center w-full min-h-8 justify-start pl-4 py-1 bg-white shadow shadow-md rounded-md mb-2 flex-wrap border-2 border-gray-300">
                                                    <input id="link-checkbox" type="checkbox" value="" checked={item.isCompleted} onClick={(event) => handleCheckBox(event, item)}
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 mr-2" />

                                                    <h6 className="">{item.name}</h6>
                                                </div>
                                            )
                                        })}

                                    </div>
                                </div>
                                <div className="flex flex-col bg-kelvinLight p-8">
                                    <h5 className="text-lg mb-4">{selectedStep?.name}</h5>
                                    <div className="flex mb-4 flex-wrap">
                                        <p className="text-kelvinDark p-2 px-4 border-2 mr-4 text-sm border-gray-200 rounded">Due by {templateData?.dueDate}

                                        </p>
                                        <div className="text-kelvinDark p-2 px-4 border-2 text-sm border-gray-200 rounded mr-2">Assignee
                                            <span className="text-white bg-kelvinDark p-1 px-2 ml-2 rounded text-sm">{templateData?.user?.name}</span>
                                        </div>
                                        <button disabled={selectedStep.isCompleted} onClick={() => { if (selectedStep?.name) { setVotingStepModal(true) } }} className="flex text-white bg-kelvinDark items-center px-2 rounded text-sm">
                                            {/* <!-- navigate to voting widget --> */}
                                            <i className="fa-solid fa-check-to-slot mr-1 text-white"></i>Votes ({getStepVotesCount(selectedStep.votes)})
                                        </button>
                                    </div>
                                    <p className="text-black/75 text-sm">{selectedStep?.description}</p>

                                </div>
                            </div>
                        </div>
                    </div>
                }

                {votingStepModal &&
                    <VotingSteps
                        closeModal={closeVotingStepModal}
                        stepName={selectedStep?.name}
                        selectedStep={selectedStep}
                        values={props.organizationValues}
                        selectedValue={selectedValue}
                        setSelectedValue={setSelectedValue}
                        setVotingStepModal={setVotingStepModal}
                        onSaveClick={handleSaveClick}
                    />
                }
            </>
        </>
    )
}
export default ViewProcess;