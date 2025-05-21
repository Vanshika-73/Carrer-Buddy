import React from 'react'

const coverLetter = async({params}) =>{
    const id = await params.id;

  return (
    <div>coverLetter:{id}</div>
  )
}

export default coverLetter