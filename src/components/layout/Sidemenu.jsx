function Sidemenu() {
  return (
    <>
      <div
        className=" flex flex-col justify-between min-h-full w-64  p-8 bg-kelvinLight shadow shadow-md"
        style={{ height: "100vh", backgroundColor: "#fcfaff" }}
      >
        <div className="flex flex-col ">
          <div className="flex flex-col">
            <a href="/create-process-templates" className="text-kelvinDark mb-3">
              <i className="fa-solid  fa-circle mr-1"></i> Create Process
              Templates
            </a>
            <a href="/process-template-list" className="text-kelvinDark mb-3">
              <i className="fa-solid  fa-circle mr-1"></i>
              Processes Template List
            </a>
            <a href="/process-list" className="text-kelvinDark mb-3">
              <i className="fa-solid  fa-circle mr-1"></i>
              Processes List
            </a>
          
            <a href="/research-model" className="text-kelvinDark mb-3">
              <i className="fa-solid  fa-circle mr-1"></i>
              Research Model
            </a>
          </div>
          <hr className="my-10" />
          <div className="flex flex-col">
            <a href="/organizations" className="text-kelvinDark mb-3">
              <i className="fa-solid  fa-circle mr-1"></i>
              Organizations
            </a>
            <a href="/department" className="text-kelvinDark mb-3">
              <i className="fa-solid  fa-circle mr-1"></i>
              Departments
            </a>
            <a href="#" className="text-kelvinDark mb-3">
              <i className="fa-solid  fa-circle mr-1"></i> Roles
            </a>
            <a href="#" className="text-kelvinDark mb-3">
              <i className="fa-solid  fa-circle mr-1"></i> Users
            </a>
          </div>
        </div>
        <div className="flex mt-10 text-center text-sm text-kelvinBlack opacity-50">
          <p className="font-normal" style={{ marginBottom: "60px" }}>
            You're in a company-managed project. <br />
            <a href="" className="font-medium  hover:text-kelvinBold">
              Learn More
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Sidemenu;
