// Export all your SERVER-ONLY models here
// Please do not remove the User model, which is necessary for auth
import { SampleModel } from "./sampleModel.server";
import { User } from "./user.server";
import { Content } from "./content.server"
import { Resolution } from "./resolution.server";
import { Prediction } from "./prediction.server";
import { Value } from "./value.server";
import { Chat } from "./chat.server";

const models = [User, SampleModel, Content, Resolution, Prediction, Value, Chat];



export default models;
