
import React , { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
// import { values } from 'lodash';
import { gql, useMutation, useQuery, NetworkStatus } from '@apollo/client';
import { organizationActions } from "../../store/actions/organizationsActions";
import { valuesActions } from '../../store/actions/valuesActions';
import { projectsActions } from "../../store/actions/projectsActions";
import MainLayout from '../../components/layout/MainLayout';
import CreateOrganization from '../../components/organizations/create-organization'
import SuccessOrganization from '../../components/organizations/success-organization'
import OrganizationDetail from '../../components/organizations/organization-detail'
import CreateValue from '../../components/organizations/create-value'
import CreateSkills from '../../components/organizations/create-skills'
import CreateGoal from '../../components/organizations/create-goal'
import CreateDepartment from '../../components/organizations/create-department'
import CreateNewOrganization from "../../components/organizations/create-new-organization"

import CreateProject from "../../components/organizations/create-projects"
import {getUserId} from '../../services/user.service';

function Organization() {
  const dispatch = useDispatch();
  const [showCreateModal,setShowCreateModal] = useState(false);
  const [showSuccessModal,setShowSuccessModal] = useState(false);
  const [showOrgDetail,setShowOrgDetail] = useState(false);
  const [showValue, setShowValue] = useState(false);
  const [showCreateValue,setShowCreateValue] = useState(false);
  const [showAddGoal,setShowAddGoal] = useState(false)
  const [showAddSkills,setShowAddSkills] = useState(false)
  const [showDepartment,setDepartment] = useState(false)
  const [showProject,setProject]=useState(false);
  const [goal,setGoal] = useState([])
  const [skill,setSkills] = useState([])
  const [departmentValue,setDepartmentValues] = useState([])
  const [projectValues,setProjectValues]=useState([]);
  const [orgData, setOrgData] = useState({});

  const {
    organizations,
    // isSaveFailure,
    isSaveOrgSuccess,
    getOrganizationRequest
  } = useSelector(state => state.organizations);

  const {
    values,
    isSaveOrganizationValuesSuccess
  } = useSelector(state => state.values);

  const {
    projects,
    //  isSaveOrganizationValuesSuccess
  } = useSelector(state => state.projects);



 console.log(organizations, 'organizations', isSaveOrgSuccess, projects)


  useEffect(() => {
      if (isSaveOrgSuccess) {
        setShowOrgDetail(true);
      }
  }, [isSaveOrgSuccess]);

  useEffect(() => {
    dispatch(organizationActions.getOrganizationRequest());
  }, []);

  useEffect(() => {
    if (!getOrganizationRequest && organizations) {
      setShowOrgDetail(true);
      setOrgData(organizations);
      dispatch(valuesActions.getValuesRequest());
      dispatch(projectsActions.getProjectsRequest());
    }
  }, [getOrganizationRequest, organizations]);
  

  const handleSuccessCloseModal = ()=>{
    setShowCreateModal(false);
    setShowSuccessModal(false);
    setShowOrgDetail(true);
    dispatch(organizationActions.resetStatus());
  }
  
  const handleCreateOrganization = (data) => {
    console.log(data);
    setOrgData(data);
    setShowCreateModal(false);
    dispatch(organizationActions.saveOrganizationsRequest(data));
    // createExample({variables: {name:data.orgName,vision:data.vision,userId: getUserId()}});
  }

  const handleAddValue = () => {
    setShowCreateModal(false);
    setShowSuccessModal(false);
    setShowOrgDetail(false);
    setShowCreateValue(true);
  }


  const handleCloseValueModal = () => {
    setShowOrgDetail(true);
    setShowCreateValue(false);
  }

  const handleCloseProjectModal = () => {
    setShowOrgDetail(true);
    setProject(false);
  }

  const closeValueModal = ()=>{
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
  const handleAddProject = () => {
    setShowCreateModal(false);
    setShowSuccessModal(false);
    setShowOrgDetail(false);
    setShowCreateValue(false);
    setShowAddGoal(false);
    setShowAddSkills(false);
    setProject(true)
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
  const handleCreateProject = (data) => {
    // setProjectValues([...projectValues,data])
    // console.log([...projectValues,data,"hi22222222"]);
    console.log(data, 'project data')
    dispatch(projectsActions.saveProjectsRequest(data));

  }
  
  const handleCreateValues = (valuesData) => {
    console.log(valuesData, 'test');
    dispatch(valuesActions.saveValuesRequest(valuesData));
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
        { getOrganizationRequest ? <>Loading....</> :
          <>
            
            {
              !organizations && 
              !showCreateModal && 
              !showSuccessModal && 
              !showOrgDetail && 
                <CreateNewOrganization onClick={() => setShowCreateModal(true) }/> 
            }
            { showCreateModal && <CreateOrganization onCreateOrganization={handleCreateOrganization} onCloseModal={() => setShowCreateModal(false)}/> }
            { showSuccessModal && <SuccessOrganization onCloseModal={handleSuccessCloseModal} orgData={orgData}/>}
            { showOrgDetail && organizations && 
              <OrganizationDetail 
                  values={values} 
                  goal={goal} 
                  skill={skill} 
                  departmentValue={departmentValue} 
                  projects={projects} 
                  onAddValue={handleAddValue} 
                  showGoal={showGoal} 
                  showSkills={showSkills} 
                  showDep={showDep} 
                  onAddProject={handleAddProject} 
                  orgData={orgData} 
                  showValue={showValue}
              /> 
            }
            {showCreateValue && <CreateValue organizations={organizations} onCreateValue={handleCreateValues} onCloseModal={handleCloseValueModal}/>}
        
            {showAddGoal && <CreateGoal createValue={createValue} closeModal={closeValueModal}/>}

            {showAddSkills && <CreateSkills skills={skills} closeModal={closeValueModal}/>}

            {showDepartment && <CreateDepartment depValue={depValue} closeModal={closeValueModal}/>}

            {showProject && <CreateProject organizations={organizations} onCreateProject={handleCreateProject} onCloseModal={handleCloseProjectModal}/>}
          </>

        }
        
       
 

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
