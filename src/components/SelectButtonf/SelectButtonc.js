import React from 'react'
import './SelectButtonc.css'

const SelectButtonc = ({ children, selected, onClick })  => {
  return (
    <span onClick={onClick} className="btn">
      {children}    
    </span>
  )
}

export default SelectButtonc