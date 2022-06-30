import Select from 'react-select';
import React, { useState } from 'react';

const CreateGoal=(props)=>{
  
    
    const [orgName, setOrgName] = React.useState('');
    const [depName, setDepName] = React.useState('');
    const [process, setProcess] = React.useState('');
    const [metricName, setMetricName] = React.useState('');
    const [goalName, setgoalName] = React.useState('');
    const [goalDate, setgoalDate] = React.useState('');
   
    const createOrg=()=>{
      console.log(orgName,depName,process,metricName,goalName,goalDate)
        props.createValue({
            name:orgName,
            department:depName,
            process:process,
            metric:metricName,
            goal:goalName,
            date:goalDate
        })
        props.closeModal();
    }
    const [fields, setFields] = React.useState([{ metric: metricName }]);
    const orgHandleChange=(e)=>{
      const value=e.value
      setOrgName(value)
    }
    const depHandleChange=(e)=>{
      const value=e.value
      setDepName(value)
    }
    const processHandler=(e)=>{
      const value = e.value
      setProcess(value)
    }
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]
   
    const handleChange=(i, event)=>{
      const values = [...fields];
      console.log(values)
      values[i].metric = event.target.value;
      setFields(values);  
    }
  
    const handleAdd=()=>{
      const values = [...fields];
      console.log(values)
      values.push({ metric: metricName });
      setFields(values);  
    }

    // const handleRemove=(i) =>{
    //   const values = [...fields];
    //   values.splice(i, 1);
    //   setFields(values);
    // }
    
    return (
        <>
        <div
          id="large-modal"
          className=" overflow-y-auto overflow-x-hidden w-full"
          style={{zIndex:1}}
        >
          <div className="relative w-full max-w-4xl h-full md:h-auto" style={{padding:'0px 110px 0px 110px'}}>
            <div className="relative bg-white rounded-lg shadow ">
              <div className="flex justify-between items-center p-5 rounded-t">
                <h3 className="text-xl font-medium text-gray-900 "></h3>
              </div>

              <form action="">
                <div className="px-6 space-y-6 flex justify-center w-full">
                  <div className="flex flex-col w-1/2 mx-8">
                    <div className="flex flex-col mb-8">
                      <h2 className="text-3xl mb-2">Create Goal</h2>
                    </div>
                    <div className="flex flex-col mb-8">
                      <h4 className="text-lg mb-2">Organization</h4>
                      <Select options={options} 
                      onChange={orgHandleChange}
                      placeholder="Tesla inc" />
                    </div>
                    <div className="flex flex-col mb-8">
                      <h4 className="text-lg mb-2">Department</h4>
                      <Select options={options} 
                      onChange={depHandleChange}
                      placeholder="R&D"/>
                    </div>
                    <div className="flex flex-col mb-8">
                      <h4 className="text-lg mb-2">Process</h4>
                      <Select options={options}
                      onChange={processHandler}
                      placeholder="none"/>
                    </div>
                    <div className="flex flex-col mb-8">
                      <h4 className="text-lg mb-2">Goal</h4>
                      <input
                        type="text"
                        id="first_name"
                        onChange={e=>setgoalName(e.target.value)}
                        className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Reach $1Trillion revenue mark"
                        required
                      />
                      <p className="text-xs opacity-50 mt-2">
                        This is the goal for your Department
                      </p>
                    </div>
                    <div className="flex flex-col mb-8">
                      <h4 className="text-lg mb-2">Goal date</h4>
                      <input
                        type="date"
                        id="first_name"
                        onChange={e=>setgoalDate(e.target.value)}
                        className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Reach $1Trillion revenue mark"
                        required
                      />
                      <p className="text-xs opacity-50 mt-2">
                        This is the goal for your Department
                      </p>
                    </div>
                    <div className="flex flex-col mb-8">
                      <h4 className="text-lg mb-2">Metric Name</h4>
                    
                      {fields.map((field, idx) => {
                    return (
                      <>
                      <input
                        type="text" key={`${field}-${idx}`}
                        id="first_name"
                        onChange={e=>setMetricName(e.target.value)}
                        className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-2"
                        placeholder="Enter Name"
                        required
                      />
                      {/* <span><button type="button" onClick={()=>handleRemove(idx)}>Remove</button></span> */}
                      </>
                      );
                    })}
                        <button type="button" onClick={() => handleAdd()}
                       className="border-2 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"style={{background:'#9d9ff2',padding:'0px'}}
                      >
                      +Add Metric Name
                      </button>
                    </div>
                      
                <div className="flex items-center p-6 space-x-2 rounded-b justify-center  dark:border-gray-600"style={{paddingLeft:'170px'}}>
                  <button
                    type="button"
                    onClick={props.closeModal}
                    className="text-black from-kelvinDark  to-kelvinBold hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6"
                    data-modal-toggle="success-modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={createOrg}
                    className="text-white bg-gradient-to-r from-kelvinDark  to-kelvinBold hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6"
                    data-modal-toggle="success-modal"
                  >
                    Create 
                  </button>
                </div>
                  </div>
                </div>

              </form>
            </div>
          </div>
        </div>
        </>
    )
}
export default CreateGoal;