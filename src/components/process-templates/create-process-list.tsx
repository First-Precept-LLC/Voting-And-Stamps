import React, { useEffect, useState } from 'react';
import { getUserId } from '~/services/user.service';
import { Users} from "~/store/actions/usersActions";


const CreateProcessList = (props) => {
    const { onCloseModal, processItem } = props;
    const [errorMsg, setErrorMsg] = React.useState(false);
    const [state, setState] = useState({
        name: '',
        user: {} as Users,
        dueDate: ''
    });

    useEffect(() => {
        if (processItem && processItem.estimatedDate && processItem.estimatedDate.length) {
            const estimatedDate = processItem.estimatedDate?.[0]?.split("days")?.[0] ?? 0;
            const estimatedHrs = processItem.estimatedDate?.[1]?.split("hrs")?.[0] ?? 0;
            const estimatedMins = processItem.estimatedDate?.[2]?.split("mins")?.[0] ?? 0;
            const currentDate = new Date();
            currentDate.setDate(currentDate.getDate() + Number(estimatedDate));
            console.log(currentDate, 'currentDate',estimatedHrs,  estimatedDate, estimatedMins)
            currentDate.setHours(Number(estimatedHrs));
            currentDate.setMinutes(Number(estimatedMins));
            setState((state): any => ({
                ...state,
                dueDate: currentDate.toString()
            }))
        }
    }, [processItem])

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'user') {
            const findUser = props.users?.find(user => user.id === value);
            setState(state => ({
                ...state,
                [name]: findUser ?? {}
            }))
            return;
        }
        setState(state => ({
            ...state,
            [name]: value
        }))
    }


    const handleCreateProcess = () => {
        const {
            processItem,
            handleCeateProcess
        } = props;
        if (state.name && state.dueDate && Object.keys(state.user).length && processItem) {
            handleCeateProcess({
                ...state,
                processTemplateId: processItem.id,
                processTemplateName: processItem.name,
                processTemplateDescription: processItem.description,
                steps: processItem.steps,
                userId: getUserId(),
                orgId: processItem.orgId,
                projectId: processItem.projectId
            });
        } else {
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
                                            name="name"
                                            onChange={handleInputChange}
                                            className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Title of the process"
                                            required
                                            value={state.name}
                                        />
                                    </div>

                                    <div className="flex flex-col mb-8">
                                        <h4 className="text-lg mb-2">User</h4>
                                        <select
                                            value={state.user?.id}
                                            name="user"
                                            id="countries"
                                            onChange={handleInputChange}
                                            className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                            <option>Select User</option>
                                            {props?.users?.map((user) => (
                                                <option key={user.id} value={user.id}>{user.name}</option>
                                            ))}
                                        </select>
                                        {/* <input 
                                            type="text"
                                            id="user"
                                            value={user}
                                            onChange={(e) => setUser(e.target.value)}
                                            className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder=""
                                            required

                                        /> */}
                                        <p className="text-xs opacity-50 mt-2">
                                            Default user is populated from the role selected while creating process
                                        </p>
                                    </div>
                                    <div className="flex flex-col mb-8">
                                        <h4 className="text-lg mb-2">Due Date</h4>
                                        <input
                                            type="text"
                                            id="date"
                                            name="dueDate"
                                            value={state.dueDate}
                                            // onChange={handleInputChange}
                                            className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="John"
                                            // required
                                            disabled
                                        />
                                        <p className="text-xs opacity-50 mt-2">
                                            Auto calculated if it has estimated duration
                                        </p>
                                    </div>

                                    {
                                        errorMsg && <p style={{ color: 'red', marginBottom: '25px' }}>Please complete the form to proceed</p>
                                    }
                                </div>

                            </div>
                            <div className="flex items-center space-x-2 rounded-b dark:border-gray-600" style={{ paddingLeft: '235px', marginTop: '-17px' }}>

                                <button
                                    type="button"
                                    onClick={handleCreateProcess}
                                    className="text-white bg-gradient-to-r from-kelvinDark  to-kelvinBold hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6"
                                    data-modal-toggle="success-modal"
                                >
                                    Create Process
                                </button>
                                <button
                                    type="button"
                                    onClick={onCloseModal}
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