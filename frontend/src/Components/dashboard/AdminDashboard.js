import React, { useEffect } from 'react'
import './dashboard.scss'
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import Message from './Message';
import WorkCrud from './Work-CRUD/WorkCrud';
import InfoCrud from './Info-CRUD/InfoCrud';

const AdminDashboard = () => {
  return (
    <div className='dashboard'>
      <Tabs className='tabs'>
        <TabList className='tab-list'>
          <Tab className='tab'>Message</Tab>
          <Tab className='tab'>Work-CRUD</Tab>
          <Tab className='tab'>Info-CRUD</Tab>
        </TabList>

        <TabPanel>
          <Message />
        </TabPanel>

        <TabPanel>
          <WorkCrud />
        </TabPanel>

        <TabPanel>
          <InfoCrud />
        </TabPanel>
      </Tabs>
    </div>
  )
}

export default AdminDashboard