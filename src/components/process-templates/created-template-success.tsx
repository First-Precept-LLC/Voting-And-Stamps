import Link from 'next/link';
import React from 'react';

const CreatedTemplateSuccess=(props)=>{
   
    const {closeModal,createdModal} = props;
   
   return (
       <>
       <div id="success-modal" 
           className=" overflow-y-auto overflow-x-hidden md:inset-0 "
           style={{zIndex:1, display: 'inline-grid', justifyContent: 'center'}}
           >
           <div className="relative p-4 w-full max-w-xl md:h-auto">
               
               <div className="relative bg-white rounded-lg shadow ">
                   
                   <div className="flex justify-between items-center p-5 rounded-t">
                       <h3 className="text-xl font-medium text-gray-900 text-center">    
                       </h3>
                       <button type="button"
                    //    onClick={closeModal}
                    onClick={createdModal}

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
                   
                   <div className="px-6 space-y-6 flex">
                       <div className="flex flex-col  mx-8 items-center text-center">
                           <div className="flex flex-col mb-8">
                               <h2 className="text-3xl mb-2">Processes created from template Successfully!</h2>
                           </div>
                           <div className="flex items-center justify-center">
                               <img src="/img/process-success.svg" alt=""/>
                           </div>
                       </div>
                   </div>
                  
                   <div className="flex items-center p-6 space-x-2 rounded-b justify-center  dark:border-gray-600">
                      <Link href='/process-list'>
                       <button type="button"
                           
                           className="text-white bg-gradient-to-r from-kelvinDark  to-kelvinBold hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6"
                           data-modal-toggle="large-modal">View Process List</button>
                           </Link>
                   </div>
               </div>
           </div>
       </div>
       </>
   )
}

export default CreatedTemplateSuccess;