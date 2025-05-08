"use client"
import DetailsEvent from '@/components/forms/event/detailsEvent'
import { useParams } from 'next/navigation'
import React from 'react'

function DetailsEventPage() {

    const params= useParams()
  return (
    <div>
        <DetailsEvent id={parseInt(params.id?.toString()??"0")}/>
    </div>
  )
}

export default DetailsEventPage