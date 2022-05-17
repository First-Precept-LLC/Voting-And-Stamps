import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import {resolvers, testServer} from "~/pages/api/graphql"



import { Value, ValueConnector, ValueTypeServer } from "~/models/value.server";


export default async function saveVotes(
    req: NextApiRequest,
    res: NextApiResponse
) {
    let userVotes = mongoose.connection.collection("uservotes");
    let savedVotes = req.body.savedVotes;
    for(let i = 0; i < savedVotes.length; i++) {
        let vote = savedVotes[i];
        //TODO: update the vote, potentially using executeOperation
        
    }
    //TODO: use updateVote from api/graphql


}