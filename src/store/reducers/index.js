import organizationsReducer from "../actions/organizationsActions";
import valuesReducer from "../actions/valuesActions";
import projectsReducer from "../actions/projectsActions";
import usersReducer from "../actions/usersActions";



const rootReducer = {
  organizations: organizationsReducer,
  values: valuesReducer,
  projects: projectsReducer,
  users: usersReducer
}

export default rootReducer
