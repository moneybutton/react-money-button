/**
 * @class MoneyButton
 */

import PropTypes from 'prop-types'
import queryString from 'query-string'
import Popup from './popup'
import React, { Component } from 'react'

import './styles.css'

const IFRAME_ORIGIN = process.env.MONEY_BUTTON_WEBAPP_PROXY_URI

const IFRAME_URL = `${IFRAME_ORIGIN}/iframe/v2`

export default class MoneyButton extends Component {
  static propTypes = {
    to: PropTypes.string,
    amount: PropTypes.string,
    currency: PropTypes.string,
    label: PropTypes.string,
    hideAmount: PropTypes.bool,
    opReturn: PropTypes.string,
    outputs: PropTypes.array,
    clientIdentifier: PropTypes.string,
    buttonId: PropTypes.string,
    buttonData: PropTypes.string,
    type: PropTypes.string,
    onPayment: PropTypes.func,
    onError: PropTypes.func,
    devMode: PropTypes.bool
  }

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
    window.addEventListener('message', this.handlePostMessage, false)
  }

  componentWillUnmount () {
    window.removeEventListener('message', this.handlePostMessage, false)
  }

  calculateIframeSrc = () => {
    const {
      to,
      amount,
      currency,
      label,
      hideAmount,
      opReturn,
      outputs,
      clientIdentifier,
      buttonId,
      buttonData,
      type,
      devMode
    } = this.props
    const iframeSource = `${IFRAME_URL}?${queryString.stringify({
      to,
      amt: amount,
      ccy: currency,
      lbl: label,
      hamt: hideAmount,
      opd: opReturn,
      os: JSON.stringify(outputs),
      cid: clientIdentifier,
      bid: buttonId,
      bdt: buttonData,
      t: type,
      dev: devMode
    })}`

    return iframeSource
  }

  showPopup (popupMessage, popupTitle, popupType) {
    this.setState({ popupMessage, popupTitle, popupType })
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
    // console.log(`react-money-button: event.data:`, event.data)
    const { onError, onPayment } = this.props
    const { error, size, payment, message } = event.data
    if (error) {
      if (error === 'not logged in') {
        this.showPopup(`We believe in sound digital money for everyone in the world. Join Money Button to make this payment.`, 'Money Button', 'login')
      }
      if (error === 'insufficient balance') {
        this.showPopup('Your balance is too low to make this payment.', 'Low Balance', 'balance')
      }
      if (error === 'compatibility') {
        this.showPopup(message, 'Compatibility', 'compatibility')
      }
      if (error === 'safari privacy') {
        this.showPopup('We believe in sound digital money for everyone in the world. Enable Money Button on Safari to make this payment.', 'Money Button', 'safari privacy')
      }
      if (this.isPaymentError(error)) {
        onError && onError(new Error(error))
      }
    } else if (size) {
      this.setState({ size })
    } else if (payment) {
      onPayment && onPayment(payment)
    }
  }

  isPaymentError = (error) => {
    return error === 'insufficient balance' ||
      error === 'unexpected error'
  }

  render () {
    const {
      popupMessage,
      popupTitle,
      popupType,
      size: {
        width,
        height
      }
    } = this.state

    const iframeSrc = this.calculateIframeSrc()
    if (!iframeSrc) return null
    return (
      <div
        style={{
          position: 'relative',
          display: 'inline-block',
          width,
          height
        }}
      >
        <Popup message={popupMessage} title={popupTitle} type={popupType} onClick={() => this.setState({ popupMessage: null })} />
        <iframe
          ref={f => (this.iframeDOMComponent = f)}
          src={iframeSrc}
          width={width}
          height={height}
          scrolling='no'
          style={{ border: 'none' }}
        />
      </div>
    )
  }
}
