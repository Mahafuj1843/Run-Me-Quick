import React, { Fragment } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

export default function AppWrapper({ children }) {
    return (
        <Fragment>
            <Navbar />
            <div>{children}</div>
            <Footer />
        </Fragment>
    )
}