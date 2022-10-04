
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import MainLayout from '../../components/layout/MainLayout';
import { processActions } from "../../store/actions/processActions";
import { valuesActions } from "../../store/actions/valuesActions";
import { departmentsActions } from "../../store/actions/departmentsActions";
import { usersActions } from "../../store/actions/usersActions";
import { processTemplateActions } from "../../store/actions/processTemplateActions";
import CreateProcessList from '../../components/process-templates/create-process-list';
import ViewProcessList from "../../components/process-templates/view-process-content";
import CreatedTemplateSuccess from '../../components/process-templates/created-template-success';

const DepartmentProcessList = (props) => {
    const [selectedId, setSelectedId] = useState("");
    const [selectedProcess, setSelectedProcess] = useState(null);
    const [processItem, setProcessItem] = useState({})
    const [selectedItemId, setSelectedItemId] = useState('');
    const [createDetails, setCreateDetails] = useState(false);
    const [processModal, setProcessModal] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [departmentName, setDepartmentName] = useState("");

    const router = useRouter();

    const dispatch = useDispatch();

    const {
        departmentProcess: processList,
        updateStepVotesSuccess,
        saveProcessRequest,
        isSaveProcessSuccess
    } = useSelector(state => state.process);

    const {
        departmentById,
        isEditDepartmentsSuccess
    } = useSelector(state => state.departments);

    const {
        values: organizationValues
    } = useSelector(state => state.values);

    const {
        departmentProcessTemplates
    } = useSelector(state => state.processTemplate);

    const {
        users
    } = useSelector((state) => state.users);


    useEffect(() => {
        // dispatch(processActions.getProcessRequest());
        dispatch(valuesActions.getValuesRequest());
        dispatch(usersActions.getUsersRequest());
    }, []);

    useEffect(() => {
        if (router.query?.id) {
            dispatch(departmentsActions.getDepartmentByIdRequest(router.query?.id));
            dispatch(processTemplateActions.getProcessTemplateByDepartmentIdRequest(router.query?.id));
            dispatch(processActions.getProcessByDepartmentIdRequest(router.query?.id));
        }
    }, [router.query]);

    useEffect(() => {
        if (updateStepVotesSuccess && selectedProcess) {
            const currentProcess = processList.find((process) => process.id === selectedProcess.id);
            if (currentProcess) {
                setSelectedProcess(currentProcess);
            }
        }
    }, [updateStepVotesSuccess]);

    useEffect(() => {
        if (!saveProcessRequest && isSaveProcessSuccess) {
            nextProcess();
            dispatch(processActions.resetStatus());
        }
    }, [saveProcessRequest, isSaveProcessSuccess]);

    useEffect(() => {
        if (departmentById?.title){
            setDepartmentName(departmentById?.title)
        }
    }, [departmentById]);

    useEffect(() => {
        if (isEditDepartmentsSuccess) {
            dispatch(departmentsActions.getDepartmentByIdRequest(router.query?.id));
            dispatch(departmentsActions.resetStatus());
        }
    }, [isEditDepartmentsSuccess])

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

    const createProcessList = (item) => {
        setProcessItem(item);
        setCreateDetails(true);
        setProcessModal(false);
    }

    const deletePopupHandler = (selectedId) => {
        console.log(selectedId, selectedItemId, 'dd')
        if (selectedId === selectedItemId) {
            setSelectedItemId("");
            return;
        }
        setSelectedItemId(selectedId);
    }

    const deleteProcessTemplateHandler = (itemId) => {
        dispatch(processTemplateActions.deleteProcessTemplateRequest(itemId))
    }

    const handleCeateProcess = (processData) => {
        dispatch(processActions.saveProcessRequest(processData));
    }

    const createdModal = () => {
        setCreateDetails(false);
        setProcessModal(false);

    }

    const nextProcess = () => {
        setCreateDetails(false);
        setProcessModal(true);
    }

    console.log(departmentById, processList, router.query, 'router.query?');

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
                {createDetails || processModal ? null : !selectedProcess ?
                    <div className="flex w-full p-8 flex-col">
                        <div className="flex justify-start items-center mb-8">
                            {!isEditOpen &&
                            <>
                                    <h1 className="text-3xl ">{departmentById?.title}</h1>
                                    <button
                                        className="text-blue-500 hover:text-white ml-2 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-md text-sm  h-6 text-left text-center  "
                                        data-modal-toggle="large-modal"
                                        disabled={isEditOpen}
                                        onClick={() => setIsEditOpen(true)}
                                    >
                                        <i className="fa-solid fa-pen-to-square text-gray-500 hover:text-gray-800  text-lg" />
                                    </button>
                            </> }
                            {isEditOpen  && <>
                                <input 
                                    value={departmentName} 
                                    type="text" 
                                    name="departmentName"  
                                    className='rounded-md border border-gray-300' 
                                    onChange={(event) => setDepartmentName(event.target.value)}
                                />   
                                <button
                                    className="text-blue-500 hover:text-white border border-blue-500 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-md text-sm px-5 py- h-6 text-left w-20 text-center ml-2 "
                                    data-modal-toggle="large-modal"
                                    onClick={() => {
                                        setIsEditOpen(false);
                                        setDepartmentName(departmentById?.title);
                                    }}
                                    >
                                    Cancel</button>
                                    <button
                                        className="text-blue-500 hover:text-white border border-blue-500 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-md text-sm px-5 py- h-6 text-left w-20 text-center ml-2 "
                                        data-modal-toggle="large-modal"
                                        disabled={!departmentName?.trim()?.length}
                                        onClick={() => {
                                            dispatch(departmentsActions.editDepartmentsRequest({
                                                ...departmentById,
                                                title: departmentName
                                            }));
                                            setIsEditOpen(false);
                                        }}
                                    >
                                    Done</button>
                                </>
}
                        </div>

                        {/* <!-- Process Template section --> */}
                        {createDetails || processModal ? null : !!departmentProcessTemplates?.length ? <>
                            <div className="flex flex-col mb-8">
                                <h4 className='text-2xl mb-8 text-kelvinBold'>Proccess Template List</h4>
                                <div className="flex  items-center">
                                    {/* <h4 className="text-kelvinDark mb-1 text-md">Process Template
                                    </h4>
                                    <h4 className="text-kelvinDark mb-1 text-md" style={{ marginLeft: '190px' }}>Department
                                    </h4> */}
                                </div>
                                <div className="flex bg-kelvinLight p-4 rounded-md w-full flex-wrap">
                                    {departmentProcessTemplates?.map((item, index) => {
                                        return (
                                            <div key={index}
                                                className="flex items-center w-full min-h-8 justify-between pl-4 py-1 bg-white shadow shadow-md rounded-md mb-2 ">
                                                <h6 className="mr-2 w-1/2">{item.name}</h6>
                                                <p className="text-sm opacity-50 mr-2 font-normal w-32" style={{ marginRight: '37%' }}>{item.department?.title}</p>
                                                <div className="flex items-center">
                                                    <button onClick={() => { createProcessList(item) }}
                                                        className="text-white bg-kelvinBold hover:bg-kelvinDark focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-md text-sm px-5 py- h-6 text-left w-44 text-center items-center mr-2"
                                                        data-modal-toggle="large-modal">
                                                        <i className="fa-solid fa-play text-white mt-1 mr-1 text-xs"></i>
                                                        Create Process</button>
                                                    <Link
                                                        href={{
                                                            pathname: "/update-process-template",
                                                            query: {
                                                                data: JSON.stringify(item)
                                                            }, // the data
                                                            state: {
                                                                processTemplate: item
                                                            }
                                                        }}>
                                                        <button
                                                            className="text-blue-500 hover:text-white border border-blue-500 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-md text-sm px-5 py- h-6 text-left w-20 text-center  "
                                                            data-modal-toggle="large-modal">
                                                            Edit</button>
                                                    </Link>
                                                    <a href="#" className=" px-4 hover:bg-kelvinLight rounded-full" onClick={() => { deletePopupHandler(item.id) }}>
                                                        <i className="fa-solid fa-ellipsis-vertical mt-1 text-xl"></i>

                                                    </a>
                                                    {item.id === selectedItemId ? <button onClick={() => { deleteProcessTemplateHandler(item.id) }} className=" border border-red-500 text-red-500 px-4  hover:bg-red-500 hover:text-white font-medium rounded-md text-sm px-2  h-6 text-left mr-2 w-24 text-center  ">delete</button> : null}
                                                </div>
                                            </div>
                                        )
                                    })
                                    }

                                </div>
                            </div>
                        </> :
                            <div className='p-8 rounded-md bg-kelvinLight'>No Process Template Found</div>
                        }

                        {/* <!-- Process section --> */}

                        {createDetails || processModal ? null : !!processList?.length ?
                            <>
                                <div className="flex flex-col mb-8">

                                    <h4 className='text-2xl mb-8 text-kelvinBold'>Proccess List</h4>
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
                                        {processList?.map((item) => {
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
                                                        className="flex items-center w-full min-h-8 justify-between pl-4 py-1 bg-white shadow shadow-md rounded-md mb-2 "
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
                                                                className=" border border-blue-500 text-blue-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-md text-sm px-2  h-6 text-left mr-2 w-24 text-center  "
                                                                data-modal-toggle="large-modal">
                                                                {getProcessStatus(item.steps, item.dueDate)}
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
                                                            {item.id === selectedId ? <button className='border border-red-500 text-red-500 px-4  hover:bg-red-500 hover:text-white font-medium rounded-md text-sm px-2  h-6 text-left mr-2 w-24 text-center ' onClick={() => { deleteHandler(item.id) }}>delete</button> : null}
                                                        </div>
                                                    </div>
                                                    {/* </Link> */}
                                                </>
                                            )
                                        })}

                                    </div>
                                </div>
                            </> :
                            <div className='p-8 rounded-md bg-kelvinLight my-8'>No Processes Found</div>
                        }


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
                {createDetails &&
                    <CreateProcessList
                        users={users}
                        processItem={processItem}
                        onCloseModal={() => setCreateDetails(false)}
                        handleCeateProcess={handleCeateProcess}
                    />}
                {processModal && <CreatedTemplateSuccess createdModal={createdModal} />}
            </MainLayout>
        </>
    )
}
export default DepartmentProcessList;