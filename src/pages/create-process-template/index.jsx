import TemplateSuccess from '../../components/process-templates/template-success';
import MainLayout from '../../components/layout/MainLayout';
import { gql, useMutation, useQuery as query, NetworkStatus, useQuery } from '@apollo/client'
import { useState, useEffect } from 'react';
import { getUserId } from '../../services/user.service';
let id = 1;
function ProcessTemplates() {
    const [department, setDepartment] = useState(['US', 'CA', 'FR', 'DE']);
    // const [fields, setFields] = useState([{ step: '', showPopup: false, id: `${id}` }]);
    const [project, setProject] = useState('')
    const [proName, setProName] = useState('')
    const [estDuration, setestDuration] = useState([])
    const [desc, setDesc] = useState('')
    const [step, setStep] = useState('')
    const [stepDuration, setStepDuration] = useState('')
    const [descriptionText, setDescriptionText] = useState('')
    const [createModal, setShowCreateModal] = useState(false)
    const [processName, setProcessName] = useState('')
    const [user, setUser] = useState('')
    const [date, setDate] = useState('')
    const [showDate, setShowDate] = useState(false)
    const [processShowDate, setProcessShowDate] = useState(false)
    const [selectedStep, setSelectedStep] = useState({});
    const [fields, setFields] = useState([{ step: '', duration: [], description: '', showPopup: false, id: `${id}`, selected: true }]);
    // const [showPopupValue,setShowPopupValue]=useState(false)
    const [templateId, setTemplateId] = useState('');
    const [errorMsg, setErrorMsg] = React.useState(false);

    const CREATE_PROCESS_TEMPLATE = gql`
    mutation createProcessTemplate($name: String!, $parentProject: String!, $estimatedDuration: String!, $description: String!, $userId: String!) {
      createProcessTemplate(input: {data: {name: $name, parentProject: $parentProject, estimatedDuration: $estimatedDuration, description: $description, userId: $userId}}) {
        data {_id, name }
      }
    }`;

    let [createProcessTemplate, { dataValue, loadingValue, errorValue }] = useMutation(
        CREATE_PROCESS_TEMPLATE, {
        onCompleted: (dataValue) => {
            console.log(dataValue)
            setTemplateId(dataValue.createProcessTemplate.data._id)
            fields.forEach(item => {
                if (item.step && item.duration && item.description) {
                    setErrorMsg(false)
                    createStep({
                        variables: {
                            name: item.step,
                            estimatedDuration: item.duration.toString(),
                            description: item.description,
                            userId: getUserId(),
                            parentProcessTemplate: dataValue.createProcessTemplate.data._id

                        }
                    })}
                
                else {
                    setErrorMsg(true)
                }
            })

            props.addValue({
                name: proName,
                parentProject: project,
                estimatedDuration: estDuration.toString(),
                description: desc,
                userId: getUserId()
            })
        },
        onError: (errorValue) => console.error("Error creating a post", error),
    }
    );
    const CREATE_STEP = gql`
      mutation createStep($name: String!,$estimatedDuration: String!, $description: String!,$parentProcessTemplate:String!) {
        createStep(input: {data: {name: $name, estimatedDuration: $estimatedDuration, description: $description,parentProcessTemplate:$parentProcessTemplate}}) {
          data {_id, name }
        }
      }`;
    let [createStep, { dataProcess, loadingProcess, errorProcess }] = useMutation(
        CREATE_STEP, {
        onCompleted: (dataProcess) => {
            console.log(dataProcess)
            setShowCreateModal(true);

        },
        onError: (errorProcess) => console.error("Error creating a post step", error),
    }
    );


    const GET_PROJECTS = gql`
    query projs($nameFilter: String!) {
        projs(input: {filter:{userId:{_eq:$nameFilter}}}) {
          results {_id,name,parent}
        }
    }
  `;
    const { data, error, loading } = useQuery(GET_PROJECTS, {
        notifyOnNetworkStatusChange: true,
        variables: { nameFilter: getUserId() },
        onCompleted: (dataValue) => {
            console.log({ data })
            setDepartment(data.projs.results);
        }
    });


    const GET_PROCESS = gql`
    query procs($nameFilter: String!) {
        procs(input: {filter:{userId:{_eq:$nameFilter}}}) {
          results {_id,name,parent}
        }
    }
  `;
    const { data1, error1, loading1 } = useQuery(GET_PROCESS, {
        notifyOnNetworkStatusChange: true,
        variables: { nameFilter: getUserId() },
        onCompleted: (dataValue) => {
            console.log({ data1 })
            setProName(data1.procs.results);
        }
    });
    console.log(data);


    console.log(department);
    // Calculates output

    const createOrg = () => {
        createProjectValue({
            variables: {
                name: department,

            }
        })

    }

    const CREATE_PROCESS = gql`
    mutation  createProcess($userId:String!,$name: String!, $dueDate: Date!) {
      createProcess(input: {data: {userId:$userId ,name: $name,dueDate: $dueDate}}) {
        data {_id}
      }
    }`;
    let [createProces, { loading: _loading, data: _data, error: _error }] = useMutation(
        CREATE_PROCESS, {
        onCompleted: (_data) => {
            props.addValue({
                name: processName,
                userId: user,
                dueDate: date
            })
            props.closeModal();

        },
        onError: (error) => console.error("Error creating a post", error),
    }
    );

    const createProcessOrg = () => {
        createProces({
            variables: {
                userId: user,
                name: processName,
                dueDate: date

            }
        })

    }


    const [modal, setModal] = useState(false)
    const CreatePage = () => {
        setErrorMsg(false);
        if (proName && project && estDuration && desc && fields.length !== 0) {
            createProcessTemplate({
                variables: {
                    name: proName,
                    parentProject: project,
                    estimatedDuration: estDuration.toString(),
                    description: desc,
                    userId: getUserId()
                }
            })
        }else{
            setErrorMsg(true);
        }



        console.log({
            project: project,
            name: proName,
            duration: estDuration,
            description: desc,
            fields: fields,

        })
    }



    const closeModal = () => {
        setShowCreateModal(false)
        setCreateDetails(false)
    }

    const showPopupHandler = (id) => {
        console.log(id);
        let array = [...fields];
        array.forEach(element => {
            if (element.id == id) {
                if (element.showPopup == true) {
                    element.showPopup = false;
                } else {
                    element.showPopup = true;
                }
            }
            else {
                element.showPopup = false;
            }

        });
        setFields(array);

    }
    const handleAdd = () => {
        id = id + 1
        const values = [...fields];
        values.push({ step: '', showPopup: false, id: `${id}`, description: '', duration: [] });
        setFields(values);
    }
    const deleteHandler = (id, index) => {
        let arr = [...fields];
        console.log(arr);
        arr.splice(index, 1);
        setFields([...arr]);

    }
    console.log(fields)

    const stepEstimatedDate = () => {
        setShowDate(!showDate)
    }
    const estimatedDate = () => {
        setProcessShowDate(!processShowDate)
    }
    const handleBlur = () => {
        if (estDuration.length == 3) {
            setProcessShowDate(false);
        }

    }
    const handleBlurOfstep = () => {
        if (selectedStep.duration.length >= 3) {
            setShowDate(false);
        }
    }
    const selectedDecriptionHandler = (value) => {
        let step = JSON.parse(JSON.stringify(selectedStep))
        step.description = value;
        setSelectedStep(step);
        let arr = [...fields];
        arr.forEach(e => {
            if (e.id === selectedStep.id) {
                e.description = value;
                return;
            }
        })
        setFields([...arr])
    }

    const showDataHandler = (id) => {

        let array = [...fields];
        array.forEach(element => {
            if (element.id == id) {

                setSelectedStep(element);
                return;
            }

        });

    }
    console.log(selectedStep);
    const selectedDurationHandler = (value) => {
        selectedStep.duration = value;
        fields.forEach(e => {
            if (e.id === selectedStep.id) {
                e.duration = value;
            }
        });

    }

    const daysHandler = (value) => {

        let step = { ...selectedStep }
        step.duration[0] = `${value.days}days `
        setSelectedStep({ ...step })


    }
    const hrsHandler = (value) => {

        let step = { ...selectedStep }
        step.duration[1] = `${value.hrs}hrs `
        setSelectedStep({ ...step })
    }
    const minsHandler = (value) => {

        let step = { ...selectedStep }
        step.duration[2] = `${value.mins}mins `
        setSelectedStep({ ...step })
    }

    const processDaysHandler = (value) => {


        estDuration[0] = `${value.days}days `
        setSelectedStep({ ...step })


    }
    const processHrsHandler = (value) => {


        estDuration[1] = `${value.hrs}hrs `
        setSelectedStep({ ...step })
    }
    const processMinsHandler = (value) => {


        estDuration[2] = `${value.mins}mins `
        setSelectedStep({ ...step })
    }

    console.log(selectedStep);
    console.log(fields);

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

                {!createModal ?
                    <div className="flex w-full p-8 flex-col">
                        <div className="flex justify-between">
                            <h1 className="text-3xl mb-8">Create Process Template</h1>
                            <button type="button" onClick={CreatePage}
                                className="text-white h-10 bg-gradient-to-r from-kelvinDark  to-kelvinBold hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                                Create
                            </button>
                        </div>

                        <div className="flex flex-col">
                            <div className="flex grid grid-cols-3 gap-4">
                                <div className="flex flex-col mb-8">
                                    <label for="countries" className="text-xs font-bold mb-2">Project</label>
                                    <select id="countries" onChange={(e) => setProject(e.target.value)}
                                        className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                        <option selected="">Select Project</option>
                                        {department.map(value => {
                                            return (<option value={value._id}>{value.name}</option>)
                                        }

                                        )}
                                        {/* <option value="US">HR</option>
                                        <option value="CA">HR</option>
                                        <option value="FR">HR</option>
                                        <option value="DE">HR</option> */}
                                    </select>

                                </div>
                                <div className="flex flex-col mb-8">
                                    <h4 className="text-xs font-bold mb-2">Process Name</h4>
                                    <input type="text" id="processname" onChange={(e) => setProName(e.target.value)}
                                        className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder="Enter process name" required />
                                </div>
                                <div className="flex flex-col mb-8">
                                    <h4 className="text-xs font-bold mb-2">Estimated Duration</h4>
                                    <div className="relative" onClick={estimatedDate}>
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="kelvinBold"
                                                viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd"
                                                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                                    clip-rule="evenodd"></path>
                                            </svg>
                                        </div>
                                        <input id="dropdownDividerButton"
                                            onChange={(e) => setestDuration(e.target.value)}
                                            value={estDuration}
                                            data-dropdown-toggle="dropdownDivider"
                                            className="bg-white border-2 border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                                            placeholder="Estimated Duration" disabled readonly />
                                    </div>
                                </div>
                                {processShowDate ?
                                    <div id="dropdownDivider" onBlur={handleBlur}
                                        className="z-10 p-4 bg-kelvinLight divide-y divide-gray-100 rounded rounded-lg shadow w-80 "
                                        data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="top"
                                        style={{ position: 'absolute', inset: 'auto auto 0px 0px', top: '250px', right: '1px', height: '200px', margin: '0px', transform: 'translate3d(970.5px, 11px, 0px)' }}>
                                        <div className="py-1">
                                            <a href="#"
                                                className="block px-4 py-2 text-xs text-center text-gray-700 hover:bg-gray-100">Dynamic
                                                Estimated Duration</a>
                                        </div>
                                        <ul className="py-1 flex text-sm text-gray-700 dark:text-gray-200 justify-between"
                                            aria-labelledby="dropdownDividerButton">
                                            <li className="">
                                                <a href="#" className="block px-4 py-2 hover:bg-gray-100 text-kelvinDark">Days</a>
                                                <input type="number" name="" id="" required value={parseInt(estDuration[0])} onChange={(e) => { processDaysHandler({ days: `${e.target.value}` }) }}
                                                    className="w-20 bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                                            </li>
                                            <li>
                                                <a href="#" className="block px-4 py-2 hover:bg-gray-100 text-kelvinDark  ">Hours</a>
                                                <input type="number" name="" id="" required value={parseInt(estDuration[1])} onChange={(e) => { processHrsHandler({ hrs: `${e.target.value}` }) }}
                                                    className="w-20 bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                                            </li>
                                            <li>
                                                <a href="#" className="block px-4 py-2 hover:bg-gray-100 text-kelvinDark  ">Minutes</a>
                                                <input type="number" name="" id="" required value={parseInt(estDuration[2])} onChange={(e) => { processMinsHandler({ mins: `${e.target.value}` }) }}
                                                    className="w-20 bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                                            </li>
                                        </ul>

                                    </div>
                                    : null}


                            </div>
                            <div className="flex flex-col mb-4">
                                <h4 className="text-xs font-bold mb-2">Description</h4>
                                <textarea id="message" rows="4" onChange={(e) => setDesc(e.target.value)}
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-md border-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                                    placeholder="Enter Description"></textarea>

                            </div>
                        </div>
                        <div className="flex flex-col">
                            <h6>Steps</h6>

                            <div className="flex grid grid-cols-2 gap-4">
                                <div className="flex  bg-kelvinLight p-4">
                                    <div class="flex flex-col w-full">
                                        {
                                            fields.map((item, index) => {
                                                return (
                                                    <div onClick={e => { showDataHandler(item.id) }}
                                                        className="flex items-center w-full min-h-8 justify-between pl-4 py-1 bg-white shadow shadow-md rounded-md mb-2 flex-wrap">
                                                        <input key={item.id} style={{ border: 0 }} type='text' required defaultValue={item.step} onChange={(e) => { item.step = e.target.value; }} />
                                                        <button className="px-4" onClick={() => { showPopupHandler(item.id) }}>
                                                            <i className="fa-solid fa-ellipsis-vertical" ></i>
                                                        </button>
                                                        {item.showPopup ?
                                                            <div style={{ height: "30px", width: '30px' }}>
                                                                <button onClick={() => { deleteHandler(item.id, index) }}>delete</button>

                                                            </div>
                                                            : null
                                                        }
                                                    </div>
                                                )
                                            })
                                        }

                                        <button onClick={() => handleAdd()} type="button"
                                            class="text-white bg-kelvinMedium hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-md text-sm px-5 py- h-8 text-left w-full mb-2 hover:bg-kelvinBold"
                                            data-modal-toggle="large-modal">
                                            <i class="fa-solid fa-plus"></i>
                                            Add Task
                                        </button>
                                    </div>
                                </div>
                                <div className="flex flex-col bg-kelvinLight p-4">
                                    <h5 className="text-xl mb-4">{selectedStep.step}</h5>
                                    <div className="flex flex-col mb-8">
                                        <h4 className="mb-2">Estimated Duration</h4>
                                        <div className="relative" onClick={stepEstimatedDate} >
                                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="kelvinBold"
                                                    viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd"
                                                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                                        clip-rule="evenodd"></path>
                                                </svg>
                                            </div>
                                            <input id="dropdownDividerButton" data-dropdown-toggle="dropdownDivider" onChange={(e) => selectedDurationHandler(e.target.value)}
                                                className="bg-white border-2 border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  datepicker-input"
                                                placeholder="Estimated Duration" disabled
                                                value={selectedStep.duration} />
                                        </div>
                                    </div>

                                    {showDate ?
                                        <div id="dropdownDivider" onBlur={handleBlurOfstep}
                                            className="z-10 p-4 bg-kelvinLight divide-y divide-gray-100 rounded rounded-lg shadow w-80 "
                                            data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="top"
                                            style={{ position: 'absolute', inset: 'auto auto 0px 0px', top: '250px', right: '1px', height: '200px', margin: '0px', transform: 'translate3d(842.5px, 344px, 0px)' }}>
                                            <div className="py-1">
                                                <a href="#"
                                                    className="block px-4 py-2 text-xs text-center text-gray-700 hover:bg-gray-100">Dynamic
                                                    Estimated Duration</a>
                                            </div>
                                            <ul className="py-1 flex text-sm text-gray-700 dark:text-gray-200 justify-between"
                                                aria-labelledby="dropdownDividerButton">
                                                <li className="">
                                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 text-kelvinDark">Days</a>
                                                    <input type="number" name="" required id="" value={(selectedStep && selectedStep.duration && selectedStep.duration[0] && selectedStep.name !== null) ? parseInt(selectedStep.duration[0]) : null} onChange={(e) => { daysHandler({ days: `${e.target.value}` }) }}
                                                        className="w-20 bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                                                </li>
                                                <li>
                                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 text-kelvinDark  ">Hours</a>
                                                    <input type="number" name="" required id="" value={(selectedStep && selectedStep.duration && selectedStep.duration[1] && selectedStep.name !== null) ? parseInt(selectedStep.duration[1]) : null} onChange={(e) => { hrsHandler({ hrs: `${e.target.value}` }) }}
                                                        className="w-20 bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                                                </li>
                                                <li>
                                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 text-kelvinDark  ">Minutes</a>
                                                    <input type="number" name="" required id="" value={(selectedStep && selectedStep.duration && selectedStep.duration[2] && selectedStep.name !== null) ? parseInt(selectedStep.duration[2]) : null} onChange={(e) => { minsHandler({ mins: `${e.target.value}` }) }}
                                                        className="w-20 bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                                                </li>
                                            </ul>

                                        </div>
                                        : null}
                                    <div className="flex flex-col mb-4">
                                        <h4 className="mb-2">Description</h4>
                                        <form>
                                            <div className="mb-4 w-full bg-gray-100 rounded-lg border border-gray-300 ">
                                                <div className="py-2 px-4 bg-white rounded-b-lg ">
                                                    <textarea id="editor" rows="8" onChange={(e) => { selectedDecriptionHandler(e.target.value) }}
                                                        className="block px-0 w-full text-sm text-gray-800 bg-white border-0  focus:ring-0" style={{ height: '50px' }}
                                                        placeholder="Enter Description" required value={selectedStep.description} >{selectedStep.description}</textarea>
                                                </div>

                                                <div className="flex flex-row float-right">
                                                    <div className="flex items-center space-x-1">
                                                        <button type="button"
                                                            className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                                            <i className="fa-solid fa-bold" style={{ color: '#0707ae', fontSize: '15px' }}></i>
                                                        </button>
                                                        <button type="button"
                                                            className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                                            <i className="fa-solid fa-italic" style={{ color: '#0707ae', fontSize: '15px' }}></i>
                                                        </button>
                                                        <button type="button"
                                                            className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                                            <i className="fa-solid fa-underline" style={{ color: '#0707ae', fontSize: '15px' }}></i>
                                                        </button>
                                                        <button type="button"
                                                            className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                                            <i className="fa-solid fa-link" style={{ color: '#0707ae', fontSize: '15px' }}></i>
                                                        </button>

                                                    </div>
                                                    <button type="button"
                                                        className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                                        <i className="fa-solid fa-align-left" style={{ color: '#0707ae', fontSize: '15px' }}></i>
                                                    </button>
                                                    <button type="button"
                                                        className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                                        <i className="fa-solid fa-align-center" style={{ color: '#0707ae', fontSize: '15px' }}></i>
                                                    </button>
                                                    <button type="button"
                                                        className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                                        <i className="fa-solid fa-align-right" style={{ color: '#0707ae', fontSize: '15px' }}></i>
                                                    </button>
                                                    <button type="button"
                                                        className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                                        <i className="fa-solid fa-list" style={{ color: '#0707ae', fontSize: '15px' }}></i>
                                                    </button>
                                                </div>
                                            </div>
                                            
                                        </form>
                                      
                                    </div>
                                    {
                                                errorMsg ? <p style={{ color: 'red' }}>Please complete the form to proceed</p> : null
                                            }
                                </div>
                            </div>
                        </div>
                    </div> : null
                }

                {createModal ? <TemplateSuccess closeModal={closeModal} /> : null}

            </MainLayout >

        </>
    )
}

export default ProcessTemplates;