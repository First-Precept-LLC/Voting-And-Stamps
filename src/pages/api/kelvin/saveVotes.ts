import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import {resolvers, testServer, StampsModule} from "~/pages/api/graphql"



import { Value, ValueConnector, ValueTypeServer } from "~/models/value.server";




export default async function saveVotes(
    req: NextApiRequest,
    res: NextApiResponse
) {
    let userVotes = mongoose.connection.collection("uservotes");
    let savedVotes = req.body.savedVotes;
    for(let i = 0; i < savedVotes.length; i++) {
        let vote = savedVotes[i];
        const stamps = new StampsModule();
        await stamps.init();
        const success = await stamps.update_vote(vote.stampType, vote.fromId, vote.fromName, vote.toId, vote.toTarget, vote.targetType, vote.collection, vote.negative); //negative is true in the case of a downvote, and false otherwise.
        return success;
        //TODO: update the vote, potentially using executeOperation
        
    }
    //TODO: use updateVote from api/graphql


}