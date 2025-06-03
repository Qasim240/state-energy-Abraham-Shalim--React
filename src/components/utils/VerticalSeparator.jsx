import React from 'react'

const VerticalSeparator = ({ height = 'h-6', color = 'bg-gray-300', width = 'w-px', className = '' }) => {
  return (
        <div className={`${width} ${height} ${color} ${className}`}></div>

  )
}

export default VerticalSeparator