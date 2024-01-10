import Execution from "../models/Execution.js"
import { io } from "../server.js";

export const updateExecution = async(id, action) =>{
    try {
        const result =  await Execution.findOneAndUpdate({_id: id, action: "ongo"},
        {
            $set: { status: action }
        },
        { new: true });

        // When code execution status change this expression real time update the Frontend.
        io.emit("update execution", result)
    } catch (error) {
        throw(error)
    }
}