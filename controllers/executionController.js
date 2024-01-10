import Execution from "../models/Execution.js";
import { createError } from "../utils/error.js";
import { cppProducer, csharpProducer, javaProducer, pythonProducer } from "../utils/producer.js";


export const submitCode = async (req, res, next) => {
    try {
        if (!req.body.code)
            return next(createError(401, "Please fill the all requried fields."));
        else{
            var newExecution = new Execution({
                code: req.body.code,
                runtime: req.body.runtime,
                submitBy: req.user && req.user.id
            })
            // Save the code in database
            await newExecution.save(); 

            /// This switch block add all submited code in Queue according to their runtime.
            switch (req.body.runtime) {
                case 'cpp':
                  await cppProducer(newExecution)
                  break;
                case 'java':
                  await javaProducer(newExecution)
                  break;
                case 'python':
                  await pythonProducer(newExecution)
                  break;
                case 'csharp':
                  await csharpProducer(newExecution)
                  break;
                default:
                  return res.status(400).json({ error: 'Unsupported runtime' });
              }
        }
        res.status(201).json(newExecution)
    } catch (err) {
        next(err)
    }
}

export const CancleExecution = async(req, res, next) =>{
    try {
        const result = await Execution.findOneAndUpdate({ _id: req.params.id, status: 'Queued' },
        {
            $set: { action: "cancel", status: "canceled" }
        },
        { new: true })

        if(result) res.status(200).json(result);
        else res.status(500).send("Something went wrong.")
    } catch (error) {
        next(error)
    }
}

export const MyExecution = async(req, res, next) =>{
    try {
        const result = await Execution.find(
            { submitBy: req.user.id},{ updatedAt: 0,}
        ).populate("submitBy", "-email -password -createdAt -updatedAt");

        if(result.length) res.status(200).json(result);
        else res.status(500).send("Something went wrong.")
    } catch (error) {
        next(error)
    }
}

