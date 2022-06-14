import React from "react";

const CreateValue=(props)=>{
    const [depName,setDepName] = React.useState('')
    const createOrg=()=>{
      props.depValue({
        title:depName
      })
      props.closeModal();
    }

    return (
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
              </div>

              <form action="">
                <div className="px-6 space-y-6 flex justify-center">
                  <div className="flex flex-col w-1/2 mx-8">
                    <div className="flex flex-col mb-8">
                      <h2 className="text-3xl mb-2">Department</h2>
                    </div>
                    <div className="flex flex-col mb-8">
                      <h4 className="text-lg mb-2">Department title</h4>
                      <input
                        type="text"
                        id="first_name"
                        onChange={(e)=>setDepName(e.target.value)}
                        className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Department"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center p-6 space-x-2 rounded-b justify-center dark:border-gray-600" style={{paddingLeft:'250px'}}>
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
              </form>
            </div>
          </div>
        </div>
        </>
    )

}
export default CreateValue;