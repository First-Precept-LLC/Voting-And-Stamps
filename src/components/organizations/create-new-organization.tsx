import React from "react";

const CreateNewOrganization = ({ onClick }) => (
    <div className="flex flex-col items-center">
            <img src="/img/org-empty.svg" alt="" />
            <h6 className="my-2 font-medium text-kelvinBlack">
              Looks like you’re new here
            </h6>
            <p className="mb-4 w-2/3 text-center text-kelvinBlack">
              Create a new organization to start plan, track your progress with
              your team
            </p>
            <div className="flex">
              <button
                type="button"
                onClick={onClick}
                className="text-white bg-gradient-to-r from-kelvinDark  to-kelvinBold hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                >
                Create Organization
              </button>
            </div>
    </div>
)

export default CreateNewOrganization;