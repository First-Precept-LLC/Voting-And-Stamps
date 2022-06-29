import Link from 'next/link';
import React from 'react';
import { useState } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import ViewProcess from '../../components/process-templates/view-process';
import VotingDetails from '../../components/process-templates/voting-details';
import VotingSteps from '../../components/process-templates/voting-steps';
import { gql, useMutation, useQuery, NetworkStatus } from '@apollo/client'
import { getUserId } from '../../services/user.service';

const ProcessListGroup = (props) => {


    const [votedModal, setVotedModal] = useState(false)
    const [votingStepModal, setVotingStepModal] = useState(false)
    const [processListSelectedData, setProcessListSelectedData] = useState({});
    const [onTrackModal, setOnTrackModal] = useState(false)

    const [processListData, setProcessListData] = useState([
        { process: 'Research of Model v1', processTemplate: 'Start research development', dueBy: 'Aug 22, 2022', assignees: 'Matt', votes: '24', id: '1', percent: '70%', deletePopup: false },
        { process: 'Submission of Model v2', processTemplate: 'Submitting Designs', dueBy: 'Aug 28, 2022', assignees: 'Saidutt', votes: '2', id: '2', percent: '33%', deletePopup: false }

    ]);


    const deletePopupHandler = (id) => {

        let arr = [...processListData];
        arr.forEach(element => {
            if (element.id == id) {
                if (element.deletePopup == true) {
                    element.deletePopup = false;
                } else {
                    element.deletePopup = true;
                }
            }
            else {
                element.deletePopup = false;
            }

        });
        setProcessListData(arr);

    }

    const deleteHandler = (id) => {
        let arr = [...processListData];
        let index = arr.findIndex(object => {
            return object.id == id;
        });
        console.log(index);
        arr.splice(index, 1);
        setProcessListData([...arr]);
    }

    const showVotedModal = () => {
        setOnTrackModal(false)
        setVotedModal(true)
        setVotingStepModal(false)
        // setCreateDetails(false);
        // setProcessModal(false);
        // setModal(false)
    }
    const showVotingStepModal = () => {
        setOnTrackModal(false)
        setVotedModal(false)
        setVotingStepModal(true)
        // setCreateDetails(false);
        // setProcessModal(false);
        // setModal(false)
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
    const ontrackModal = (id) => {
        setOnTrackModal(true)
        setVotedModal(false)
        setVotingStepModal(false)
        // setCreateDetails(false);
        // setProcessModal(false);
        // setModal(false)
        setProcessListSelectedData(processListData.find(e => (e.id === id)))

    }

    const GET_PROCESS = gql`
        query processes($nameFilter: String!) {
            processes(input: {filter:{userId:{_neq:$nameFilter}}}) {
              results {_id,name,dueDate,parentProcessTemplate}
            }
        }
      `;
        const { data2, error3, loading3 } = useQuery(GET_PROCESS, {
            notifyOnNetworkStatusChange: true,
            variables: { nameFilter: "''"},
            onCompleted: (dataValue) => {
                console.log(dataValue.processes.results);
                setProcessListData(dataValue.processes.results);
                
            }
        });

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
                {!onTrackModal && !votedModal && !votingStepModal ?
                    <div className="flex w-full p-8 flex-col">
                        <div className="flex justify-between">
                            <h1 className="text-3xl mb-8">Process List</h1>
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


                            <div className="flex bg-kelvinLight p-4 rounded-md w-full flex-wrap ">
                                {processListData.map(item => {
                                    return (
                                        <>
                                            <div key={item.id}
                                                className="flex items-center w-full min-h-8 justify-between pl-4 py-1 bg-white shadow shadow-md rounded-md mb-2 ">
                                                <h6 className="mr-2 items-center"> {item.process || item.name}</h6>
                                                <h6 className="mr-2 text-black/50 items-center">{item.parentProcessTemplate}</h6>
                                                <p className="text-sm opacity-50 mr-2 font-normal items-center">{item.dueDate}</p>
                                                <p className="text-sm opacity-50 mr-2 font-normal items-center">{item.assignees}</p>
                                                <div className="flex flex-col">
                                                    <div className="mb-1 text-xs text-black/50 items-center" style={{ textAlign: 'center' }}>{item.percent}</div>
                                                    <div className="w-32 bg-gray-400 rounded-full h-1.5 items-center">
                                                        <div className=" h-1.5 rounded-full " style={{ width: `${item.percent}`, background: "#6cef6c" }}></div>
                                                    </div>
                                                </div>
                                                <div className="flex">
                                                    <Link   href={{
                                                                            pathname: "/research-model",
                                                                            // dueDate: `${item.dueDate}`, // the data
                                                                        }}>
                                                        <button
                                                            //onClick={()=>{ontrackModal(item.id)}}

                                                            className=" bg-kelvinMedium hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-md text-sm px-2  h-6 text-left mr-2 w-24 text-center "
                                                            data-modal-toggle="large-modal">
                                                            On Track</button>
                                                    </Link>

                                                    <p style={{ lineHeight: '10px', textAlign: 'center' }}><span style={{ fontSize: '20px' }} >{item.votes}</span><br /><span style={{ fontSize: '10px' }}>Votes</span></p>
                                                    <a href="#" className=" px-4 hover:bg-kelvinLight rounded-full" onClick={() => { deletePopupHandler(item.id) }}>
                                                        <i className="fa-solid fa-ellipsis-vertical text-xl"></i>
                                                    </a>
                                                    {item.deletePopup ? <button onClick={() => { deleteHandler(item.id) }}>delete</button> : null}
                                                </div>
                                            </div>
                                        </>
                                    )
                                })}

                            </div>
                        </div>

                    </div>
                    : null
                }

                {onTrackModal ? <ViewProcess votedModal={showVotedModal} processListSelectedData={processListSelectedData} /> : null}
                {votedModal ? <VotingDetails closeModal={closeVotingModal} votingStepModal={showVotingStepModal} /> : null}
                {votingStepModal ? <VotingSteps closeModal={closeVotingStepModal} /> : null}
            </MainLayout>
        </>
    )
}
export default ProcessListGroup;