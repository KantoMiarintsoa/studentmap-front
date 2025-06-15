
import Sidebar from '@/components/ui/sidebar'
import ListUniversity from '@/components/university/listUniversity'
import SaveUniversity from '@/components/university/saveUniversity'
import React from 'react'


function AdminPage() {

  return (
    <div className="flex flex-col items-end min-h-screen bg-card-primary p-4 relative w-full">
      {/* <SaveUniversity/> */}
      <ListUniversity/>
    </div>
  )
}

export default AdminPage