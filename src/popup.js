/**
 * @class Popup
 */

import PropTypes from 'prop-types'
import React from 'react'

const Popup = ({ message, onClick }) => {
  if (!message) return null
  return (
    <div
      onClick={() => onClick && onClick()}
      style={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <div
        style={{
          position: 'absolute',
          bottom: 10,
          justifyContent: 'center',
          padding: 24,
          borderRadius: 4,
          backgroundColor: '#22222F'
        }}
      >
        <span style={{ color: 'white', whiteSpace: 'nowrap' }}>{message}</span>
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          borderLeft: '10px solid transparent',
          borderRight: '10px solid transparent',
          borderTop: '10px solid #22222F'
        }}
      />
    </div>
  )
}

Popup.propTypes = {
  message: PropTypes.string,
  onClick: PropTypes.func
}

export default Popup
