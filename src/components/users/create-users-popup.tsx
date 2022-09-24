import React, { useEffect, useState } from 'react';
import { gql, useMutation, useQuery, NetworkStatus } from '@apollo/client'


const CreateUserPopup = (props) => {
    const [ state, setState ] = useState({
        name: '',
        levelUp: '',
        role: '',
        department: {} as any
    });

    const { 
        users, 
        setUsers, 
        addUser, 
        setAddUser, 
        onCloseModal, 
        organizations, 
        onCreateUsers,
        isEditMode,
        selectedUser,
        onEditUsers
    } = props;

    useEffect(() => {
        if (isEditMode && selectedUser) {
            setState(selectedUser);
        }
    }, [isEditMode, selectedUser])
   
    // const CREATE_PUSERS = gql`
    // mutation createProj($name: String!, $levelUp: String!, $department: String!) {
    //   createPusers(input: {data: {name: $name, levelUp: $levelUp, department: $department}}) {
    //     data {_id, name,role }
    //   }
    // }`;
    // let [createPUsersData, {loading, data, error}] = useMutation(
    //     CREATE_PUSERS,{
    //       onCompleted: (data) => {
    //         props.addValue({
    //             name:addUser.name,
    //             // role:addUser.role,
    //             levelUp:addUser.levelUp,
    //             department:addUser.department
    //           })
    //         props.closeModal();
    //       },
    //       onError: (error) => console.error("Error creating a post", error),
    //     }
    //   );


    // const createHandler=()=>{
    //     let arr=[...users]
    //     arr.push(addUser);
    //     console.log(arr);
    //     setUsers([...arr]);
    //     createPUsersData({variables:{'name':addUser.name,'levelUp': addUser.levelUp,'department':addUser.department}});
    //     onCloseModal(false);
    // }

    const handleCreateUsers = () => {
        console.log(state, 'ff', organizations)
        if (organizations && !isEditMode) {
            onCreateUsers({
                ...state,
                orgId: organizations.id
            });
        } else if (isEditMode) {
            onEditUsers({
                ...state
            });
        }
        onCloseModal();
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'department') {
            const findDepartment = props.departments?.find(dep => dep.id === value);
            setState(state => ({
                ...state,
                [name]: findDepartment ?? {}
            }))
            return;
        }
        setState(copyState => ({
            ...copyState,
            [name]: value
        }))
    }

    const {
        role,
        name,
        department,
        levelUp
    } = state;

    const labelText = isEditMode ? 'Update' : 'Create';

    return (
        <>
            <div id="user-modal" tabIndex={-1}
                className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full" style={{display:'flex',justifyContent:'center'}}>
                <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                    <div className="relative p-4 w-full max-w-4xl h-full md:h-auto">
                        {/* <!-- Modal content --> */}
                        <div className="relative bg-white rounded-lg shadow ">
                            {/* <!-- Modal header --> */}
                            <div className="flex justify-between items-center p-5 rounded-t">
                                <h3 className="text-xl font-medium text-gray-900 ">
                                    {/* <!-- Let's build an Organization --> */}
                                </h3>
                              
                            </div>
                            <form action="">
                                {/* <!-- Modal body --> */}
                                <div className="px-6 space-y-6 flex">
                                    <div className="flex flex-col ">

                                        <div className="flex flex-col mb-8">
                                            <h2 className="text-3xl mb-2">{labelText} User</h2>
                                        </div>
                                        <div className="flex flex-col mb-8">
                                            <h4 className="text-xs font-bold mb-2">Name</h4>
                                            <input type="text" id="fullname" name="name" onChange={handleInputChange}
                                                className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                style={{width:'21rem'}}
                                                placeholder="Enter full name" value={name} required />
                                        </div>
                                        {/* <div className="flex flex-col mb-8">
                                            <label htmlFor="countries" className="text-xs font-bold mb-2" >Role </label>
                                            <select value={role} id="countries" name="role" defaultValue={'DEFAULT'} onChange={handleInputChange}
                                                className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                                <option value="DEFAULT">Select Role(s) of user</option>
                                                <option value="Role 1">Role 1</option>
                                                <option value="Role 2">Role 2</option>
                                                <option value="Role 3">Role 3</option>
                                                <option value="Role 4">Role 4</option>
                                            </select>


                            
                                            <p className="text-xs opacity-50 mt-2">you can select multiple roles for the users
                                            </p>
                                        </div> */}
                                        {/* <div className="flex flex-col mb-8">
                                            <label htmlFor="countries" className="text-xs font-bold mb-2" >1 Level Up </label>
                                            <select value={levelUp} id="countries" defaultValue={'DEFAULT'} name="levelUp"  onChange={handleInputChange}
                                                className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                                <option value="DEFAULT">Select the manager for the user</option>
                                                <option value="Level Up 1">Level Up 1</option>
                                                <option value="Level Up 2">Level Up 2</option>
                                                <option value="Level Up 3">Level Up 3</option>
                                                <option value="Level Up 4">Level Up 4</option>
                                            </select>


                            
                                            <p className="text-xs opacity-50 mt-2">select the users 1 level above the user
                                            </p>
                                        </div> */}
                                        <div className="flex flex-col mb-8">
                                            <label htmlFor="countries" className="text-xs font-bold mb-2" >Department </label>
                                            <select value={department?.id} id="countries" defaultValue={''} name="department"  onChange={handleInputChange}
                                                className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                                <option value="">Select the department user belongs to</option>
                                                {/* <option value="Department1">Department1</option>
                                                <option value="Department2">Department2</option>
                                                <option value="Department3">Department3</option>
                                                <option value="Department4">Department4</option> */}
                                                {props?.departments?.map((dep) => (
                                                    <option key={dep.id} value={dep.id}>{dep.title}</option>
                                                ))}
                                            </select>


                            
                                            <p className="text-xs opacity-50 mt-2">you can select multiple departments
                                            </p>
                                        </div>
                                        {/* <div className="flex flex-col mb-8">
                                            <label htmlFor="countries_multiple" className="text-xs font-bold mb-2">
                                                Department</label>
                                            <select multiple id="countries_multiple" defaultValue={'DEFAULT'}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

                                                <option value="DEFAULT">Choose a Department</option>
                                                <option value="US">Manager 1</option>
                                                <option value="CA">Manager 2</option>
                                                <option value="FR">Manager 3</option>
                                                <option value="DE">Manager 4</option>
                                            </select>
                                            <p className="text-xs opacity-50 mt-2">You can select multiple departments
                                            </p>
                                        </div> */}
                                    </div>
                                </div>
                                {/* <!-- Modal footer --> */}
                                <div className="flex items-center p-6 space-x-2 rounded-b justify-end  dark:border-gray-600">
                                    <button type="button"
                                        className="text-kelvinBlack  hover:bg-kelvinLight focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6"
                                        data-modal-toggle="success-modal"  onClick={onCloseModal}>Cancel</button>
                                     <button 
                                        type="button"
                                        className="text-white bg-gradient-to-r from-kelvinDark to-kelvinBold hover:bg-gradient-to-br focus:ring-4  focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6"
                                        data-modal-toggle="success-modal" 
                                        onClick={handleCreateUsers}
                                        disabled={!name || !department}
                                    >{labelText}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default CreateUserPopup;