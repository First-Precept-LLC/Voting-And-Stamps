import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";

import { Value, ValueConnector, ValueTypeServer } from "~/models/value.server";


export default async function values(
    req: NextApiRequest,
    res: NextApiResponse
) {
    let values = mongoose.connection.collection("values");
    let allValues = await values.find({}).toArray();
    return res.status(200).send({results: allValues});
}