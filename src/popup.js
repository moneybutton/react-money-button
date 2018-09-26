/**
 * @class Popup
 */

import PropTypes from 'prop-types'
import React from 'react'

const BASE_URL = process.env.MONEY_BUTTON_WEBAPP_PROXY_URI

class Popup extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    message: PropTypes.string,
    type: PropTypes.string,
    onClick: PropTypes.func.isRequired
  }
  componentDidMount () {
    document.addEventListener('mousedown', this.handleClickOutside)
  }

  componentWillUnmount () {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  /**
  * Set the wrapper ref
  */
  setWrapperRef = (node) => {
    this.wrapperRef = node
  }

  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside = (event) => {
    const { onClick } = this.props
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      onClick()
    }
  }

  render () {
    const { message, title, type } = this.props

    if (!message) return null
    return (
      <div>
        <div className='blur-background__moneybutton' />

        <div className='hint__moneybutton' ref={this.setWrapperRef}>
          <div className='content__moneybutton'>
            <span className='title__moneybutton'>{title}</span>
            <span className='text__moneybutton'>{message}</span>
            <div className='close__moneybutton' />
            {type === 'login' &&
              <div className='buttonsWrapper__moneybutton'>
                <a href={`${BASE_URL}/register`} target='_blank' rel='noopener noreferrer' className='button__moneybutton red__moneybutton'>Sign Up</a>
                <a href={`${BASE_URL}/login`} target='_blank' rel='noopener noreferrer' className='button__moneybutton nofill__moneybutton'>Log In</a>
              </div>
            }
            {type === 'balance' &&
              <div className='buttonsWrapper__moneybutton'>
                <a href='#' target='_blank' rel='noopener noreferrer' className='button__moneybutton red__moneybutton add__moneybutton'>Add Money</a>
              </div>
            }
            {type === 'safari privacy' &&
              <div className='buttonsWrapper__moneybutton'>
                <a href='https://blog.moneybutton.com/2018/09/24/how-to-enable-money-button-on-safari-and-ios/' target='_blank' rel='noopener noreferrer' className='button__moneybutton red__moneybutton add__moneybutton'>Enable</a>
              </div>
            }
          </div>
        </div>
        <style jsx>{`

        .hint__moneybutton {
          min-width: 254px;
          position: relative;
        }

        .hint__moneybutton a {
          text-decoration: none
        }

        .hint__moneybutton .close__moneybutton {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1;
        }

        .blur-background__moneybutton {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(255, 255, 255, 0.55);
        }

        .hint__moneybutton .content__moneybutton {
          color: white;
          background-color: #191927;
          padding: 30px;
          border-radius: 10px;
          position: fixed;
          bottom: 19px;
          bottom: 10px;
          right: 10px;
          display: flex;
          flex-direction: column;
          align-content: center;
          align-items: flex-start;
          box-sizing: border-box;
          min-width: 260px;
          max-width: 350px;
        }

        .hint__moneybutton .title__moneybutton {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 10px;
        }

        .hint__moneybutton .text__moneybutton {
          text-align: left;
          font-size: 14px;
          margin-bottom: 20px;
        }

        .hint__moneybutton .buttonsWrapper__moneybutton {
          width: 100%;
          display: flex;
          justify-content: space-between;
          position: relative;
          z-index: 2;
        }

        .hint__moneybutton .button__moneybutton {
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

        .hint__moneybutton .button__moneybutton.add__moneybutton {
          width: auto;
        }

        .hint__moneybutton .button__moneybutton.red__moneybutton {
          background-color: #e54d3f;
        }

        .hint__moneybutton .button__moneybutton.red__moneybutton:hover {
          background-color: #ce4134;
        }

        .hint__moneybutton .button__moneybutton.nofill__moneybutton {
          border: 1px solid #fff;
        }

        .hint__moneybutton .button__moneybutton.nofill__moneybutton:hover {
          color: #191927;
          background-color: white;
        }
      `}</style>
      </div>

    )
  }
}

export default Popup
