import React, { useState } from 'react'
import axios from "axios";
import AppWrapper from '../components/AppWrapper'
import { IsEmpty } from '../helpers/formHelper';
import { ExecutionState } from '../context/ExecutionContext';
import { useNavigate } from 'react-router-dom';
import { socket } from '../components/Navbar';
import { getToken } from '../helpers/sessionHelper';
const AxiosHeader = { headers: { "token": getToken() } }

const HomePage = () => {
    const { myExecution, setMyExecution, selectExecution } = ExecutionState();
    let navigate = useNavigate();

    const [codeData, setCodeData] = useState({
        code: selectExecution ? selectExecution.code : "",
        runtime: selectExecution ? selectExecution.runtime : "cpp"
    });

    const handleChange = (e) => {
        setCodeData((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (IsEmpty(codeData.code)) {
            ErrorToast("Code field is empty!")
        }
        else {
            const result = await axios.post("http://localhost:8081/api/execution", codeData, AxiosHeader)
            if(result.status === 201){
                socket.emit("setup", result.data)
                setMyExecution([ result.data, ...myExecution ])
                navigate('/my')
            }
        }
    }
    return (
        <AppWrapper>
            <div className='w-full px-[1rem] md:px-[2rem] lg:px-[5rem] py-6 mt-16'>
                <div className='w-full md:w-[75%] mx-auto'>
                    <form onSubmit={handleSubmit} className="w-full bg-white rounded-lg shadow space-y-2 p-2">
                        <h3 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">Submit solution</h3>
                        <div className='w-1/2 space-y-2'>
                            <label htmlFor="runtime" className="block text-sm font-medium text-gray-900 ">Language:</label>
                            <select onChange={handleChange} value={codeData.runtime} name="runtime" id="runtime" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 ">
                                <option value="cpp">C++</option>
                                <option value="java">Java</option>
                                <option value="python">Python</option>
                                <option value="csharp">C#</option>
                            </select>
                        </div>
                        <div className='space-y-2'>
                            <label htmlFor="code" className="block mb-2 text-sm font-medium text-gray-900 ">Source code:</label>
                            <textarea onChange={handleChange} value={codeData.code} name="code" id="code" cols="30" rows="14" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 resize-none"></textarea>
                        </div>
                        <button type="submit" className="w-full text-white bg-black hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-black font-medium rounded-lg text-sm px-5 py-2.5 text-center">Submit</button>
                    </form>
                </div>
            </div>
        </AppWrapper>
    )
}

export default HomePage
