"use client"
import DetailUser from '@/components/users/detailUser'
import UpdateUser from '@/components/users/updateUser'
import { useParams } from 'next/navigation'
import React from 'react'

function userPage() {
      const params = useParams()

  return (
    <div>
      <DetailUser id={parseInt(params.id?.toString()??"0")}/> 
    </div>
  )
}

export default userPage