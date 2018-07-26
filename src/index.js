/**
 * @class MoneyButton
 */

import PropTypes from 'prop-types'
import queryString from 'query-string'
import Popup from './popup'
import React, { Component } from 'react'

import './styles.css'

const IFRAME_ORIGIN = process.env.REACT_APP_MONEY_BUTTON_WEBAPP_IFRAME_URI

const IFRAME_URL = `${IFRAME_ORIGIN}/iframe/v2`

export default class MoneyButton extends Component {
  constructor (props) {
    super(props)
    this.handlePostMessage = this.handlePostMessage.bind(this)
    this.iframeDOMComponent = null // the iframe DOM component will be set on mount
    this.state = {
      iframeSource: null,
      popup: null,
      size: {
        width: '280px',
        height: '50px'
      }
    }
  }

  componentDidMount () {
    const {
      outputs,
      to,
      type,
      amount,
      currency,
      opReturn,
      ownerId,
      buttonId,
      buttonData,
      size,
      color,
      hideAmount,
      dropdown
    } = this.props
    const iframeSource = `${IFRAME_URL}?${queryString.stringify({
      outputs: JSON.stringify(outputs),
      to,
      t: type,
      amt: amount,
      ccy: currency,
      opd: opReturn,
      oid: ownerId,
      bid: buttonId,
      bdt: buttonData
    })}`
    this.setState({ iframeSource })
    // TODO: Connect remaining props
    console.log(
      'TODO: Connect props: size, color, hideAmount, dropdown',
      size,
      color,
      hideAmount,
      dropdown
    )

    // Useful information about iframes in react:
    // https://medium.com/@ebakhtarov/handling-of-iframes-in-react-f038be46ac24
    window.addEventListener('message', this.handlePostMessage, false)
  }

  componentWillUnmount () {
    window.removeEventListener('message', this.handlePostMessage, false)
  }

  showPopup (popup) {
    this.setState({ popup })
  }

  handlePostMessage (event) {
    if (
      !this.iframeDOMComponent ||
      event.source !== this.iframeDOMComponent.contentWindow
    ) {
      // We've received a message from an iframe other than the one that we
      // rendered. Do nothing. TODO: Remove the log in production. This is only
      // here for debugging purposes.
      // console.log(
      //   `react-money-button: postMessage: wrong iframe: ${
      //     event.source
      //   } should be ${this.iframeDOMComponent.contentWindow}`
      // )
      return
    }
    if (event.origin !== IFRAME_ORIGIN) {
      // If the event somehow comes from a diferent place than the official
      // MoneyButton domain, then perhaps the user is trying to hack the app and
      // make it think a payment occurred when it actually did not. Ignore.
      console.log(
        `react-money-button: postMessage: wrong origin: ${
          event.origin
        } should be ${IFRAME_ORIGIN}`
      )
      return
    }
    console.log(`react-money-button: event.data:`, event.data)
    const { onError, onPayment } = this.props
    const { error, size, payment } = event.data
    if (error) {
      if (error === 'not logged in') {
        this.showPopup(error)
      }
      onError && onError(new Error(error))
    } else if (size) {
      this.setState({ size })
    } else if (payment) {
      onPayment && onPayment(payment)
    }
  }

  // shouldComponentUpdate (nextProps, nextState) {
  //   // Guarantee the iframe won't be reloaded even if props or state changes.
  //   // That is because we don't want to reload the page in the iframe. If for
  //   // some reason in the future we want props or state to cause a reload, we
  //   // will need to add some more sophisticated logic here rather than always
  //   // returning false.
  //   if (this.state.iframeSource) {
  //     return false
  //   }
  //   return true
  // }

  render () {
    const { iframeSource, popup, size: { width, height } } = this.state
    if (!iframeSource) return null
    return (
      <div
        style={{
          position: 'relative',
          display: 'inline-block',
          width,
          height,
          marginTop: '200px'
        }}
      >
        <Popup message={popup} onClick={() => this.setState({ popup: null })} />
        <iframe
          ref={f => (this.iframeDOMComponent = f)}
          src={iframeSource}
          width={width}
          height={height}
          scrolling='no'
          style={{ border: 'none' }}
        />
      </div>
    )
  }
}

MoneyButton.propTypes = {
  to: PropTypes.string,
  type: PropTypes.string,
  amount: PropTypes.string,
  currency: PropTypes.string,
  opReturn: PropTypes.string,
  ownerId: PropTypes.string,
  buttonId: PropTypes.string,
  buttonData: PropTypes.string,
  onPayment: PropTypes.func,
  onError: PropTypes.func,
  size: PropTypes.string,
  color: PropTypes.string,
  hideAmount: PropTypes.bool,
  dropdown: PropTypes.bool,
  outputs: PropTypes.array
}
