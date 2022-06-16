// import React, { Component, PropTypes } from 'react';
// import RichTextEditor from 'react-rte';

import { Props } from "@storybook/addon-docs";

function ProcessTemplates() {
    const [fields, setFields] = React.useState([{ step: '' }]);
    const [project, setProject] = React.useState('')
    const [proName, setProName] = React.useState('')
    const [estDuration, setestDuration] = React.useState('')
    const [desc, setDesc] = React.useState('')
    const [step,setStep] = React.useState('')
    const [stepTitle,setStepTitle] = React.useState('')
    const [text,setText] = React.useState('')
    const [array,setArray] = React.useState([])
    const [lists,setLists] = React.useState([])

    const  CreatePage = () =>{
        // setArray([{
        //     project:project,
        //     name:proName,
        //     duration:estDuration,
        //     description:desc,
        //     step:step,
        //     title:stepTitle,
        //     textDescription:text
    
        // }])
        // console.clear() 
        // console.log(array)  
        console.log({
            project:project,
            name:proName,
            duration:estDuration,
            description:desc,
            step:step,
            title:stepTitle,
            textDescription:text
    
        })
    }

    // const handleChange=(i, event)=>{
    //     const values = [];
    //     console.log(i)
    //     values[i].step = event.target.value;
    //     setLists(values);  
    // }


    const handleAdd = () => {
        const values = [...fields];
        values.push({ step: step });
        setFields(values);
    }
    console.log(fields)

    // const handleSubmit=()=>{
    //     const list = lists
    //     list.push(step)
    //     setLists(list)
    // } 
    // console.log(lists)
    
    return(
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
            <div className="flex flex-row">
                <div className="flex flex-col justify-between min-h-full w-64 p-8 bg-kelvinLight shadow shadow-md">
                    <div className="flex flex-col">
                        <div className="flex flex-col">
                            <a href="#" className="text-kelvinDark mb-3"><i className="fa-solid  fa-chart-simple mr-1"></i> Process
                                Templates</a>
                            <a href="#" className="text-kelvinDark mb-3"><i className="fa-solid  fa-chart-simple mr-1"></i>
                                Processes</a>
                        </div>
                        <hr className="my-10" />
                        <div className="flex flex-col">
                            <a href="/organizations" className="text-kelvinDark mb-3"><i className="fa-solid  fa-chart-simple mr-1"></i>
                                Organizations</a>
                            <a href="/department" className="text-kelvinDark mb-3"><i className="fa-solid  fa-chart-simple mr-1"></i>
                                Departments</a>
                            <a href="#" className="text-kelvinDark mb-3"><i className="fa-solid  fa-chart-simple mr-1"></i> Roles</a>
                            <a href="#" className="text-kelvinDark mb-3"><i className="fa-solid  fa-chart-simple mr-1"></i> Users</a>
                        </div>
                    </div>
                    <div className="flex mt-10 text-center text-sm text-kelvinBlack opacity-50">
                        <p className="font-normal">You're in a company-managed project. <br /><a href=""
                            className="font-medium  hover:text-kelvinBold">Learn More</a>
                        </p>
                    </div>
                </div>


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
                                <select id="countries" onChange={(e)=>setProject(e.target.value)} 
                                    className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                    <option selected="">Select Department</option>
                                    <option value="US">HR</option>
                                    <option value="CA">HR</option>
                                    <option value="FR">HR</option>
                                    <option value="DE">HR</option>
                                </select>

                            </div>
                            <div className="flex flex-col mb-8">
                                <h4 className="text-xs font-bold mb-2">Process Name</h4>
                                <input type="text" id="processname" onChange={(e)=>setProName(e.target.value)}
                                    className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder="Enter process name" required />
                            </div>
                            <div className="flex flex-col mb-8">
                                <h4 className="text-xs font-bold mb-2">Estimated Duration</h4>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="kelvinBold"
                                            viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd"
                                                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                                clip-rule="evenodd"></path>
                                        </svg>
                                    </div>
                                    <input id="dropdownDividerButton" onChange={(e)=>setestDuration(e.target.value)}
                                    data-dropdown-toggle="dropdownDivider" type="date"
                                        className="bg-white border-2 border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  datepicker-input"
                                        placeholder="Estimated Duration" readonly />
                                </div>
                            </div>

                            <div id="dropdownDivider"
                                className="z-10 hidden p-4 bg-kelvinLight divide-y divide-gray-100 rounded rounded-lg shadow w-80 "
                                data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="top">
                                style="position: absolute;inset: auto auto 0px 0px; margin: 0px; transform: translate3d(352.5px, 19px, 0px);
                                <div className="py-1">
                                    <a href="#"
                                        className="block px-4 py-2 text-xs text-center text-gray-700 hover:bg-gray-100">Dynamic
                                        Estimated Duration</a>
                                </div>
                                <ul className="py-1 flex text-sm text-gray-700 dark:text-gray-200 justify-between"
                                    aria-labelledby="dropdownDividerButton">
                                    <li className="">
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 text-kelvinDark">Days</a>
                                        <input type="number" name="" id="" 
                                            className="w-20 bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 text-kelvinDark  ">Hours</a>
                                        <input type="number" name="" id=""
                                            className="w-20 bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 text-kelvinDark  ">Minutes</a>
                                        <input type="number" name="" id=""
                                            className="w-20 bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                                    </li>
                                </ul>

                            </div>

                        </div>
                        <div className="flex flex-col mb-4">
                            <h4 className="text-xs font-bold mb-2">Description</h4>
                            <textarea id="message" rows="4" onChange={(e)=>setDesc(e.target.value)}
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
                                    fields.map((item,index)=>{
                                        return (
<div
                                className="flex items-center w-full min-h-8 justify-between pl-4 py-1 bg-white shadow shadow-md rounded-md mb-2 flex-wrap">
                                {/* <h6 class="mr-2">Reach $1Trillion revenue mark</h6> */}
                                <input style={{border:0}} type='text' onChange={(e)=>setStep(e.target.value)}/>
                                <button className="px-4">
                                    <i className="fa-solid fa-ellipsis-vertical"></i>
                                </button>
                            </div>
                                        )
                                    })
                                }
                            
                            <button onClick={() => handleAdd()}  type="button"
                                class="text-white bg-kelvinMedium hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-md text-sm px-5 py- h-8 text-left w-full mb-2 hover:bg-kelvinBold"
                                data-modal-toggle="large-modal">
                                <i class="fa-solid fa-plus"></i>
                                Add Task
                            </button>
                        </div>
                                {/* <div className="flex flex-col w-full">
                                    {fields.map((field, idx) => {
                                        return (
                                            <>
                                                <i className="fa-solid fa-chevron-down" style={{ paddingRight: '90%', marginBottom: '-20px', zIndex: 9, fontSize: 'x-small' }}></i>
                                                
                                                    <h6 style={{ marginLeft: '30px' }}>Start Research</h6>
                                                    <button className="px-4" onChange={(e)=>setStep(e.target.value)}>
                                                        <i className="fa-solid fa-ellipsis-vertical"></i>
                                                    </button>  
                                            </>
                                           
                                        );
                                    })}
                                    <button type="button" className="bg-white border-2 border-gray-300 text-gray-900 rounded-md" onClick={() => handleAdd()}
                                        style={{width:'30%',marginLeft:'3px',marginTop:'2px'}}>Submit</button>
                                   
                                    <button type="button" onClick={() => handleAdd()}
                                        className="text-white bg-kelvinMedium hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-md text-sm px-5 py- h-8 text-left w-full mb-2 hover:bg-kelvinBold mt-1"
                                        data-modal-toggle="large-modal">
                                        <i className="fa-solid fa-plus"></i>
                                        Add Task</button>
                                </div> */}
                            </div>
                            <div className="flex flex-col bg-kelvinLight p-4">
                                <h5 className="text-xl mb-4">Step Title</h5>
                                <div className="flex flex-col mb-8">
                                    <h4 className="mb-2">Estimated Duration</h4>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="kelvinBold"
                                                viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd"
                                                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                                    clip-rule="evenodd"></path>
                                            </svg>
                                        </div>
                                        <input id="dropdownDividerButton" data-dropdown-toggle="dropdownDivider" type="date" onChange={(e)=>setStepTitle(e.target.value)}
                                            className="bg-white border-2 border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  datepicker-input"
                                            placeholder="Estimated Duration" readonly />
                                    </div>
                                </div>

                                <div id="dropdownDivider"
                                    className="z-10 hidden p-4 bg-kelvinLight divide-y divide-gray-100 rounded rounded-lg shadow w-80 "
                                    data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="top"
                                    style={{ position: "absolute", inset: "auto auto 0px 0px", margin: "0px", transform: "translate3d(352.5px, 19px, 0px)" }}>
                                    <div className="py-1">
                                        <a href="#"
                                            className="block px-4 py-2 text-xs text-center text-gray-700 hover:bg-gray-100">Dynamic
                                            Estimated Duration</a>
                                    </div>

                                    <ul className="py-1 flex text-sm text-gray-700 dark:text-gray-200 justify-between"
                                        aria-labelledby="dropdownDividerButton">
                                        <li className="">
                                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 text-kelvinDark">Days</a>
                                            <input type="number" name="" id=""
                                                className="w-20 bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 text-kelvinDark  ">Hours</a>
                                            <input type="number" name="" id=""
                                                className="w-20 bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 text-kelvinDark  ">Minutes</a>
                                            <input type="number" name="" id=""
                                                className="w-20 bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                                        </li>
                                    </ul>
                                </div>
                                <div className="flex flex-col mb-4">
                                    <h4 className="mb-2">Description</h4>
                                    <form>
                                        <div className="mb-4 w-full bg-gray-100 rounded-lg border border-gray-300 ">
                                            <div className="py-2 px-4 bg-white rounded-b-lg ">
                                                <textarea id="editor" rows="8" onChange={(e)=>setText(e.target.value)}
                                                    className="block px-0 w-full text-sm text-gray-800 bg-white border-0  focus:ring-0" style={{ height: '50px' }}
                                                    placeholder="Enter Description" required=""></textarea>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProcessTemplates;