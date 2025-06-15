import ListsAccommodation from '@/components/forms/accommodation/listAccommodation'
import React from 'react'

function AccommodationPage() {
  return (
    <div className='flex flex-col items-end min-h-screen bg-card-primary p-4 relative w-full'>
        <ListsAccommodation />
    </div>
  )
}

export default AccommodationPage