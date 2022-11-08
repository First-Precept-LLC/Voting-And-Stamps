
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import MainLayout from '../../components/layout/MainLayout';
import { processActions } from "../../store/actions/processActions";
import { valuesActions } from "../../store/actions/valuesActions";
import ViewProcessList from "../../components/process-templates/view-process-content";

const ProcessListGroup = (props) => {
    const [selectedId, setSelectedId] = useState("");
    const [selectedProcess, setSelectedProcess] = useState(null);
    const [search, setSearch] = useState('');
    const [searchedProcess, setSearchedProcess] = useState([]);

    const dispatch = useDispatch();

    const {
        process: processList,
        updateStepVotesSuccess
    } = useSelector(state => state.process);

    const {
        values: organizationValues
    } = useSelector(state => state.values);


    useEffect(() => {
        dispatch(processActions.getProcessRequest());
        dispatch(valuesActions.getValuesRequest());
    }, []);

    useEffect(() => {
        if (updateStepVotesSuccess && selectedProcess) {
            const currentProcess = processList.find((process) => process.id === selectedProcess.id);
            if (currentProcess) {
                setSelectedProcess(currentProcess);
            }
        }
    }, [updateStepVotesSuccess]);

    useEffect(() => {
        let copyProcess = [...processList];
        if (search?.trim()) {
            copyProcess = copyProcess.filter((process) => process.name?.toLowerCase().includes(search.toLowerCase()) ||
            process.processTemplateName?.toLowerCase().includes(search.toLowerCase()) || 
            process?.user?.name.toLowerCase().includes(search.toLowerCase()) ||
            process.dueDate?.toLowerCase().includes(search.toLowerCase()) 
            || process?.department?.title?.toLowerCase()?.includes(search))
        }
        setSearchedProcess(copyProcess);
    }, [search, processList]);

    const deleteHandler = (id) => {
        dispatch(processActions.deleteProcessRequest(id))
    }


    const updateProcessStepVotes = (data) => {
        dispatch(processActions.updateStepVotesRequest(data));
    }

    const getProcessStepVotesCount = (currentSteps) => {
        let count = 0;
        currentSteps?.forEach(step => {
            if (step.votes && Object.keys(step.votes).length) {
                Object.keys(step.votes).forEach((key) => {
                    const currentVote = step.votes[key] ?? {};
                    count += (Number(currentVote.downVotes ?? 0) + Number(currentVote.upVotes ?? 0));
                })
            }
        });
        return count;
    }

    const getProcessStepProgress = (currentSteps) => {
        let progress = 0;
        const totalStepsCount = currentSteps?.length;
        const totalCompletedStepsCount = currentSteps?.filter(step => step.isCompleted).length;
        if (totalCompletedStepsCount) {
            console.log(totalStepsCount / totalStepsCount - totalCompletedStepsCount, totalStepsCount, totalCompletedStepsCount)
            const remainingStepsCount = totalStepsCount - totalCompletedStepsCount;
            progress = remainingStepsCount > 0 ? 100 - ((remainingStepsCount / totalStepsCount) * 100) : 100
        }
        return progress.toFixed(0);

    }

    const getProcessStatus = (currentSteps, dueDate) => {
        const completedSteps = currentSteps?.filter(step => step.isCompleted);
        const isDueDateOver = dayjs(dueDate).isBefore(dayjs());
        if (completedSteps?.length === currentSteps?.length) {
            return "Completed";
        }
        if (isDueDateOver && completedSteps?.length !== currentSteps?.length) {
            return "Over Due";
        }
        return "On Track";
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
                {!selectedProcess ?
                    <div className="flex w-full p-8 flex-col">
                        <div className="flex justify-between">
                            <h1 className="text-3xl mb-8">Process List</h1>
                            <div className="flex">
                                <input type="text" id="search-process-template"
                                    className="block p-2 px-5  h-8  w-44 text-gray-900 bg-white rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 mr-2"
                                    placeholder="Search..." onChange={(event) => setSearch(event.target.value)} />
                                {/* <button
                                    className="text-grey-300 border border-gray-300 hover:bg-gray-300 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-md text-sm px-5  h-8 text-left mb-2 hover:bg-kelvinBold"
                                    id="dropdownDefault" data-dropdown-toggle="dropdown">
                                    <i className="fa-solid fa-sort"></i>
                                    Filters</button> */}
                            </div>
                        </div>
                        {/* <!-- Process section --> */}
                        <div className="flex flex-col mb-8">
                            <div className="flex  py-1 pl-4 w-full items-center justify-between">
                                {/* <h4 className="mb-1 mr-5 text-md">Process
                                </h4>
                                <h4 className="mb-1 mx-5 text-md">Process Template
                                </h4>
                                <h4 className="mb-1 mx-5 text-md">Due by
                                </h4>
                                <h4 className="mb-1 mx-5 text-md">Assignees
                                </h4>
                                <h4 className="mb-1  text-md">Progress
                                </h4> */}
                            </div>


                            <div className="flex bg-kelvinLight p-4 rounded-md w-full flex-wrap ">
                                {searchedProcess?.map((item) => {
                                    const processStatus = getProcessStatus(item.steps, item.dueDate);
                                    const processStatusClass = processStatus === 'On Track' ? 'border-blue-500 text-blue-500' : 
                                    processStatus === 'Completed' ? 'border-green-500 text-green-500' : 'border-red-500 text-red-500';

                                    return (
                                        <>
                                            {/* <Link 
                                         key={item._id}  
                                         href={{
                                                pathname: "/research-model",
                                                query: {templateId:`${item.processTemplateId}`,processName:`${item.name}`,assignees:`${item.userId}`}, // the data
                                            }}
                                        > */}
                                            <div
                                                key={item.id}
                                                className="cursor-pointer flex items-center w-full min-h-8 justify-between pl-4 py-1 bg-white shadow shadow-md rounded-md mb-2 "
                                                onClick={() => setSelectedProcess(item)}
                                            >
                                                <h6 className="mr-2 items-center"> {item.process || item.name}</h6>
                                                <h6 className="mr-2 text-black/50 items-center">{item.processTemplate || item.processTemplateName} Template</h6>
                                                <p className="text-sm opacity-50 mr-2 font-normal items-center">Due by {item.dueDate ? dayjs(item.dueDate).format("MMM DD, YYYY") : ''}</p>
                                                <p className="text-sm opacity-50 mr-2 font-normal items-center">Assigned to {item.assignees || item?.user?.name}</p>
                                                <div className="flex flex-col">
                                                    <div className="mb-1 text-xs text-black/50 items-center" style={{ textAlign: 'center' }}>{getProcessStepProgress(item.steps)}%</div>
                                                    <div className="w-32 bg-gray-400 rounded-full h-1.5 items-center">
                                                        <div className=" h-1.5 rounded-full " style={{ width: `${item.progress}`, background: "#6cef6c" }}></div>
                                                    </div>
                                                </div>
                                                <div className="flex">

                                                    <button
                                                        //onClick={()=>{ontrackModal(item.id)}}
                                                        className={`${processStatusClass} border  hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-md text-sm px-2  h-6 text-left mr-2 w-24 text-center `}
                                                        data-modal-toggle="large-modal">
                                                        {processStatus}
                                                    </button>


                                                    <p style={{ lineHeight: '10px', textAlign: 'center' }}><span style={{ fontSize: '20px' }} >{getProcessStepVotesCount(item.steps)}</span><br /><span style={{ fontSize: '10px' }}>Votes</span></p>
                                                    <span href="#" className=" px-4 hover:bg-kelvinLight rounded-full"
                                                        onClick={(event) => {
                                                            event.stopPropagation();
                                                            setSelectedId(id => id === item.id ? "" : item.id)
                                                        }
                                                        } >
                                                        <i className="fa-solid fa-ellipsis-vertical text-xl"></i>
                                                    </span>
                                                    {item.id === selectedId ? <button className='border border-red-500 text-red-500 px-4  hover:bg-red-500 hover:text-white font-medium rounded-md text-sm px-2  h-6 text-left mr-2 w-24 text-center' onClick={() => { deleteHandler(item.id) }}>delete</button> : null}
                                                </div>
                                            </div>
                                            {/* </Link> */}
                                        </>
                                    )
                                })}

                            </div>
                        </div>

                    </div>
                    :
                    <ViewProcessList
                        processItem={selectedProcess}
                        organizationValues={organizationValues}
                        updateProcessStepVotes={updateProcessStepVotes}
                        isStepVoteUpdated={updateStepVotesSuccess}
                        resetProcessRequestStatus={() => dispatch(processActions.resetStatus())}
                        onCloseModal={() => setSelectedProcess(null)}
                    />

                }
            </MainLayout>
        </>
    )
}
export default ProcessListGroup;