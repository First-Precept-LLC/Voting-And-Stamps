import React from "react";
import Link from 'next/link';
import { routes } from "~/lib/routes";
import CreateValue from "./create-value";
import CreateDepartment from "./create-departments";

const OrganizationDetail = (props) => {
    // console.log(props)
    const { orgData, departments, values, onAddDepartment, onAddValue } = props;
    const [value, setValue] = React.useState(false)
    // const showValueModal=()=>{
    //     setShowValue(!showValue);
    //     console.log("show value------", showValue)
    // }

    return (
        <div className="flex w-full p-8 flex-col">
            <h1 className="text-3xl mb-8">{orgData && (orgData.orgName || orgData.name)}</h1>
            <div className="flex flex-col mb-8">
                <h4 className="mb-1 text-md">Vision</h4>
                <div className="flex bg-kelvinLight p-6 rounded-md w-full">
                    <p className="tet-xl text-center mx-auto">“{orgData && orgData.vision}”</p>
                </div>
            </div>

            <div className="flex flex-col mb-8">
                <div className="flex justify-between items-center">
                    <h4 className="mb-1 text-md">Values</h4>
                    <p className="text-xs opacity-50 font-normal">Values are the guiding principles around how decisions
                        should be made at your company. Learn More</p>
                </div>
                <div
                    className="flex cursor-pointer bg-kelvinLight p-4 rounded-md w-full flex-wrap grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5  items-end">
                    {values?.map(item => (<div className="flex  p-2 " key={item.id}>
                        <div  
                            className="flex tems-center w-full p-4 bg-white shadow shadow-md rounded-md"
                            onClick={() => onAddValue(item)}
                        >
                            {/* <i className={"fa-solid " + item.icon + " text-2xl justify-center rounded-full p-4 bg-kelvinMedium text-white mr-2"}></i> */}
                            <img 
                                src={'data:image/png;base64,' + item.icon} 
                                alt={item.title} 
                                style={{display: 'block', width: '50px', height: '50px', borderRadius: '50%'}}
                            />
                            <div className="flex flex-col items-center">
                                <h4>{item.title}</h4>
                                <p className="text-xs px-4 opacity-50 font-normal text-center">{item.description}</p>
                            </div>
                        </div>
                    </div>))
                    }

                    <button 
                        className="text-white  bg-kelvinMedium hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-md text-sm px-5 py-2 h-8 text-center mr-2 mb-2 hover:bg-kelvinBold"
                        data-modal-toggle="large-modal"
                        onClick={() => onAddValue()} >
                        <i className="fa-solid fa-plus"></i>
                        Add Value </button>
                </div>
            </div>

            {/* <div className="flex flex-col mb-8">
                <h4 className="mb-1 text-md">Skills</h4>
                <div className="flex bg-kelvinLight p-4 rounded-md w-full flex-wrap items-center">
                    {skill.map((item) => {
                        return (<div className="flex px-5 py-2 h-10 text-center mr-2 mb-2 bg-white shadow shadow-md rounded-md">
                            <h4>{item.skill}</h4>
                        </div>)
                    })}

                    <button 
                        className="text-white bg-kelvinMedium hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-md text-sm px-5 py-2 h-8 text-center mr-2 mb-2 hover:bg-kelvinBold"
                        data-modal-toggle="large-modal"
                        onClick={() => props.showSkills()} >
                        <i className="fa-solid fa-plus"></i>
                        Add Skills</button>
                </div>
            </div>
            <div className="flex flex-col mb-8">
                <div className="flex justify-between items-center">
                    <h4 className="mb-1 text-md">Goals</h4>
                    <p className="text-xs opacity-50 font-normal">Goals are objective and measurable outcomes that guide the
                        actions you take at your company. Learn More</p>
                </div>
                <div className="flex bg-kelvinLight p-4 rounded-md w-full flex-wrap">
                    {goal.map(item =>
                    (<div
                        className="flex items-center w-full min-h-8 justify-between px-4 py-1 bg-white shadow shadow-md rounded-md mb-2">
                        <h6 className="mr-2">{item.goal}</h6>
                        <p className="text-sm opacity-50 font-normal">{item.date}</p>
                    </div>))
                    }

                    <button 
                        className="text-white bg-kelvinMedium hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-md text-sm px-5 py-1 min-h-8 text-left w-full mb-2 hover:bg-kelvinBold"
                        data-modal-toggle="large-modal"
                        onClick={() => props.showGoal()} >
                        <i className="fa-solid fa-plus"></i>
                        Add Goal</button>
                </div>
            </div> */}
            <div className="flex flex-col mb-8">
                <div className="flex justify-between items-center">
                    <h4 className="mb-1 text-md">Departments</h4>
                    <p className="text-xs opacity-50 font-normal">Values are the guiding principles around how decisions
                        should be made at your company. Learn More</p>
                </div>
                <div
                    className="flex bg-kelvinLight p-4 rounded-md w-full flex-wrap grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5  items-end">
                    {departments?.map(item => (
                        <Link 
                            href={{
                                pathname: "/department-process",
                                query: {
                                    id: item.id
                                },
                            }}
                            key={item.id}
                        >
                            <div className="flex  p-2">
                                <div
                                    className="flex items-center w-full py-6 justify-center p-4 bg-white shadow shadow-md rounded-md cursor-pointer">
                                    <h4>{item.title || item.name}</h4>
                                </div>
                            </div>
                        </Link>
                    ))}

                    <button 
                        className="text-white  bg-kelvinMedium hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pur w-full py-6ple-300 dark:focus:ring-purple-800 font-medium rounded-md text-sm px-5 py-2 h-8 text-center mr-2 mb-2 hover:bg-kelvinBold"
                        data-modal-toggle="large-modal"
                        onClick={onAddDepartment} >
                        <i className="fa-solid fa-plus"></i>
                        Add department</button>
                </div>
            </div>
        </div>
    )
}

export default OrganizationDetail;