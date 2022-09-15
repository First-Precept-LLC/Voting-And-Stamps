import React, { useState } from "react";
import { getUserId } from "~/services/user.service";


const CreateValue = ({ onCloseModal, onCreateValue, organizations }) => {
  const [errorMsg, setError] = React.useState(false);
  const [state, setState] = useState({
    title: '',
    icon: '',
    description: '',
    votes: 0
  })


  const handleCreateValue = () => {
    onCloseModal();
    onCreateValue({
      ...state,
      orgId: organizations?.id,
      userId: getUserId()
    });
  }


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState(copyState => ({
      ...copyState,
      [name]: value
    }))
  }

  const handleFileChange = (event) => {
    try {
      const file = event.target.files[0]
      const reader = new FileReader();
      reader.onload = (fileEvent: any) => {
        setState(copyState => ({
          ...copyState,
          icon: fileEvent.target.result.split('base64,')[1]
        }))
      }
      reader.onerror = () => {
        setState(copyState => ({
          ...copyState,
          icon: ""
        }))
      }
      reader.readAsDataURL(file)
    } catch (err) {
      setState(copyState => ({
        ...copyState,
        icon: ""
      }))
    }
  }

  const { title, icon, description, votes } = state;

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
                    <h2 className="text-3xl mb-2">Value</h2>
                  </div>
                  <div className="flex flex-col mb-8">
                    <h4 className="text-lg mb-2">Value Title</h4>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={title}
                      onChange={handleInputChange}
                      className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="John"
                      required
                    />
                  </div>
                  <div className="flex flex-col mb-8">
                    <h4 className="text-lg mb-2">Value Icon</h4>
                    {/* <Select options={options} 
                      name="icon"
                      // value={option}
                       onChange={handleInputChange} 
                      /> */}
                    <input
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-kelvinBold dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      aria-describedby="user_avatar_help" id="user_avatar" type="file"
                      onChange={handleFileChange}
                    />
                    <p className="text-xs opacity-50 mt-2">
                      Select the approriate icon for the value you want to add
                    </p>
                  </div>
                  <div className="flex flex-col mb-8">
                    <h4 className="text-lg mb-2">Value Votes</h4>
                    <input
                      type="number"
                      id="votes"
                      name="votes"
                      value={votes}
                      onChange={handleInputChange}
                      className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="Votes"
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-lg mb-2">Description</h4>
                    <textarea
                      id="description"
                      rows={4}
                      name="description"
                      value={description}
                      onChange={handleInputChange}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-md border-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                      placeholder="Description"
                    ></textarea>
                  </div>
                </div>
              </div>
              {
                errorMsg ? <p style={{ color: 'red' }}>Please complete the form to proceed</p> : null
              }


              <div className="flex items-center p-6 space-x-2 rounded-b justify-center dark:border-gray-600" style={{ paddingLeft: '250px' }}>
                <button
                  type="button"
                  onClick={onCloseModal}
                  className="text-black from-kelvinDark  to-kelvinBold hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6"
                  data-modal-toggle="success-modal"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleCreateValue}
                  disabled={!title || !icon || !description}
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