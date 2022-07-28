import React, { useState } from 'react';
import { gql, useMutation, useQuery, NetworkStatus } from '@apollo/client'
import { getUserId } from '~/services/user.service';


const CreateProcessList = (props) => {
    const [processName, setProcessName] = useState('')
    const [user, setUser] = useState(getUserId() || '')
    const [date, setDate] = useState('')
    const [errorMsg,setErrorMsg] = React.useState(false);


    const {closeModal,processItem,userId}=props;
    const CREATE_PROCESS = gql`
          mutation  createProcess($userId:String!,$name: String!, $dueDate: Date!,$parentProcessTemplate:String!) {
            createProcess(input: {data: {userId:$userId ,name: $name,dueDate: $dueDate,parentProcessTemplate:$parentProcessTemplate,progress:0}}) {
              data {_id}
            }
          }`;
    let [createProces, { loading: _loading, data: _data, error: _error }] = useMutation(
        CREATE_PROCESS, {
        onCompleted: (_data) => {
        props.nextProcess();

        },
        onError: (error) => console.error("Error creating a post", error),
    }
    );


    const processCreated = (parentProcessTemplate) => {
        if(processName && getUserId() && date && parentProcessTemplate)
        {   
            setErrorMsg(false);
            createProces({
            variables: {
                name: processName,
                userId: getUserId(),
                dueDate: date,
                parentProcessTemplate:parentProcessTemplate

            }
        })}else{
            setErrorMsg(true);
        }
    }
    return (
        <>
            <div
                id="large-modal"
                className=" overflow-y-auto overflow-x-hidden w-full"
                style={{ zIndex: 1 }}
            >
                <div className="relative p-4 w-full max-w-4xl h-full md:h-auto">
                    <div className="relative bg-white rounded-lg shadow ">
                        <div className="flex justify-between items-center p-5 rounded-t">
                            <h3 className="text-xl font-medium text-gray-900 "></h3>
                        </div>

                        <form action="">
                            <div className="px-6 space-y-6 flex justify-center">
                                <div className="flex flex-col w-1/2 mx-8">
                                    <div className="flex flex-col mb-8">
                                        <h2 className="text-3xl mb-2">Create Process from template - {processItem.name}</h2>
                                    </div>
                                    <div className="flex flex-col mb-8">
                                        <h4 className="text-lg mb-2">Process Title</h4>
                                        <input
                                            type="text"
                                            id="process"
                                            onChange={(e) => setProcessName(e.target.value)}
                                            className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Title of the process"
                                            required
                                        />
                                    </div>

                                    <div className="flex flex-col mb-8">
                                        <h4 className="text-lg mb-2">User</h4>
                                        <input 
                                            type="text"
                                            id="user"
                                            value={user}
                                            onChange={(e) => setUser(e.target.value)}
                                            className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder=""
                                            required

                                        />
                                        <p className="text-xs opacity-50 mt-2">
                                            Default user is populated from the role selected while creating process
                                        </p>
                                    </div>
                                    <div className="flex flex-col mb-8">
                                        <h4 className="text-lg mb-2">Due Date</h4>
                                        <input
                                            type="date"
                                            id="date"
                                            onChange={(e) => setDate(e.target.value)}
                                            className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="John"
                                            required
                                        />
                                        <p className="text-xs opacity-50 mt-2">
                                            Auto calculated if it has estimated duration
                                        </p>
                                    </div>
                                    
                                    {
                  errorMsg? <p style={{color:'red', marginBottom:'25px'}}>Please complete the form to proceed</p> : null
                }
                                </div>
                                
                            </div>
                            <div className="flex items-center space-x-2 rounded-b dark:border-gray-600" style={{ paddingLeft: '235px', marginTop: '-17px' }}>

                                <button
                                    type="button"
                                    onClick={()=>{processCreated(processItem._id)}}
                                    className="text-white bg-gradient-to-r from-kelvinDark  to-kelvinBold hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6"
                                    data-modal-toggle="success-modal"
                                >
                                    Create Process
                                </button>
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="text-black from-kelvinDark to-kelvinBold hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6"
                                    data-modal-toggle="success-modal"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default CreateProcessList;