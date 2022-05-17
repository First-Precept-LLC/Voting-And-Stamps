import { useState } from "react";

const Value = ({name, description, contentId, valueId}) => {
    let [upvoted, setUpvoted] = useState(0);
    let [downvoted, setDownvoted] = useState(0);
    return (
    <div className="flex shadow shadow-md rounded-md py-4 px-6 my-2 items-center justify-between">
        <div className="flex">
            <div className="flex flex-col justify-start items-start mr-2">
                <i className="fa-solid text-kelvinDark mr-2 fa-rocket text-xl"></i>
            </div>
            <div className="mr-8">
                <h6 className="leading-none mb-2 ">{name}</h6>
                <p className="text-gray-400">{description}</p>
            </div>
        </div>
        <div className="flex flex-col items-end">
            <div className="flex">
                <p className="text-kelvinDark bg-kelvinLight px-3 py-2  font-bold rounded">32</p>
            </div>
            <div className="flex my-4">
                <button type="button"
                    className="focus:outline-none text-white bg-kelvinDark hover:bg-kelvinBold focus:ring-4 focus:ring-kelvinDark font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-kelvinDark dark:hover:bg-kelvinBold dark:focus:ring-kelvinDark"><i
                        className="fa-solid text-white fa-thumbs-up"
                        onClick={() => {setUpvoted(upvoted ? 0 : 1)}}></i></button>
                <label htmlFor="" className="p-2 mx-2 font-medium text-lg">5</label>
                <button type="button"
                    className="focus:outline-none text-white bg-kelvinDark hover:bg-kelvinBold focus:ring-4 focus:ring-kelvinDark font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-kelvinDark dark:hover:bg-kelvinBold dark:focus:ring-kelvinDark"><i
                        className="fa-solid text-white fa-thumbs-down"
                        onClick={() => {setDownvoted(downvoted ? 0 : 1)} //TODO: have these buttons update running variables tracking votes; potentially abstract away their function
                          }></i></button> /
            </div>
        </div>
    </div>);
}

export default Value;