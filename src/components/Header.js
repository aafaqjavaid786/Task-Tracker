import React from 'react'
import { useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({title, onAdd, showAdd}) => {
    
    const location = useLocation()

    // const onClick = () => {
    //     console.log("Click")
    // }

  return (
    <header className='header'>
        {/* <h1 style={{ color:'red', backgroundColor: 'black' }} >{title}</h1> */}
        {/* <h1 style={headingStyle}> {title} </h1> */}
        <h1> {title} </h1>
        {/* <Button text = "Hello" color = "red"/>
        <Button text = "Hello" color = "blue"/> */}
        {/* <Button text = "Add" color = "green" onClick = {onAdd}/> */}
        { location.pathname ==='/' && <Button text = {showAdd ? "Close" : "Add"} color = {showAdd ? "red" : "green"} onClick = {onAdd}/>}
    </header>
  )
}

// const headingStyle = {
//     color:'red', 
//     backgroundColor: 'black'
// }

Header.defaultProps = {
    title: "TASK TRACKER",
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

export default Header