/**
 * @class Popup
 */

import PropTypes from 'prop-types'
import React from 'react'

const BASE_URL = process.env.MONEY_BUTTON_WEBAPP_PROXY_URI

const Popup = ({ message, title, type, onClick }) => {
  if (!message) return null
  return (
    <div className='mb-hint'>
      <div className='content'>
        <span className='title'>{title}</span>
        <span className='text'>{message}</span>
        <div className='close' onClick={() => onClick && onClick()} />
        {type === 'login' &&
          <div className='buttonsWrapper'>
            <a href={`${BASE_URL}/login`} target='_blank' className='button red'>Log In</a>
            <a href={`${BASE_URL}/register`} target='_blank' className='button nofill'>Register</a>
          </div>
        }
        {type === 'balance' &&
          <div className='buttonsWrapper'>
            <a href='#' target='_blank' className='button red'>Add Money</a>
          </div>
        }
      </div>
      <style jsx>{`

        .mb-hint {
          min-width: 254px;
          position: relative;
        }

        .mb-hint a {
          text-decoration: none
        }

        .mb-hint .close {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1;
        }

        .mb-hint .content {
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

        .mb-hint .content:before {
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

        .mb-hint .title {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 10px;
        }

        .mb-hint .text {
          font-size: 14px;
          margin-bottom: 20px;
        }

        .mb-hint .buttonsWrapper {
          width: 100%;
          display: flex;
          justify-content: space-between;
          position: relative;
          z-index: 2;
        }

        .mb-hint .button {
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

        .mb-hint .button.red {
          background-color: #e54d3f;
        }

        .mb-hint .button.red:hover {
          background-color: #ce4134;
        }

        .mb-hint .button.nofill {
          border: 1px solid #fff;
        }

        .mb-hint .button.nofill:hover {
          color: #191927;
          background-color: white;
        }
      `}</style>
    </div>
  )
}

Popup.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func
}

export default Popup
