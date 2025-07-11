import React from 'react'

const Button = ({ name, handleClick }) => {
    const resetStyle = `
    bg-red-500 text-white text-lg px-4 py-2 rounded hover:bg-red-600
    transition duration-300 ease-in-out
    `
    const otherStyle = `
    bg-blue-500 text-white text-lg px-3 py-1 rounded hover:bg-blue-600
    transition duration-300 ease-in-out
    `

    return (
        <button onClick={handleClick} className={name == "Reset" ? resetStyle : otherStyle}>{name}</button>
    )
}

export default Button