import React from "react";
import CreateValue from "./create-value";

const CreateOrganization=(props)=>{

    const [orgName, setOrgName] = React.useState('');
    const [vision, setVision] = React.useState('');
    const [create,setCreate] = React.useState(false);
    const closeModal=()=>{
        console.log(1)
        props.setShowCreateModal(false);
    }
    const createOrg=()=>{
      console.log(orgName,vision)
        props.createOrg({
            orgName,
            vision
        })
        setCreate(true);
    }
    return (
        <>
     
        <div
          id="large-modal"
          className=" overflow-y-auto overflow-x-hidden w-full"
          style={{zIndex:1,display:'flex',justifyContent:'center'}}
        >
          <div className="relative p-4 w-full max-w-xl h-full md:h-auto">
            <div className="relative bg-white rounded-lg shadow ">
              <div className="flex justify-between items-center p-5 rounded-t">
                <h3 className="text-xl font-medium text-gray-900 "></h3>
                <button
                  type="button"
                  onClick={closeModal}
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
                <div className="px-6 space-y-6 flex">
                  <div className="flex flex-col w-1/2 mx-8">
                    <div className="flex flex-col mb-8">
                      <h2 className="text-3xl mb-2">Let's build an Organization</h2>
                      <p className="text-sm opacity-50 ">
                        Create a new organization to start plan, track your
                        progress with your team
                      </p>
                    </div>
                    <div className="flex flex-col mb-8">
                      <h4 className="text-lg mb-2">Organization Name</h4>
                      <input
                        type="text"
                        id="first_name"
                        onChange={e=>setOrgName(e.target.value)}
                        className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="John"
                        required
                      />
                      <p className="text-xs opacity-50 mt-2">
                        This is the name of your company or organization
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <h4 className="text-lg mb-2">Organization Vision</h4>
                      <textarea
                        id="message"
                        rows={4}
                        onChange={e=>setVision(e.target.value)}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-md border-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                        placeholder="Your vision..."
                      ></textarea>
                      <p className="text-xs opacity-50 mt-2">
                        This is the vision statement of your organization
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <img src="/img/org-create.svg" alt="" />
                  </div>
                </div>

                <div className="flex items-center p-6 space-x-2 rounded-b justify-center  dark:border-gray-600">
                  <button
                    type="button"
                    onClick={createOrg}
                    className="text-white bg-gradient-to-r from-kelvinDark  to-kelvinBold hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6"
                    data-modal-toggle="success-modal"
                  >
                    Create Organization
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        </>
    )
}
export default CreateOrganization;