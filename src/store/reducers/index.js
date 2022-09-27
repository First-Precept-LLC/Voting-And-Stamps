import organizationsReducer from "../actions/organizationsActions";
import valuesReducer from "../actions/valuesActions";
import departmentsReducer from "../actions/departmentsActions";
import usersReducer from "../actions/usersActions";
import processTemplateReducer from "../actions/processTemplateActions";
import processReducer from "../actions/processActions";



const rootReducer = {
  organizations: organizationsReducer,
  values: valuesReducer,
  departments: departmentsReducer,
  users: usersReducer,
  processTemplate: processTemplateReducer,
  process: processReducer
}

export default rootReducer
