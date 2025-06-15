'use client'
import UpdateUser from '@/components/users/updateUser'
import React, { useEffect, useState } from 'react'
import { User } from '@/types/user' 
import TopBar from '@/components/ui/topbar'
import Sidebar from '@/components/ui/sidebar'

function UpdateUserPage() {

  return (
    <div className='min-h-full flex bg-background w-full'>
        <Sidebar/>
        <div className='flex flex-col gap-2 flex-1'>
            <TopBar/>
            <div className="p-2">      
              <UpdateUser /> 
            </div>
        </div>
    </div>
  )
}

export default UpdateUserPage
