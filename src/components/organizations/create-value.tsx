import React from "react";
import Select from 'react-select'
import { gql, useMutation, useQuery, NetworkStatus } from '@apollo/client'
import { getUserId } from "~/services/user.service";


const CreateValue=(props)=>{
  const [errorMsg,setError] = React.useState(false);
    const [orgName, setOrgName] = React.useState('');
    const [vision, setVision] = React.useState('');
    const [option, setOption] = React.useState('');

    const GET_ORG_Value = gql`
    query values($nameFilter: String!) {
        values(input: {filter:{userId:{_eq:$nameFilter}}}) {
          results {_id,values}
        }
    }`;
const { data:data2, error:error2, loading:loading2 } = useQuery(GET_ORG_Value, {
      notifyOnNetworkStatusChange: true,
      variables: { nameFilter: getUserId() },
      onCompleted: (dataValue) => {
          console.log(data2,dataValue,"hiiiiiiii");
          // if(dataValue.value){
          //   setOrgData(dataValue.org.result)
          //   closeSuccessModal();
          // }
        //  setTemplateList(data.p);
        //  console.log(templateList);
      }
  });


    
    const CREATE_VALUE = gql`
    mutation createValue($title: String!, $description: String!,$icon: String!, $userId: String!) {
      createValue(input: {data: {title: $title, description: $description, icon: $icon, userId: $userId}}) {
        data {_id }
      }
    }`;
    let [createValue, {loading, data, error}] = useMutation(
      CREATE_VALUE,{
        onCompleted: (data) => {
          props.addValue({
            title:orgName,
            description:vision,
            icon:option,
            userId: getUserId()

          })
          props.closeModal();
        },
        onError: (error) => console.error("Error creating a post", error),
      }
    );
  
    const createOrg=()=>{
      if(orgName && vision && option){
        setError(false)
        createValue({
          variables:{
            title:orgName,
            description:vision,
            icon:option,
            userId: getUserId()
          } 
        })
      }else{
        setError(true)
      }
     
      
    }
    
    const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]
  const handleChange=(e)=>{
    const value=e.value
    setOption(value)
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
                      <h2 className="text-3xl mb-2">Value</h2>
                    </div>
                    <div className="flex flex-col mb-8">
                      <h4 className="text-lg mb-2">Value Title</h4>
                      <input
                        type="text"
                        id="first_name"
                        
                        value={orgName}
                        onChange={(e)=>setOrgName(e.target.value)}
                        className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="John"
                        required
                      />
                    </div>
                    <div className="flex flex-col mb-8">
                      <h4 className="text-lg mb-2">Value Icon</h4>
                      <Select options={options} 
                      // value={option}
                       onChange={handleChange} 
                      />
                      <p className="text-xs opacity-50 mt-2">
                       Select the approriate icon for the value you want to add
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <h4 className="text-lg mb-2">Description</h4>
                      <textarea
                        id="message"
                        rows={4}
                        value={vision}
                        onChange={(e)=>setVision(e.target.value)}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-md border-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                        placeholder="Description"
                      ></textarea>
                    </div>
                  </div>
                </div>
                {
                  errorMsg? <p style={{color:'red'}}>Please complete the form to proceed</p> : null
                }
                

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