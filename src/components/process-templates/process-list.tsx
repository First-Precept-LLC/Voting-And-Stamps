import React from 'react';
import { useState } from 'react';
import { gql, useMutation, useQuery, NetworkStatus } from '@apollo/client'

const ProcessList = (props) => {
    const {createList} = props;
    const [templateList,setTemplateList]=useState([
        {processTemplate:'Start research development',department:'R&D',id:'1',deletePopup:false},
        {processTemplate:'Submiting Designs',department:'R&D',id:'2',deletePopup:false}])

        const GET_PROCESS = gql`
        query process($nameFilter: String!) {
            process(input: {filter:{name:{_neq:$nameFilter}}}) {
              result {_id,name}
            }
        }`;
        const { data, error, loading } = useQuery(GET_PROCESS, {
            notifyOnNetworkStatusChange: true,
            variables: { nameFilter: "''" },
            onCompleted: (dataValue) => {
                console.log(data.process.result);
              //  setTemplateList(data.p);
              //  console.log(templateList);
            }
        });


        const deletePopupHandler=(id)=>{
        
            let arr=[...templateList];
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
              setTemplateList(arr);
    
         }
         
         const deleteHandler=(id)=>{
            let arr=[...templateList];
            let index = arr.findIndex(object => {
                    return object.id == id;
                  });
                  console.log(index);
                  arr.splice(index,1);
                  setTemplateList([...arr]);
         }

    return (
        <>
            <div className="flex w-full flex-col">
                <div className="flex justify-between">
                    <h1 className="text-3xl mb-8">Process Template List</h1>
                    <div className="flex">
                        <input type="text" id="search-process-template"
                            className="block p-2 px-5  h-8  w-44 text-gray-900 bg-white rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 mr-2"
                            placeholder="Search..." />
                        <button
                            className="text-white  bg-kelvinMedium hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-md text-sm px-5  h-8 text-left mb-2 hover:bg-kelvinBold"
                            id="dropdownDefault" data-dropdown-toggle="dropdown">
                            <i className="fa-solid fa-sort"></i>
                            Filters</button>
                    </div>
                </div>
                {/* <!-- Process section --> */}
                <div className="flex flex-col mb-8">
                    <div className="flex  items-center">
                        <h4 className="text-kelvinDark mb-1 text-md">Process Template
                        </h4>
                        <h4 className="text-kelvinDark mb-1 text-md" style={{ marginLeft: '190px' }}>Department
                        </h4>
                    </div>
                    <div className="flex bg-kelvinLight p-4 rounded-md w-full flex-wrap">
                        {templateList.map(item=>{
                            return(
                                <div
                                className="flex items-center w-full min-h-8 justify-between pl-4 py-1 bg-white shadow shadow-md rounded-md mb-2 ">
                                <h6 className="mr-2 w-1/2">{item.processTemplate}</h6>
                                <p className="text-sm opacity-50 mr-2 font-normal w-32" style={{ marginRight: '37%' }}>{item.department}</p>
                                <div className="flex items-center">
                                    <button onClick={createList}
                                        className="text-white bg-kelvinBold hover:bg-kelvinDark font-medium rounded-md text-sm px-5 py- h-6 text-left w-44 text-center items-center mr-2"
                                        data-modal-toggle="large-modal">
                                        <i className="fa-solid fa-play text-white mt-1 mr-1 text-xs"></i>
                                        Create Processes</button>
                                    <button onClick={()=>{console.log(item.id)}}
                                        className="text-white bg-kelvinMedium hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-md text-sm px-5 py- h-6 text-left w-20 text-center "
                                        data-modal-toggle="large-modal">
                                        Edit</button>
                                    <a href="#" className=" px-4 hover:bg-kelvinLight rounded-full" onClick={()=>{deletePopupHandler(item.id)}}>
                                        <i className="fa-solid fa-ellipsis-vertical mt-1 text-xl"></i>
                                        
                                    </a>
                                    {item.deletePopup?<button onClick={()=>{deleteHandler(item.id)}}>delete</button>:null}
                                </div>
                            </div>
                            )
                        })
                        }
                        

                        {/* <div
                            className="flex items-center w-full min-h-8 justify-between pl-4 py-1 bg-white shadow shadow-md rounded-md mb-2">
                            <h6 className="mr-2 w-1/2">Submiting Designs</h6>
                            <p className="text-sm opacity-50 mr-2 font-normal w-32" style={{ marginRight: '37%' }}>R&D</p>
                            <div className="flex items-center">
                                <button onClick={createList}
                                    className="text-white bg-kelvinMedium hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-md text-sm px-5 py- h-6 text-left w-44 text-center items-center mr-2"
                                    data-modal-toggle="large-modal">
                                    <i className="fa-solid fa-play text-white mt-1 mr-1 text-xs"></i>
                                    Create Processes
                                </button>
                                <button onClick={createList}
                                    className="text-white bg-kelvinMedium hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-md text-sm px-5 py- h-6 text-left w-20 text-center "
                                    data-modal-toggle="large-modal">
                                    Edit</button>
                                <a href="#" className=" px-4 hover:bg-kelvinLight rounded-full">
                                    <i className="fa-solid fa-ellipsis-vertical mt-1 text-xl"></i>
                                </a>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}
export default ProcessList;