"use client"
import React, { useState } from 'react'
import ListEvent from '@/components/forms/event/listEvent'
import SaveEvent from '@/components/forms/event/saveEvent'

function EventPage() {
  const [events, setEvents] = useState<any[]>([])

  const handleEventCreated = (newEvent: any) => {
    setEvents((prevEvents) => [...prevEvents, newEvent])
  }

  return (
    <div className='flex flex-col items-end min-h-screen bg-card-primary p-4 relative w-full '>
      <ListEvent />
    </div>
  )
}

export default EventPage
