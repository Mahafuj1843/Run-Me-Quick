import Execution from "../models/Execution.js"
import User from "../models/User.js";
import { io } from "../server.js";

export const updateExecution = async(id, action) =>{
    try {
        var result =  await Execution.findOneAndUpdate({_id: id, action: "ongo"},
        {
            $set: { status: action }
        },
        { new: true });

        result = await User.populate(result, {
            path: "submitBy",
            select: "-password -createdAt -updatedAt",
        });

        // When code execution status change this expression real time update the Frontend.
        io.emit("update execution", result)
    } catch (error) {
        throw(error)
    }
}