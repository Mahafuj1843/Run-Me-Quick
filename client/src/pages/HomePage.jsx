import React from 'react'
import AppWrapper from '../components/AppWrapper'

const HomePage = () => {
    return (
        <AppWrapper>
            <div className='w-full px-[1rem] md:px-[2rem] lg:px-[5rem] py-6 mt-16'>
                <div className='w-full md:w-[75%] mx-auto'>
                    <form action="" className="w-full bg-white rounded-lg shadow space-y-2 p-2">
                        <h3 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">Submit solution</h3>
                        <div className='w-1/2 space-y-2'>
                            <label htmlFor="lang" className="block text-sm font-medium text-gray-900 ">Language:</label>
                            <select name="lang" id="lang" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 ">
                                <option value="c">C</option>
                                <option value="c++">C++</option>
                                <option value="java">Java</option>
                                <option value="python">Python</option>
                            </select>
                        </div>
                        <div className='space-y-2'>
                            <label htmlFor="code" className="block mb-2 text-sm font-medium text-gray-900 ">Source code:</label>
                            <textarea name="code" id="code" cols="30" rows="14" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 resize-none"></textarea>
                        </div>
                        <button type="submit" className="w-full text-white bg-black hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-black font-medium rounded-lg text-sm px-5 py-2.5 text-center">Submit</button>
                    </form>
                </div>
            </div>
        </AppWrapper>
    )
}

export default HomePage
