import React, { useState } from 'react';

const CreateSkills=(props)=>{
  
  const createManage=(value)=>{
    console.log(value);
     props.skills({
      skill:value
     })
     props.closeModal();
  }
    return(
        <>
        <div
          id="large-modal"
          className=" overflow-y-auto overflow-x-hidden w-full"
          style={{zIndex:1}}
        >
          <div className="relative p-4 w-full max-w-4xl h-full md:h-auto">
            <div className="relative bg-white rounded-lg shadow ">
              <div className="flex justify-between items-center p-5 rounded-t">
                <h3 className="text-xl font-medium text-gray-900 "></h3>
                <button
                  type="button"
                   onClick={props.closeModal}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-toggle="large-modal"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
              <form action="">
                <div className="px-6 flex justify-center"style={{height:'200px'}}>
                  <div className="flex flex-col mx-8">
                    <div className="flex flex-col">
                      <h2 className="mb-2" style={{color:'#0707ae'}}>Skills</h2>
                    </div>
                    <div className="flex flex-col ml-5" style={{background:'#d3bdf81f', width: '100%',height: '150px',
                        padding: '10px 26px 4px 15px'}}>
                      <h4 className="text-lg mb-2 relative bg-white rounded-lg shadow"style={{width:'100%',textAlign:'center'}}
                       onClick={()=>createManage('Management')}>
                        Management
                      </h4>
                      <h4 className="text-lg mb-2 relative bg-white rounded-lg shadow"style={{width:'100%',textAlign:'center'}}
                      onClick={()=>createManage('Designing')}>
                        Designing
                      </h4>
                      <h4 className="text-lg mb-2 relative bg-white rounded-lg shadow"style={{width:'100%',textAlign:'center'}}
                      onClick={()=>createManage('Problem Solving')}>
                        Problem Solving
                      </h4>
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
export default CreateSkills;