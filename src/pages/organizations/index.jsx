
import { useState } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import CreateOrganization from '../../components/organizations/create-organization'
import SuccessOrganization from '../../components/organizations/success-organization'
import OrganizationDetail from '../../components/organizations/organization-detail'
import CreateValue from '../../components/organizations/create-value'
import CreateSkills from '../../components/organizations/create-skills'
import CreateGoal from '../../components/organizations/create-goal'
import CreateDepartment from '../../components/organizations/create-department'
import { gql, useMutation, useQuery, NetworkStatus } from '@apollo/client'
import { values } from 'lodash';
import CreateProject from "../../components/organizations/create-projects"
import {getUserId} from '../../services/user.service';

function Organization() {
  const [showCreateModal,setShowCreateModal] = useState(false);
  const [showSuccessModal,setShowSuccessModal] = useState(false);
  const [showOrgDetail,setShowOrgDetail] = useState(false);
  const [showValue,setShowValue] = useState(false);
  const [showCreateValue,setShowCreateValue] = useState(false);
  const [showAddGoal,setShowAddGoal] = useState(false)
  const [showAddSkills,setShowAddSkills] = useState(false)
  const [showDepartment,setDepartment] = useState(false)
  const [showProject,setProject]=useState(false);
  const [values,setValue] = useState([])
  const [goal,setGoal] = useState([])
  const [skill,setSkills] = useState([])
  const [departmentValue,setDepartmentValues] = useState([])
  const [projectValues,setProjectValues]=useState([])
 
  const CREATE_ORG = gql`
  mutation createOrg($name: String!, $vision: String!, $userId: String!) {
    createOrg(input: {data: {name: $name, vision: $vision, userId: $userId}}) {
      data {_id}
    }
  }`;
  
  const [orgData, setOrgData] = useState({});
  
  const closeModal=(flag)=>{
    setShowCreateModal(flag);
  }
  const closeSuccessModal=()=>{
    setShowCreateModal(false);
    setShowSuccessModal(false);
    setShowOrgDetail(true);
  }
  
  const GET_ORG = gql`
        query org($nameFilter: String!) {
            org(input: {filter:{userId:{_eq:$nameFilter}}}) {
              result {_id,name,vision}
            }
        }`;
    const { data1, error1, loading1 } = useQuery(GET_ORG, {
          notifyOnNetworkStatusChange: true,
          variables: { nameFilter: getUserId() },
          onCompleted: (dataValue) => {
              console.log(data1,dataValue.org.result,"!!!!!!!!!!!!!!!!!!");
              if(dataValue.org){
                setOrgData(dataValue.org.result)
                closeSuccessModal();
              }
            //  setTemplateList(data.p);
            //  console.log(templateList);
          }
      });

      const GET_VALUES = gql`
        query values($nameFilter: String!) {
            values(input: {filter:{userId:{_eq:$nameFilter}}}) {
              results {_id,title,description,icon}
            }
        }`;
    const { dataValues, error2, loading2 } = useQuery(GET_VALUES, {
          notifyOnNetworkStatusChange: true,
          variables: { nameFilter: getUserId() },
          onCompleted: (dataValue) => {
              console.log(dataValue,dataValues,"!!!!!!!!!!!!!!!!!!");
              if(dataValue.values){
                setValue(dataValue.values.results)
              }
            //  setTemplateList(data.p);
            //  console.log(templateList);
          }
      });


      const GET_PROJS = gql`
      query projs($nameFilter: String!) {
          projs(input: {filter:{userId:{_eq:$nameFilter}}}) {
            results {_id,name,parent}
          }
      }`;
  const { data3, error3, loading3 } = useQuery(GET_PROJS, {
        notifyOnNetworkStatusChange: true,
        variables: { nameFilter: getUserId() },
        onCompleted: (dataValue) => {
            console.log(dataValue,dataValues,"!!!!!!!!!!!!!!!!!!");
            if(dataValue.projs){
              setProjectValues(dataValue.projs.results)
            }
          //  setTemplateList(data.p);
          //  console.log(templateList);
        }
    });

      

      
  let [createExample, {loading, data, error}] = useMutation(
    CREATE_ORG,{
      onCompleted: (data) => {
        console.log(data.createOrg.data._id)
        setOrgData({...orgData,_id:data.createOrg.data._id})
          setShowCreateModal(false);
          setShowSuccessModal(true);
      },
      onError: (error) => console.error("Error creating a post", error),
    }
  );

  const createOrg=(data)=>{
    console.log(data)
    setOrgData(data)
    createExample({variables: {name:data.orgName,vision:data.vision,userId: getUserId()}});
  }
  const showAdd=()=>{
    setShowCreateModal(false);
    setShowSuccessModal(false);
    setShowOrgDetail(false);
    setShowCreateValue(true);
  }
  const closeValueModal=()=>{
    setShowCreateModal(false);
    setShowSuccessModal(false);
    setShowOrgDetail(true);
    setShowCreateValue(false);
    setShowAddGoal(false);
    setShowAddSkills(false);
    setDepartment(false);
    setProject(false)
  }
  const showGoal=()=>{
    setShowCreateModal(false);
    setShowSuccessModal(false);
    setShowOrgDetail(false);
    setShowCreateValue(false);
    setShowAddGoal(true);
  }
  const showSkills=()=>{
    setShowCreateModal(false);
    setShowSuccessModal(false);
    setShowOrgDetail(false);
    setShowCreateValue(false);
    setShowAddGoal(false);
    setShowAddSkills(true);
  }
  const showDep=()=>{
    setShowCreateModal(false);
    setShowSuccessModal(false);
    setShowOrgDetail(false);
    setShowCreateValue(false);
    setShowAddGoal(false);
    setShowAddSkills(false);
    setDepartment(true)
  }
  const showProj=()=>{
    setShowCreateModal(false);
    setShowSuccessModal(false);
    setShowOrgDetail(false);
    setShowCreateValue(false);
    setShowAddGoal(false);
    setShowAddSkills(false);
    setProject(true)
  }
  const addValue = (data)=>{
    setValue([...values,data])
    console.log([...values,data,"hi11111"]);
  }
  const createValue = (data)=>{
    setGoal([...goal,data])
    console.log([...goal,data])
  }
  const skills = (data)=>{
    setSkills([...skill,data])
    console.log([...skill,data]);
  }
  const depValue = (data)=>{
    setDepartmentValues([...departmentValue,data])
    console.log([...departmentValue,data])
  }
  const projValue=(data)=>{
    setProjectValues([...projectValues,data])
    console.log([...projectValues,data,"hi22222222"]);

  }
  return (
    <>
      <head>
        <meta charSet="UTF-8"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Project Kelvin Widget</title>
        <script src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio,line-clamp"></script>
        <link rel="stylesheet" href="https://unpkg.com/flowbite@1.4.4/dist/flowbite.min.css" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/js/all.min.js"
            integrity="sha512-6PM0qYu5KExuNcKt5bURAoT6KCThUmHRewN3zUFNaoI6Di7XJPTMoT6K0nsagZKk2OB4L7E3q1uQKHNHd4stIQ=="
            crossOrigin="anonymous" referrerPolicy="no-referrer"></script>
        <link
            href="https://fonts.googleapis.com/css?family=Poppins:100,100italic,200,200italic,300,300italic,regular,italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic"
            rel="stylesheet" />
        <link rel="stylesheet" href="./assets/css/style.css"/>
        <script src="/tailwind.js"></script>
    </head>
      <MainLayout>
        {(!showCreateModal && !showSuccessModal && !showOrgDetail && !showCreateValue && !showAddGoal && !showAddSkills && !showDepartment && !showProject)?(<div className="flex w-full items-center justify-center">
          <div className="flex flex-col items-center">
            <img src="/img/org-empty.svg" alt="" />
            <h6 className="my-2 font-medium text-kelvinBlack">
              Looks like you’re new here
            </h6>
            <p className="mb-4 w-2/3 text-center text-kelvinBlack">
              Create a new organization to start plan, track your progress with
              your team
            </p>
            <div className="flex">
              <button
                type="button"
                onClick={()=>setShowCreateModal(true)}
                className="text-white bg-gradient-to-r from-kelvinDark  to-kelvinBold hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                >
                Create Organization
              </button>
            </div>
          </div>
        </div>):null}

        {showCreateModal?<CreateOrganization showValue={showValue} createOrg={createOrg} setShowCreateModal={closeModal}/>:null}

        {showSuccessModal?<SuccessOrganization closeModal={closeSuccessModal} orgData={orgData}/>:null}

        {showOrgDetail?<OrganizationDetail values={values} goal={goal} skill={skill} departmentValue={departmentValue} projectValues={projectValues} showAdd={showAdd} showGoal={showGoal} showSkills={showSkills} showDep={showDep} showProj={showProj} orgData={orgData} showValue={showValue}/>:null}
        
        {showCreateValue? <CreateValue addValue={addValue} closeModal={closeValueModal}/>:null}
        
        
        {showAddGoal?<CreateGoal createValue={createValue} closeModal={closeValueModal}/>:null}

        {showAddSkills?<CreateSkills skills={skills} closeModal={closeValueModal}/>:null}

        {showDepartment?<CreateDepartment depValue={depValue} closeModal={closeValueModal}/>:null}
        {showProject?<CreateProject projValue={projValue} closeModal={closeValueModal}/>:null}
        

        {/* CreateOrganization */}
        {/* <CreateValue/>
        <CreateSkills/>
        <CreateGoal/> */}
        {/* <CreateDepartment/> */}
      </MainLayout>
    </>
  );
}

export default Organization;
