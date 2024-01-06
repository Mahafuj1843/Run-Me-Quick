import React, { Fragment } from 'react'

const CodeDetailsModel = ({ show, setShow }) => {
    return (
        <Fragment >
            <div className="fixed h-screen w-full z-50 left-0 top-0 transition duration-300 ease-in-out" style={{ display: show ? 'block' : 'none' }}>
                <div onClick={() => setShow(false)} className="fixed h-full w-full left-0 top-0 bg-black bg-opacity-50 z-[-1]"></div>
                <div className="w-[95%] lg:w-3/4 h-5/6 my-6 mx-auto bg-white p-3 space-y-1 shadow-md rounded-lg border-4 border-spacing-4 border-gray-400">
                    <button onClick={() => setShow(false)} className='float-right text-black'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-x-circle"><circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" /></svg>
                    </button>
                    <p className='w-full text-sm text-gray-600'>By
                        <span className='font-medium text-black ms-1'>Mahafuj</span>,
                        <span className='text-green-600 font-medium ms-1'>Accept</span>
                    </p>
                    <hr />
                    <p className='text-xs'>Code</p>
                    <div className='w-full h-fit max-h-[88%] overflow-y-auto space-y-1'>
                        <div className='w-full h-[40rem] bg-gray-200 text-sm'>
                            hjhhhhhhhhhhhhhhhhhhh
                        </div>
                        <hr />
                        <p className='text-xs'>Output</p>
                        <div className='w-full h-48 bg-gray-200 text-sm'>
                            kkkkkkkkkkkkkk
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default CodeDetailsModel
