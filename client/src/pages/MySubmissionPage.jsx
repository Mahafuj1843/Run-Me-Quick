import React, { useState } from 'react'
import AppWrapper from '../components/AppWrapper'
import { Link } from 'react-router-dom';
import CodeDetailsModel from '../components/CodeDetailsModel';

const MySubmissionPage = () => {
    const [show, setShow] = useState(false)
    const onset = (id) => {
        setShow(!show)
    }
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
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        [...Array(5)].map((item, i) => (
                                            <tr key={i} className="border-b bg-blue-100 border-gray-300">
                                                <th scope="row" className="px-6 py-4 font-light text-gray-900 whitespace-nowrap">
                                                    <button onClick={() => onset(1)} className='underline text-blue-700'>12cdf4567</button>
                                                </th>
                                                <td className="px-6 text-xs text-black border-s border-gray-400">
                                                    01:00:50 pm
                                                </td>
                                                <td className="px-6 border-s font-medium border-gray-400">
                                                    Mahafuj
                                                </td>
                                                <td className="px-6 border-s text-black border-gray-400">
                                                    C++
                                                </td>
                                                <td className="px-6 border-s text-black text-xs border-gray-400">
                                                    In queue
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
