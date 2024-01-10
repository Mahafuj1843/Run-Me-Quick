# Run Me Quick

Build a cloud hosted code runner for better ease and faster velocity during prototyping. The product will allow users to enter a piece of code, allow them to choose a runtime, and show the execution results. Each runtime will execute a single request at a time. Code execution status update real time.

## Requirments
Install node and docker in local meachine.

## Getting Started

First, install all dependency:

```bash
npm i
# or
yarn
```

Then, run the Backend development server:

```bash
npm run dev
# or
yarn dev
```

Then, open your system CLI and run the Redis server in Docker for using Bullmq (Queue):

```bash
docker run -itd -p 6379:6379 redis
```

Then, run the React development server:

```bash
npm run dev
# or
yarn dev
```
