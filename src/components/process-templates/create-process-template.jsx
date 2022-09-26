
import { v4 as uuidV4 } from "uuid";
import { useState, useEffect, useRef } from 'react';
import Router from 'next/router'
import { getUserId } from '../../services/user.service';

const CreateProcessTemplates = (props) => {
    const { projects, organizations, onCreateProcess, processTemplateData, isEditItem } = props;
    const [showDate, setShowDate] = useState(false)
    const [isEstimateDateModalOpen, setIsEstimateDateModalOpen] = useState(false)
    const [selectedStep, setSelectedStep] = useState({});
    const [fields, setFields] = useState([
        { name: '', step: '', estimatedDate: [], description: '', showPopup: false, id: uuidV4(), selected: true, isCompleted: false, index: 0, user: {} }
    ]);
    const [errorMsg, setErrorMsg] = useState(false);
    const [processTemplate, setProcessTemplate] = useState({
        project: {},
        name: "",
        estimatedDate: [],
        description: ""
    })
    const processEstimatedRef = useRef(null);
    const stepEstimatedRef = useRef(null);

    useEffect(() => {
        if (processTemplateData) {
            setProcessTemplate(state => ({
                ...state,
                project: processTemplateData.project ?? {},
                name: processTemplateData.name,
                estimatedDate: processTemplateData.estimatedDate,
                description: processTemplateData.description
            }));
            setFields(processTemplateData?.steps ?? []);
            if (processTemplateData?.steps?.length) {
                setSelectedStep(processTemplateData?.steps[0])
            }
        }
    }, [processTemplateData]);

    useEffect(() => {
        document.addEventListener("mousedown", handleProcessEstimatedClickOutside);
        document.addEventListener("mousedown", handleStepEstimatedClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleProcessEstimatedClickOutside);
            document.removeEventListener("mousedown", handleStepEstimatedClickOutside);
        };
    }, []);

    const handleProcessEstimatedClickOutside = (event) => {
        if (processEstimatedRef && !processEstimatedRef.current?.contains(event.target)) {
            setIsEstimateDateModalOpen(false);
        }
    }

    const handleStepEstimatedClickOutside = (event) => {
        if (stepEstimatedRef && !stepEstimatedRef.current?.contains(event.target)) {
            setShowDate(false);
        }
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'project') {
            const findProject = projects?.find(project => project.id === value)
            setProcessTemplate(state => ({
                ...state,
                [name]: findProject ?? {}
            }));
            return;
        }
        setProcessTemplate(state => ({
            ...state,
            [name]: value
        }));
    }

    const handleCreateProcess = () => {
        setErrorMsg(false);
        const { project, name, estimatedDate, description } = processTemplate;
        if (project?.id && name && estimatedDate && description && fields.length) {
            onCreateProcess({
                ...processTemplate,
                steps: fields,
                orgId: organizations?.id,
                userId: getUserId()
            });
        } else {
            setErrorMsg(true);
        }
    }

    const showPopupHandler = (id) => {
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
    const handleAddField = () => {
        const values = [...fields];
        values.push({ step: '', showPopup: false, id: uuidV4(), description: '', estimatedDate: [], index: values.length });
        setFields(values);
    }

    const deleteHandler = (id, index) => {
        const arr = [...fields];
        if (arr.length > 1) {
            // console.log(arr);
            arr.splice(index, 1);
            setSelectedStep(({
                ...arr[0],
                index: 0
            }));
            setFields([...arr]);

        }
    }

    const stepEstimatedDate = () => {
        setShowDate(state => !state);
    }

    const showEstimateDateModal = () => {
        setIsEstimateDateModalOpen(state => !state);
    }

    const setSelectedStepData = (item, index) => {
        setSelectedStep({
            ...item,
            index
        });
    }


    const handleStepsEstimatedDuration = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        const copyFields = [...fields];
        const selectedStepIndex = selectedStep && selectedStep.id ? copyFields.findIndex(field => field.id === selectedStep.id) : -1;
        switch (name) {
            case "days":
                if (selectedStepIndex > -1) {
                    copyFields[selectedStepIndex].estimatedDate[0] = `${value}days`;
                }
                break;
            case "hrs":
                if (selectedStepIndex > -1) {
                    copyFields[selectedStepIndex].estimatedDate[1] = `${value}hrs`;
                }
                break;
            case "mins":
                if (selectedStepIndex > -1) {
                    copyFields[selectedStepIndex].estimatedDate[2] = `${value}mins`;
                }
                break;
            default: break;
        }
        setFields(copyFields);
    }

    const handleProcessEstimatedDuration = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        const duration = [...processTemplate.estimatedDate];
        switch (name) {
            case "days":
                duration[0] = `${value}days`;
                break;
            case "hrs":
                duration[1] = `${value}hrs`;
                break;
            case "mins":
                duration[2] = `${value}mins`;
                break;
            default: break;
        }
       
        setProcessTemplate(state => ({
            ...state,
            estimatedDate: duration
        }));
    }

    const handleStepInputChange = (event, index) => {
        const copyFields = [...fields];
        const { name, value } = event.target;
        switch (name) {
            case "name":
                if (copyFields[index]) {
                    copyFields[index][name] = value;
                }
                break;
            case "description":
                if (copyFields[index]) {
                    copyFields[index][name] = value;
                }
                break;
            case "user":
                const findUser = props.users?.find(user => user.id === value);
                console.log(value, 'ff', findUser, copyFields[index], index)
                if (copyFields[index]) {
                    copyFields[index][name] = findUser ?? {};
                }
                break;
            default: break;
        }
        setFields(copyFields);
    }

    const currentSelectedStep = selectedStep && selectedStep.id ? fields.find(field => field.id === selectedStep.id) ?? {} : {};
    const labelText = isEditItem ? 'Update' : 'Create';
    return (
        <>
            <div className="flex w-full p-8 flex-col">
                <div className="flex justify-between">
                    <h1 className="text-3xl mb-8">{labelText} Process Template</h1>
                    <div>
                        {isEditItem &&
                            <button
                                type="button"
                                className="text-black from-kelvinDark  to-kelvinBold hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6"
                                data-modal-toggle="success-modal"
                                onClick={() => Router.back()}
                            >
                                Cancel
                            </button>
                        }
                        <button type="button" onClick={handleCreateProcess}
                            className="text-white h-10 bg-gradient-to-r from-kelvinDark  to-kelvinBold hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                            {labelText}
                        </button>
                    </div>
                </div>

                <div className="flex flex-col">
                    <div className="flex grid grid-cols-3 gap-4">
                        <div className="flex flex-col mb-8">
                            <label htmlFor="countries" className="text-xs font-bold mb-2">Project</label>
                            <select value={processTemplate?.project?.id} name="project" id="countries" onChange={handleInputChange}
                                className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                <option selected="">Select Project</option>
                                {projects?.map((project) => (
                                    <option key={project.id} value={project.id}>{project.title}</option>
                                ))}
                            </select>

                        </div>
                        <div className="flex flex-col mb-8">
                            <h4 className="text-xs font-bold mb-2">Process Name</h4>
                            <input name="name" type="text" id="processname" onChange={handleInputChange} value={processTemplate.name}
                                className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="Enter process name" required />
                        </div>
                        <div className="flex flex-col mb-8">
                            <h4 className="text-xs font-bold mb-2">Estimated Duration</h4>
                            <div ref={processEstimatedRef} className="relative" onClick={showEstimateDateModal}>
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="kelvinBold"
                                        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd"
                                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                            clipRule="evenodd"></path>
                                    </svg>
                                </div>
                                <input id="dropdownDividerButton"
                                    // onChange={(e) => setestDuration(e.target.value)}
                                    value={processTemplate.estimatedDate}
                                    data-dropdown-toggle="dropdownDivider"
                                    className="bg-white border-2 border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                                    placeholder="Estimated Duration" disabled readOnly />
                                <div>
                                {isEstimateDateModalOpen &&
                                    <div id="dropdownDivider" onClick={() => {
                                        setIsEstimateDateModalOpen(state => !state);
                                    }}
                                        className="z-10 p-4 bg-kelvinLight divide-y divide-gray-100 rounded rounded-lg shadow w-80 "
                                        data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="top"
                                        style={{ position: 'absolute', inset: 'auto auto 0px 0px', top: '43px', left: '22px', height: '200px', margin: '0px'}}>
                                        <div className="py-1">
                                            <span
                                                className="block px-4 py-2 text-xs text-center text-gray-700 hover:bg-gray-100">Dynamic
                                                Estimated Duration</span>
                                        </div>
                                        <ul className="py-1 flex text-sm text-gray-700 dark:text-gray-200 justify-between"
                                            aria-labelledby="dropdownDividerButton">
                                            <li className="">
                                                <span className="block px-4 py-2 hover:bg-gray-100 text-kelvinDark">Days</span>
                                                <input type="number" name="days" required value={parseInt(processTemplate.estimatedDate?.[0] ?? '')} onChange={handleProcessEstimatedDuration}
                                                    className="w-20 bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                                            </li>
                                            <li>
                                                <span className="block px-4 py-2 hover:bg-gray-100 text-kelvinDark  ">Hours</span>
                                                <input type="number" name="hrs" required value={parseInt(processTemplate.estimatedDate?.[1] ?? '')} onChange={handleProcessEstimatedDuration}
                                                    className="w-20 bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                                            </li>
                                            <li>
                                                <span className="block px-4 py-2 hover:bg-gray-100 text-kelvinDark  ">Minutes</span>
                                                <input type="number" name="mins" required value={parseInt(processTemplate.estimatedDate?.[2] ?? '')} onChange={handleProcessEstimatedDuration}
                                                    className="w-20 bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                                            </li>
                                        </ul>

                                    </div>
                                }
                                </div>
                            </div>
                        </div>



                    </div>
                    <div className="flex flex-col mb-4">
                        <h4 className="text-xs font-bold mb-2">Description</h4>
                        <textarea value={processTemplate.description} name="description" id="message" rows="4" onChange={handleInputChange}
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-md border-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                            placeholder="Enter Description"></textarea>

                    </div>
                </div>
                <div className="flex flex-col">
                    <h6>Steps</h6>

                    <div className="flex grid grid-cols-2 gap-4">
                        <div className="flex  bg-kelvinLight p-4">
                            <div className="flex flex-col w-full">
                                {
                                    fields.map((item, index) => {
                                        return (
                                            <div key={index} onClick={e => { setSelectedStepData(item, index) }}
                                                className="flex items-center w-full min-h-8 justify-between pl-4 py-1 bg-white shadow  rounded-md mb-2 flex-wrap">
                                                <input name="name" key={item.id} className="flex-grow border-0 " type='text' placeholder="Type the task here" required defaultValue={item.name} onChange={(e) => handleStepInputChange(e, index)} />
                                                <button className="px-4" onClick={() => { showPopupHandler(item.id) }}>
                                                    <i className="fa-solid fa-ellipsis-vertical" ></i>
                                                </button>
                                                {item.showPopup ?
                                                    <div style={{ height: "30px", width: '30px' }}>
                                                        <button onClick={(event) => {
                                                            event.stopPropagation();
                                                            deleteHandler(item.id, index);
                                                        }}>delete</button>

                                                    </div>
                                                    : null
                                                }
                                            </div>
                                        )
                                    })
                                }

                                <button onClick={() => handleAddField()}
                                    className="text-white bg-kelvinMedium hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-md text-sm px-5 py- h-8 text-left w-full mb-2 hover:bg-kelvinBold"
                                    data-modal-toggle="large-modal">
                                    <i className="fa-solid fa-plus"></i>
                                    Add Task
                                </button>
                            </div>
                        </div>
                        {currentSelectedStep && !!Object.keys(currentSelectedStep).length &&
                            <div className="flex flex-col bg-kelvinLight p-4">
                                <h5 className="text-xl mb-4">{currentSelectedStep?.name}</h5>
                                <div className="flex flex-col mb-8">
                                    <h4 className="text-lg mb-2">User</h4>
                                    <select
                                        value={currentSelectedStep?.user?.id ?? ''}
                                        name="user"
                                        id="user"
                                        onChange={(e) => handleStepInputChange(e, currentSelectedStep.index)}
                                        className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                        <option>Select User</option>
                                        {props?.users?.map((user) => (
                                            <option key={user.id} value={user.id}>{user.name}</option>
                                        ))}
                                    </select>
                                    <p className="text-xs opacity-50 mt-2">
                                        Default user is populated from the role selected while creating process
                                    </p>
                                </div>
                                <div className="flex flex-col mb-8">
                                    <h4 className="mb-2">Estimated Duration</h4>
                                    <div ref={stepEstimatedRef} className="relative" onClick={stepEstimatedDate} >
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="kelvinBold"
                                                viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd"
                                                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                                    clipRule="evenodd"></path>
                                            </svg>
                                        </div>
                                        <input id="dropdownDividerButton" data-dropdown-toggle="dropdownDivider"
                                            className="bg-white border-2 border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  datepicker-input"
                                            placeholder="Estimated Duration" disabled
                                            value={currentSelectedStep?.estimatedDate} />
                                            {showDate &&
                                    <div id="dropdownDivider" onClick={() => {
                                        setShowDate(state => !state)
                                    }}
                                        className="z-10 p-4 bg-kelvinLight divide-y divide-gray-100 rounded rounded-lg shadow w-80 "
                                        data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="top"
                                        style={{ position: 'absolute', inset: 'auto auto 0px 0px', top: '43px', left: '5px', height: '200px', margin: '0px' }}>
                                        <div className="py-1">
                                            <span
                                                className="block px-4 py-2 text-xs text-center text-gray-700 hover:bg-gray-100">Dynamic
                                                Estimated Duration</span>
                                        </div>
                                        <ul className="py-1 flex text-sm text-gray-700 dark:text-gray-200 justify-between"
                                            aria-labelledby="dropdownDividerButton">
                                            <li className="">
                                                <span  className="block px-4 py-2 hover:bg-gray-100 text-kelvinDark">Days</span>
                                                <input type="number" name="days" required value={(currentSelectedStep && currentSelectedStep.estimatedDate && currentSelectedStep.estimatedDate[0] && currentSelectedStep.name !== null) ? parseInt(currentSelectedStep.estimatedDate[0]) : null} onChange={handleStepsEstimatedDuration}
                                                    className="w-20 bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                                            </li>
                                            <li>
                                                <span className="block px-4 py-2 hover:bg-gray-100 text-kelvinDark  ">Hours</span>
                                                <input type="number" name="hrs" required value={(currentSelectedStep && currentSelectedStep.estimatedDate && currentSelectedStep.estimatedDate[1] && currentSelectedStep.name !== null) ? parseInt(currentSelectedStep.estimatedDate[1]) : null} onChange={handleStepsEstimatedDuration}
                                                    className="w-20 bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                                            </li>
                                            <li>
                                                <span className="block px-4 py-2 hover:bg-gray-100 text-kelvinDark  ">Minutes</span>
                                                <input type="number" name="mins" required value={(currentSelectedStep && currentSelectedStep.estimatedDate && currentSelectedStep.estimatedDate[2] && currentSelectedStep.name !== null) ? parseInt(currentSelectedStep.estimatedDate[2]) : null} onChange={handleStepsEstimatedDuration}
                                                    className="w-20 bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                                            </li>
                                        </ul>

                                    </div>
                                  }
                                    </div>
                                </div>

                                <div className="flex flex-col mb-4">
                                    <h4 className="mb-2">Description</h4>
                                    <form>
                                        <div className="mb-4 w-full bg-gray-100 rounded-lg border border-gray-300 ">
                                            <div className="py-2 px-4 bg-white rounded-b-lg ">
                                                <textarea name="description" id="editor" rows="8" onChange={(e) => { handleStepInputChange(e, currentSelectedStep.index) }}
                                                    className="block px-0 w-full text-sm text-gray-800 bg-white border-0  focus:ring-0" style={{ height: '50px' }}
                                                    placeholder="Enter Description" required value={currentSelectedStep?.description ?? ''} >{currentSelectedStep?.description}</textarea>
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
                            </div>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateProcessTemplates;