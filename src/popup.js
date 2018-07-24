/**
 * @class Popup
 */

import PropTypes from 'prop-types'
import React from 'react'

const Popup = ({ message, onClick }) => {
  if (!message) return null
  return (
    <div className='hint' onClick={() => onClick && onClick()}>
      <div className='content'>
        <span className='title'>Hey!</span>
        <span className='text'>{message}</span>
        <div className='buttonsWrapper'>
          <div className='button red'>Log In</div>
          <div className='button nofill'>Register</div>
        </div>
      </div>
      <style jsx>{`
        .hint {
          min-width: 254px;
          position: relative;
        }

        .content {
          color: white;
          background-color: #191927;
          padding: 30px;
          border-radius: 10px;
          position: absolute;
          bottom: 19px;
          left: 0;
          right: 0;
          display: flex;
          flex-direction: column;
          align-content: center;
          align-items: flex-start;
          box-sizing: border-box;
        }

        .content:before {
          content: '';
          width: 0;
          height: 0;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          border-top: 10px solid #191927;
          position: absolute;
          bottom: -10px;
          left: calc(50% - 10px / 2);
        }

        .title {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 10px;
        }

        .text {
          font-size: 14px;
          margin-bottom: 20px;
        }

        .buttonsWrapper {
          width: 100%;
          display: flex;
          justify-content: space-between;
        }

        .button {
          color: white;
          font-size: 12px;
          font-weight: bold;
          width: calc(50% - 10px);
          height: 35px;
          padding: 0 20px;
          border-radius: 20px;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 250ms ease-out;
          cursor: pointer;
        }

        .button.red {
          background-color: #E54D3F;
        }

        .button.red:hover {
          background-color: #ce4134;
        }

        .button.nofill {
          border: 1px solid #FFF;
        }

        .button.nofill:hover {
          color: #191927;
          background-color: white;
        }

      `}</style>
    </div>
  )
}

Popup.propTypes = {
  message: PropTypes.string,
  onClick: PropTypes.func
}

export default Popup
