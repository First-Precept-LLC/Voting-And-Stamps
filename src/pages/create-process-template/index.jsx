
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { departmentsActions } from "../../store/actions/departmentsActions";
import { organizationActions } from "../../store/actions/organizationsActions";
import { processTemplateActions } from "../../store/actions/processTemplateActions";
import { usersActions } from "../../store/actions/usersActions";
import TemplateSuccess from '../../components/process-templates/template-success';
import CreateProcessTemplates from "../../components/process-templates/create-process-template";
import MainLayout from '../../components/layout/MainLayout';


function ProcessTemplates(props) {
    const [createModal, setShowCreateModal] = useState(false)

    const dispatch = useDispatch();

    const {
        organizations,
        getOrganizationRequest
    } = useSelector(state => state.organizations);

    const {
        saveProcessTemplateRequest,
        isSaveProcessTemplateSuccess
    } = useSelector(state => state.processTemplate);

    const {
        departments
    } = useSelector(state => state.departments);

    const {
        users
    } = useSelector((state) => state.users);


    useEffect(() => {
        dispatch(organizationActions.getOrganizationRequest());
        dispatch(processTemplateActions.getProcessTemplateRequest());
        dispatch(usersActions.getUsersRequest());
    }, []);

    useEffect(() => {
        if (!getOrganizationRequest && organizations) {
            dispatch(departmentsActions.getDepartmentsRequest());
        }
    }, [getOrganizationRequest, organizations]);

    useEffect(() => {
        if (!saveProcessTemplateRequest && isSaveProcessTemplateSuccess) {
            setShowCreateModal(true);
            dispatch(processTemplateActions.resetStatus());
        }
    }, [isSaveProcessTemplateSuccess, saveProcessTemplateRequest])


    const handleCreateProcess = (data) => {
        dispatch(processTemplateActions.saveProcessTemplateRequest(data));
    }



    const closeModal = () => {
        setShowCreateModal(false)
    }


    return (
        <>
            <head>
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
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

                {!createModal ?
                    <CreateProcessTemplates
                        departments={departments}
                        organizations={organizations}
                        onCreateProcess={handleCreateProcess}
                        users={users}
                    /> :
                    <TemplateSuccess closeModal={closeModal} />
                }
            </MainLayout >

        </>
    )
}

export default ProcessTemplates;