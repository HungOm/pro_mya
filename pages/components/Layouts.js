import React, { useState } from 'react'
import Feeds from './Feeds'

import Navbar from "./Navbar"
import Tabs from "./Tabs"

const Layout = () => {
    const tabList = ['News', 'Facts', 'Tips', 'How-to', 'About']

    const [curTab, setCurTab] = useState(tabList[0])

    return (<div className='min-w-screen min-h-screen'>
        <Navbar />
        <Tabs list={tabList} curTab={curTab} onChange={setCurTab} />

        <Feeds show={curTab} />
    </div>)
}

export default Layout