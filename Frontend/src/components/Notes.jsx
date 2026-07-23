import React from 'react'
import { useNavigate } from 'react-router-dom'

function Notes() {
  const navigate = useNavigate()
  return (
    <div className='w-full h-[70vh] '>
        <button className="bg-red-500 text-white px-2 py-2 w-64 rounded-md hover:bg-red-600 transition duration-300 cursor-pointer" onClick={()=>navigate("/pdf/osnotes")}>OS</button>
    </div>
  )
}

export default Notes