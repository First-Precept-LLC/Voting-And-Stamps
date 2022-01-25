// Export all your SERVER-ONLY models here
// Please do not remove the User model, which is necessary for auth
import { SampleModel } from "./sampleModel.server";
import { User } from "./user.server";
import { Content } from "./content.server"
import { Resolution } from "./resolution.server";
import { Model } from "./model.server";

const models = [User, SampleModel, Content, Resolution, Model];



export default models;
