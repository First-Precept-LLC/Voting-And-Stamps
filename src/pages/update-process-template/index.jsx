import { useRouter } from "next/router";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { projectsActions } from "../../store/actions/projectsActions";
import { organizationActions } from "../../store/actions/organizationsActions";
import { processTemplateActions } from "../../store/actions/processTemplateActions";
import TemplateSuccess from '../../components/process-templates/template-success';
import MainLayout from '../../components/layout/MainLayout';
import CreateProcessTemplates from "../../components/process-templates/create-process-template";

function ProcessTemplates() {
    const [item, setItem]=useState(null)
    const router = useRouter();
    const [createModal, setShowCreateModal] = useState(false)

    const dispatch = useDispatch();

    const {
        organizations,
        getOrganizationRequest
      } = useSelector(state => state.organizations);

      const {
        editProcessTemplateRequest,
        isEditProcessTemplateSuccess
      } = useSelector(state => state.processTemplate);

    const {
        projects
      } = useSelector(state => state.projects);

      useEffect(() => {
        if (router.query?.data) {
            setItem(JSON.parse(router.query.data))
        }
      }, [router.query]);

      useEffect(() => {
        dispatch(organizationActions.getOrganizationRequest());
        dispatch(processTemplateActions.getProcessTemplateRequest());
      }, []);
    
      useEffect(() => {
        if (!getOrganizationRequest && organizations) {
          dispatch(projectsActions.getProjectsRequest());
        }
      }, [getOrganizationRequest, organizations]);

      useEffect(() => {
        if (!editProcessTemplateRequest && isEditProcessTemplateSuccess) {
            setShowCreateModal(true);
            dispatch(processTemplateActions.resetStatus());
        }
      }, [isEditProcessTemplateSuccess, editProcessTemplateRequest])

 
  
    const handleEditProcess = (data) => {
        dispatch(processTemplateActions.editProcessTemplateRequest({
            ...item,
            ...data
        }))
    }

    const closeModal = () => {
        setShowCreateModal(false);
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
                {!createModal &&
                    <CreateProcessTemplates 
                        projects={projects}
                        organizations={organizations}
                        onCreateProcess={handleEditProcess}
                        processTemplateData={item}
                        isEditItem={true}
                    />
                }
                {createModal && <TemplateSuccess closeModal={closeModal} /> }
            </MainLayout >

        </>
    )
}

export default ProcessTemplates;