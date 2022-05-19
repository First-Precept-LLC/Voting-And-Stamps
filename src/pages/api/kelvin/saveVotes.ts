import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import {resolvers, testServer, StampsModule} from "~/pages/api/graphql"



import { Value, ValueConnector, ValueTypeServer } from "~/models/value.server";




export default async function saveVotes(
    req: NextApiRequest,
    res: NextApiResponse
) {
    let savedVotes = req.body.savedVotes;
    let toTarget = req.body.toTarget;
    let fromId = req.body.fromId;
    let fromName = req.body.fromName;
    let contents = mongoose.connection.collection("contents");
    let targetContent = await contents.findOne({_id: toTarget});
    let fullSuccess = false;

    for(let i = 0; i < savedVotes.length; i++) {
        let vote = savedVotes[i];
        const stamps = new StampsModule();
        await stamps.init();
        const success = await stamps.update_vote(vote.stampType, fromId, fromName, targetContent?.creator, toTarget, targetContent?.contentType, vote.collection, vote.negative); //negative is true in the case of a downvote, and false otherwise.
        fullSuccess = fullSuccess && success;
        
    }

    return res.status(200).send({success: fullSuccess});



}