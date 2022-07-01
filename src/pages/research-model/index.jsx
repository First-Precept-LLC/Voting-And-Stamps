import React from 'react';
import { useState } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import CreateProcessList from '../../components/process-templates/create-process-list';
import CreatedTemplateSuccess from '../../components/process-templates/created-template-success';
import { gql, useMutation, useQuery, NetworkStatus } from '@apollo/client'
import VotingDetails from '../../components/process-templates/voting-details';
import VotingSteps from '../../components/process-templates/voting-steps';

import { useRouter } from "next/router";
import { template } from 'lodash';
import { ObjectNodeDependencies } from 'mathjs';
const ViewProcess=(props)=>{
    const [stepLists,setStepLists] =useState([]) ;     
const [votedModal, setVotedModal] = useState(false)
const [votingStepModal, setVotingStepModal] = useState(false)
const [processListSelectedData, setProcessListSelectedData] = useState({});
// const [onTrackModal, setOnTrackModal] = useState(false)
const [templateList,setTemplateList]=useState([]);
const [templateData,setTemplateData]=useState({description: "aaaaaaaaaaaaaaaaaaaa",
estimatedDuration: "4days ,45hrs ,22mins ",
name: "prooooooooo",
parentProject: "62bb02c2711c0edd023f109b",
userId: "1",
__typename: "ProcessTemplate",
_id: "62bd56f3a29c3446d228b4c2"});
const [check,setCheck]=useState(false);

const [processListData, setProcessListData] = useState([
    { process: 'Research of Model v1', processTemplate: 'Start research development', dueBy: 'Aug 22, 2022', assignees: 'Matt', votes: '24', id: '1', percent: '70%', deletePopup: false },
    { process: 'Submission of Model v2', processTemplate: 'Submitting Designs', dueBy: 'Aug 28, 2022', assignees: 'Saidutt', votes: '2', id: '2', percent: '33%', deletePopup: false }

]);
const [stepData,setStepData]=useState([{
    description: "ejgr ughr rhgjrh jehgr",
    estimatedDuration: "3days ,6hrs ,8mins ",
    name: "step3",
    parentProcessTemplate: "62bebae0f231e687ac77a1d7",
    __typename: "Step",
    _id: "62bebae0f231e687ac77a1dd"}]);
    const [stepDescription,setStepDescription]=useState('');
    const [stepDuration,setStepDuration]=useState('');
const router = useRouter();
const templateId = router.query.templateId;
console.log(templateId);

const GET_PROCESS_TEMPLATES = gql`
query processTemplates($nameFilter: String!) {
    processTemplates(input: {filter:{name:{_neq:$nameFilter}}}) {
      results {_id,name,
        parentProject,userId,
        estimatedDuration,description}
    }
}`;
const { data1, error1, loading1 } = useQuery(GET_PROCESS_TEMPLATES, {
    notifyOnNetworkStatusChange: true,
    variables: { nameFilter: templateId },
    onCompleted: (dataValue) => {
        console.log(dataValue.processTemplates.results.find(e=>e._id===templateId));
        
        setTemplateData(dataValue.processTemplates.results.find(e=>e._id===templateId));
      
        
    }
});

 
  console.log(templateData);
 
  const GET_STEPS = gql`
  query steps($nameFilter: String!) {
    steps(input: {filter:{name:{_neq:$nameFilter}}}) {
        results {_id,name,
            parentProcessTemplate,
            estimatedDuration,
            description
            

        }
      }
  }`;
  const { data2, error2, loading2 } = useQuery(GET_STEPS, {
      notifyOnNetworkStatusChange: true,
      variables: { nameFilter: templateId },
      onCompleted: (dataValue) => {
        
        console.log(dataValue.steps.results.filter(e=>e.parentProcessTemplate===templateId));
        
       setStepData(dataValue.steps.results.filter(e=>e.parentProcessTemplate===templateId).map((e)=>({...e,isSelected:false})))
        
      // setStepData(stepData)
          
          
        
        
          
      }
  });
   
 console.log(stepData);
  
 
         
     const deletePopupHandler=(id)=>{
        
        let arr=[...processListData];
        arr.forEach(element => {
            if(element.id==id){
                if(element.deletePopup==true){
                    element.deletePopup=false;
                }else{
                    element.deletePopup=true;
                }
             }
            else{
                element.deletePopup=false;
              }
            
          });
          setProcessListData(arr);

     }
     
     const deleteHandler=(id)=>{
        let arr=[...processListData];
        let index = arr.findIndex(object => {
                return object.id == id;
              });
              console.log(index);
              arr.splice(index,1);
              setProcessListData([...arr]);
     }
     
     const showVotedModal = () => {
        // setOnTrackModal(false)
        setVotedModal(true)
        setVotingStepModal(false)
        // setCreateDetails(false);
        // setProcessModal(false);
        // setModal(false)
    }
    const showVotingStepModal=()=>{
        // setOnTrackModal(false)
        setVotedModal(false)
        setVotingStepModal(true)
        // setCreateDetails(false);
        // setProcessModal(false);
        // setModal(false)
    }

    const closeVotingModal = () => {
        setVotedModal(false)
        // setOnTrackModal(true)

    }
    const closeVotingStepModal = () => {
        setVotingStepModal(false)
        setVotedModal(false)
        // setOnTrackModal(true)

    }
    const ontrackModal = (id) => {
        // setOnTrackModal(true)
        setVotedModal(false)
        setVotingStepModal(false)
        // setCreateDetails(false);
        // setProcessModal(false);
        // setModal(false)
        setProcessListSelectedData(processListData.find(e => (e.id === id)))

    }

    const selectHandler=(item)=>{
        setStepDescription(item.description);
        setStepDuration(item.estimatedDuration)
        console.log(stepDescription,stepDuration)
    }
    const checkHandler=(item)=>{
      let arr=[...stepData];
    //   arr.forEach(e=>{
    //     // if(e._id==item._id){
    //     //     if(e.isSelected==true){
    //     //         e.isSelected=false
    //     //     }
    //     //     else{
    //     //         if(e.isSelected==false){
    //     //             e.isSelected=true
    //     //         }
                
    //     //     }
    //     // }
       
    //   })
        
    }
    console.log(stepData)
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
        {!votedModal && !votingStepModal?
            <div className="flex w-full p-8 flex-col">
            <div className="flex justify-between">
                <h1 className="text-3xl mb-8">{processListSelectedData.process}</h1>
            </div>


            <div className="flex flex-col">

                <div className="flex flex-col mb-4">
                    <div className="flex mb-4">
                        <p className="text-kelvinDark p-2 px-4 border-2 mr-4 text-sm border-gray-300 rounded">Due by {templateData.estimatedDuration}
                            
                        </p>
                        <div className="text-kelvinDark p-2 px-4 border-2 text-sm border-gray-300 rounded">Assignee <span
                                className="text-white bg-kelvinDark p-1 px-2 ml-2 rounded text-sm">{processListSelectedData.assignees}</span>
                        </div>
                    </div>
                    <p className="text-kelvinBlack text-sm">{templateData.description}</p>
                </div>
            </div>
            <div className="flex flex-col">
                <h6 className="text-kelvinDark">Steps</h6>
                <div className="flex grid grid-cols-2 gap-4">
                    <div className="flex  bg-kelvinLight p-4">
                        <div className="flex flex-col w-full">
                            {stepData.map(item=>{
                                return(
                                    <div onClick={()=>{selectHandler(item)}}
                                    className="flex items-center w-full min-h-8 justify-start pl-4 py-1 bg-white shadow shadow-md rounded-md mb-2 flex-wrap border-2 border-gray-300">
                                    <input id="link-checkbox" type="checkbox" value="" checked={item.isSelected} onClick={()=>{checkHandler(item)}}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 mr-2"/>
    
                                    <h6 className="">{item.name}</h6>
                                </div>
                                )
                            })}
                           
                            {/* <div
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
                            </div> */}
                        </div>
                    </div>
                    <div className="flex flex-col bg-kelvinLight p-8">
                        <h5 className="text-lg mb-4">Start Research</h5>
                        <div className="flex mb-4 flex-wrap">
                            <p className="text-kelvinDark p-2 px-4 border-2 mr-4 text-sm border-gray-200 rounded">Due by {stepDuration}
                                
                            </p>
                            <div className="text-kelvinDark p-2 px-4 border-2 text-sm border-gray-200 rounded mr-2">Assignee
                                <span className="text-white bg-kelvinDark p-1 px-2 ml-2 rounded text-sm">{processListSelectedData.assignees}</span>
                            </div>
                            <button onClick={showVotedModal} className="flex text-white bg-kelvinDark items-center px-2 rounded text-sm">
                                {/* <!-- navigate to voting widget --> */}
                                <i className="fa-solid fa-check-to-slot mr-1 text-white"></i>Votes ({processListSelectedData.votes})
                            </button>
                        </div>
                        <p className="text-black/75 text-sm">{stepDescription}</p>

                    </div>
                </div>
            </div>
        </div>
             : null
            }

            {votedModal ? <VotingDetails closeModal={closeVotingModal}  votingStepModal={showVotingStepModal} /> : null}
            {votingStepModal ?<VotingSteps closeModal={closeVotingStepModal}  /> :null}
        </MainLayout>
        </>
    )
}
export default ViewProcess;