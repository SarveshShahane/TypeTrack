import React from 'react'
import {paragraphs} from "../utils/data.js"
const Paragraph = ({idx}) => {
    const getText=paragraphs[idx]
  return (
 <div className='border bg-gray-200 rounded text-lg p-3 m-2 w-full max-w-2xl'>{getText}</div>
  )
}

export default Paragraph