import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import testServer from "~/pages/api/graphql"



import { Value, ValueConnector, ValueTypeServer } from "~/models/value.server";


export default async function saveVotes(
    req: NextApiRequest,
    res: NextApiResponse
) {
    let userVotes = mongoose.connection.collection("uservotes");
    let savedVotes = req.body.savedVotes;
    //TODO: use updateVote from api/graphql


}