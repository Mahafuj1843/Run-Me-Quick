import { Worker } from "bullmq";
import { updateExecution } from "./helper.js";
import Execution from "../models/Execution.js";

// Assume this function as a code compiler. Which give 10s delay
const compileCode = () => new Promise((res, rej) => setTimeout(() => res(), 10 * 1000));

// This worker process all the C++ code 1 by 1 available in queue. Until the queue is empty.
export const workerCpp = new Worker('cpp-queue', async (job) => {
    const exu = await Execution.findById(job.data._id)

    // Here I have check this code execution cancel or resubmit. If not and action==='ongo' then compile and execute this code.
    if (exu.action === 'ongo') {
        // Here update the code status Queued to Executing
        await updateExecution(job.data._id, "Executing")

        // Here executing the code and save the result in database. [ Unfontunately I can't use any compiler here ]
        await compileCode()

        // Here update the code status Executing to Complete.
        await updateExecution(job.data._id, "Complete")
    }
}, {
    connection: {
        host: '127.0.0.1',
        port: '6379'
    }
});

// this work process all the JAVA code 1 by 1 available in queue. Until the queue is empty.
export const workerJava = new Worker('java-queue', async (job) => {
    const exu = await Execution.findById(job.data._id)
    if (exu.action === 'ongo') {
        await updateExecution(job.data._id, "Executing")

        await compileCode()

        await updateExecution(job.data._id, "Complete")
    }
}, {
    connection: {
        host: '127.0.0.1',
        port: '6379'
    }
});

// this work process all the PYTHON code 1 by 1 available in queue. Until the queue is empty.
export const workerPython = new Worker('python-queue', async (job) => {
    const exu = await Execution.findById(job.data._id)
    if (exu.action === 'ongo') {
        await updateExecution(job.data._id, "Executing")

        await compileCode()

        await updateExecution(job.data._id, "Complete")
    }
}, {
    connection: {
        host: '127.0.0.1',
        port: '6379'
    }
});

// this work process all the C# code 1 by 1 available in queue. Until the queue is empty.
export const workerCSharp = new Worker('csharp-queue', async (job) => {
    const exu = await Execution.findById(job.data._id)
    if (exu.action === 'ongo') {
        await updateExecution(job.data._id, "Executing")

        await compileCode()

        result = await updateExecution(job.data._id, "Complete")
    }
}, {
    connection: {
        host: '127.0.0.1',
        port: '6379'
    }
});