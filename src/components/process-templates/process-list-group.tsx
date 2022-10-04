import React from 'react'
import { useState } from 'react'
const ProcessListGroup = (props) => {
    const {ontrackModal,
        processListData,
        setProcessListData
    } =props
    
    
    
         
     const deletePopupHandler=(id)=>{
        
        let arr=[...processListData];
        arr.forEach(element => {
            if(element.id==id){
                if(element.deletePopup==true){
                    element.deletePopup=false;
                }else{
                    element.deletePopup=true;
                }
             }
            else{
                element.deletePopup=false;
              }
            
          });
          setProcessListData(arr);

     }
     
     const deleteHandler=(id)=>{
        let arr=[...processListData];
        let index = arr.findIndex(object => {
                return object.id == id;
              });
              console.log(index);
              arr.splice(index,1);
              setProcessListData([...arr]);
     }
    return (
        <>
            <div className="flex w-full p-8 flex-col">
                <div className="flex justify-between">
                    <h1 className="text-3xl mb-8">Processes List</h1>
                    <div className="flex">
                        <input type="text" id="search-process-template"
                            className="block p-2 px-5  h-8  w-44 text-gray-900 bg-white rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 mr-2"
                            placeholder="Search..." />
                        {/* <button
                            className="bg-kelvinMedium hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-md text-sm px-5  h-8 text-left mb-2 hover:bg-kelvinBold"
                            id="dropdownDefault" data-dropdown-toggle="dropdown">
                            <i className="fa-solid fa-sort"></i>
                            Filters</button> */}
                    </div>
                </div>
                {/* <!-- Process section --> */}
                <div className="flex flex-col mb-8">
                <div className="flex  py-1 pl-4 w-full items-center justify-between">
                    <h4 className="mb-1 mr-5 text-md">Process
                    </h4>
                    <h4 className="mb-1 mx-5 text-md">Process Template
                    </h4>
                    <h4 className="mb-1 mx-5 text-md">Due by
                    </h4>
                    <h4 className="mb-1 mx-5 text-md">Assignees
                    </h4>
                    <h4 className="mb-1  text-md">Progress
                    </h4>
                </div>
                 
                
                <div className="flex bg-kelvinLight p-4 rounded-md w-full flex-wrap">
                    {processListData.map(item=>{
                        return(
                            <>
                                     <div key={item.id}
                        className="flex items-center w-full min-h-8 justify-between pl-4 py-1 bg-white shadow shadow-md rounded-md mb-2 ">
                        <h6 className="mr-2 "> {item.process}</h6>
                        <h6 className="mr-2 text-black/50">{item.processTemplate}</h6>
                        <p className="text-sm opacity-50 mr-2 font-normal">{item.dueBy}</p>
                        <p className="text-sm opacity-50 mr-2 font-normal">{item.assignees}</p>
                        <div className="flex flex-col">
                            <div className="mb-1 text-xs text-black/50"style={{textAlign:'center'}}>{item.percent}</div>
                            <div className="w-32 bg-gray-400 rounded-full h-1.5">
                                <div className=" h-1.5 rounded-full " style={{width: `${item.percent}`,background:"#6cef6c"}}></div>
                            </div>
                        </div>
                        <div className="flex">
                            <button 
                            onClick={()=>{ontrackModal(item.id)}}
                            className=" bg-kelvinMedium hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-md text-sm px-2  h-6 text-left mr-2 w-24 text-center "
                                data-modal-toggle="large-modal">
                                On Track</button>
                           <p style={{lineHeight:'10px',textAlign:'center'}}><span style={{fontSize:'20px'}} >{item.votes}</span><br/><span style={{fontSize:'10px'}}>Votes</span></p>
                            <a href="#" className=" px-4 hover:bg-kelvinLight rounded-full" onClick={()=>{deletePopupHandler(item.id)}}>
                                <i className="fa-solid fa-ellipsis-vertical text-xl"></i>
                            </a>
                            {item.deletePopup?<button onClick={()=>{deleteHandler(item.id)}}>delete</button>:null}
                        </div>
                    </div>
                            </>
                        )
                    })}
                   
                </div>
            </div>
               
            </div>
        </>
    )
}
export default ProcessListGroup;