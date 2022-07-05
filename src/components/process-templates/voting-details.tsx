import React, { useState } from 'react'
import { gql, useMutation, useQuery, NetworkStatus } from '@apollo/client'
import { getUserId } from '../../services/user.service';


const VotingDetails = (props) => {
    const {closeModal,votingStepModal,stepName,values} = props
   



    return (
        <>

            <div id="success-modal"
                className=" overflow-y-auto overflow-x-hidden md:inset-0 "
                style={{ zIndex: 1,display: 'flex',justifyContent: 'center' }}
            >
                <div className="relative p-4 w-full max-w-md md:h-auto">

                    <div className="relative bg-white rounded-lg shadow ">

                        <div className="flex justify-between items-center p-5 pb-0 rounded-t">
                            <h3 className="text-xl font-medium text-gray-900 text-center">

                            </h3>
                            <button type="button"
                                onClick={closeModal}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-toggle="large-modal">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clip-rule="evenodd"></path>
                                </svg>
                            </button>
                        </div>



                        <div className="flex flex-col ">
        <div className="flex px-10 mt-10 mb-4 items-center">
                        <h1 className="text-3xl font-medium">Voting for Step - {stepName}<span className="hidden text-kelvinDark">Start
                    Research</span></h1>
        </div>
        {/* <!-- cards --> */}
        <div className="flex flex-col">
            {/* <!-- card --> */}
            <div className="flex flex-col border-b border-kelvinMedium py-4 px-10 my-4">
                <div className="flex flex-col mb-2">
                    <h3 className="text-kelvinDark font-medium text-xl">{stepName}</h3>
                    <p>Rates Highly in Power</p>
                </div>
                
                <div className="flex flex-wrap px-4 py-6 bg-kelvinLight rounded-md justify-start mb-4">
                    
                {values.map((item)=>{
                    return(
                        <div onClick={()=>{votingStepModal(item.title)}}   
                        className="flex shadow shadow-md rounded-md py-2 px-4 mx-2 my-2 items-center">
                        <i className="fa-solid text-kelvinDark mr-2 fa-circle"></i>
                        <p className="">{item.title}</p>
                    </div>
                    )    
                })}
                </div>
                <div className="flex">
                    <button type="button"
                    onClick={()=>{votingStepModal()}}                    
                        className="text-white bg-gradient-to-r from-kelvinDark  to-kelvinBold hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Rate
                        this content</button>
                </div>
            </div>
         
        </div>
    </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default VotingDetails;