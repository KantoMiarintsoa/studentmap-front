"use client";

import DetailUniversity from '@/components/university/detailUniversity';
import { useParams } from 'next/navigation';
import React from 'react'

function DetailsUniversityPage() {

    const params = useParams()

  return (
    <div>

        <DetailUniversity id={parseInt(params.id?.toString()??"0")}/>
    </div>  
  )
}

export default DetailsUniversityPage