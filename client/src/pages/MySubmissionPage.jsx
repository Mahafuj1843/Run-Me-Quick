import React, { useEffect, useRef, useState } from 'react'
import AppWrapper from '../components/AppWrapper'
import CodeDetailsModel from '../components/CodeDetailsModel';
import { ExecutionState } from '../context/ExecutionContext';
import axios from 'axios';
import moment from 'moment/moment'
import { socket } from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../helpers/sessionHelper';
const AxiosHeader = { headers: { "token": getToken() } }

const MySubmissionPage = () => {
    let navigate = useNavigate();
    const renderRun = useRef(false)
    const [show, setShow] = useState(false)
    const { myExecution, setMyExecution, setSelectExecution } = ExecutionState();

    const submit = async (id) => {
        const result = await axios.put(`http://localhost:8081/api/execution/cancle/${id}`)

        const temp = myExecution.filter((item) => item._id != result.data._id)
        setMyExecution([result.data, ...temp])
        return result;
    }

    const CancleExecution = async (id) => {
        await submit(id);
    }

    const EditExecution = async (id) => {
        const result = await submit(id);
        if (result.status === 200) {
            setSelectExecution(result.data)
            navigate('/')
        }
    }

    const onset = (item) => {
        setShow(!show)
        setSelectExecution(item)
    }

    useEffect(() => {
        if (getToken()) {
            (async () => {
                const result = await axios.get("http://localhost:8081/api/execution/my", AxiosHeader)
                setMyExecution(result.data)
            })();
        }
    }, [])

    useEffect(() => {
        if (renderRun.current === false) {
            socket.on("update execution", (ExecutionCode) => {
                const result = myExecution?.find((item) => item._id === ExecutionCode?._id)
                if (result) {
                    const temp = myExecution?.filter((item) => item._id != ExecutionCode?._id)
                    setMyExecution([ExecutionCode, ...temp])
                }
            })
            return () => { renderRun.current = true }
        }
    }, [])

    return (
        <AppWrapper>
            <div className='w-full px-[1rem] md:px-[2rem] lg:px-[5rem] py-6 mt-16'>
                <div className='w-full md:w-[80%] mx-auto'>
                    <div className="w-full bg-gray-200 rounded-lg space-y-2 p-2">
                        <h2 className='text-md'>My Submission</h2>
                        <div className="max-w-full overflow-x-auto">
                            <table className="w-full overflow-x-auto text-sm text-center rtl:text-right text-gray-500">
                                <thead className="text-xs text-black uppercase bg-gray-300">
                                    <tr className='bg-white'>
                                        <th scope="col" className="px-6 py-2 border-gray-400">
                                            #
                                        </th>
                                        <th scope="col" className="px-6 py-2 border-s border-gray-400">
                                            When
                                        </th>
                                        <th scope="col" className="px-6 py-2 border-s border-gray-400">
                                            Who
                                        </th>
                                        <th scope="col" className="px-6 py-2 border-s border-gray-400">
                                            Lang
                                        </th>
                                        <th scope="col" className="px-6 py-2 border-s border-gray-400">
                                            Status
                                        </th>
                                        <th scope="col" className="px-6 py-2 border-s border-gray-400">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        myExecution.length && myExecution.map((item, i) => (
                                            <tr key={i} className="border-b bg-blue-100 border-gray-300">
                                                <th scope="row" className="px-6 py-4 font-light text-gray-900 whitespace-nowrap">
                                                    <button onClick={() => onset(item)} className='underline text-blue-700'>#{item._id.slice(16)}</button>
                                                </th>
                                                <td className="px-6 text-xs text-black border-s border-gray-400">
                                                    {moment(item.createdAt).format('lll')}
                                                </td>
                                                <td className="px-6 border-s font-medium border-gray-400 capitalize">
                                                    {item.submitBy ? item.submitBy.username : "unknow"}
                                                </td>
                                                <td className="px-6 border-s text-black border-gray-400">
                                                    {item.runtime}
                                                </td>
                                                <td className={`${item.status === 'Complete' && 'font-bold text-green-600'} px-6 border-s text-black text-xs border-gray-400`}>
                                                    {item.status}
                                                </td>
                                                <td className="px-6 border-s text-black text-xs border-gray-400">
                                                    <span className='flex items-center gap-x-2 w-fit'>
                                                        <button
                                                            onClick={() => CancleExecution(item._id)}
                                                            className={`${(item.status === 'Queued' && item.action === "ongo") ? "block" : "hidden"} px-2 py-0.5 bg-red-600 hover:opacity-90 text-white rounded-md`}
                                                        >Cancle</button>
                                                        <button
                                                            onClick={() => EditExecution(item._id)}
                                                            className={`${(item.status === 'Queued' && item.action === "ongo") ? "block" : "hidden"} px-2 py-0.5 bg-green-600 hover:opacity-90 text-white rounded-md`}
                                                        >Edit</button>
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {
                    show &&
                    <CodeDetailsModel show={show} setShow={setShow} />
                }
            </div>
        </AppWrapper>
    )
}

export default MySubmissionPage
