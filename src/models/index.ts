// Export all your SHARED models here
// Please do not remove the User model, which is necessary for auth
import { SampleModel } from "./sampleModel";
import { User } from "./user";
import {UserVote} from "./uservote.server";

const models = [User, SampleModel, UserVote];
export default models;
