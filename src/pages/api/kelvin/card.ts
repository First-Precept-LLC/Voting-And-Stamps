import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";


import { Value, ValueConnector, ValueTypeServer } from "~/models/value.server";


export default async function cards(
    req: NextApiRequest,
    res: NextApiResponse
) {
   let contents = mongoose.connection.collection("contents");
   let nameFilter = req.body.nameFilter;
   let cards = await contents.find({name: {$regex: nameFilter}}).toArray();
   return res.status(200).send({results: cards});
}