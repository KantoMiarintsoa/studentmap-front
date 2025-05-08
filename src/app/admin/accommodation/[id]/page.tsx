"use client"

import DetailAccommodation from '@/components/forms/accommodation/detailsAccommodation';
import { useParams } from 'next/navigation';
import React from 'react'

function DetailsAccommodationPage() {

    const params = useParams()

  return (
    <div>
        <DetailAccommodation  id={parseInt(params.id?.toString()??"0")}/>
    </div>  
  )
}

export default DetailsAccommodationPage