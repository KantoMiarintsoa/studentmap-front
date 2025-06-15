import Sidebar from '@/components/ui/sidebar'
import TopBar from '@/components/ui/topbar'
import React from 'react'

function Layout(
    {children}:
    {
        children:React.ReactNode
    }
) {
  return (
    <div className='min-h-full flex bg-background w-full'>
        <Sidebar/>
        <div className='flex flex-col gap-2 flex-1'>
            <TopBar/>
            <div className="p-2">
                {children}  
            </div>
        </div>
    </div>
  )
}

export default Layout