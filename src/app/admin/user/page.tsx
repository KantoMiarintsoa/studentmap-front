import ListUser from '@/components/users/listUser'
import React from 'react'

function Page() {
  return (
    <div className='flex flex-col items-end min-h-screen bg-card-primary p-4 relative w-full'>
        <ListUser/>
    </div>
  )
}

export default Page