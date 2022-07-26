// Export all your SHARED models here
// Please do not remove the User model, which is necessary for auth
import { Org } from "./org.server";
import { SampleModel } from "./sampleModel";
import { User } from "./user";
import {UserVote} from "./uservote.server";

const models = [User, SampleModel, Org];
export default models;
