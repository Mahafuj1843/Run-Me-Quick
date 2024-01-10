import { Queue } from "bullmq"

// Here define Queue for C++
const cppQueue = new Queue('cpp-queue', {
    connection: {
        host: '127.0.0.1',
        port: '6379'
    }
});

// Here define Queue for JAVA
const javeQueue = new Queue('java-queue', {
    connection: {
        host: '127.0.0.1',
        port: '6379'
    }
});

// Here define Queue for PYTHON
const pythonQueue = new Queue('python-queue', {
    connection: {
        host: '127.0.0.1',
        port: '6379'
    }
});

// Here define Queue for C#
const csharpQueue = new Queue('csharp-queue', {
    connection: {
        host: '127.0.0.1',
        port: '6379'
    }
});

// This function push all submited C++ code in queue.
export const cppProducer = async (data) => {
    const res = await cppQueue.add(data.runtime, data);
}

// This function push all submited JAVA code in queue.
export const javaProducer = async (data) => {
    const res = await javeQueue.add(data.runtime, data);
}

// This function push all submited PYTHON code in queue.
export const pythonProducer = async (data) => {
    const res = await pythonQueue.add(data.runtime, data);
}

// This function push all submited C# code in queue.
export const csharpProducer = async (data) => {
    const res = await csharpQueue.add(data.runtime, data);
}