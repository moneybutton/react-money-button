/**
 * @class MoneyButton
 */

import PropTypes from 'prop-types'
import queryString from 'query-string'
import Popup from './popup'
import React, { Component } from 'react'
import config from './util/config'

import './styles.css'
import { PostMessageClient } from '@moneybutton/postmessage-client'

const IFRAME_ORIGIN = config.get('MONEY_BUTTON_WEBAPP_PROXY_URI')
const IFRAME_URL = `${IFRAME_ORIGIN}/iframe/v2`

export default class MoneyButton extends Component {
  static propTypes = {
    to: PropTypes.string,
    amount: PropTypes.string,
    editable: PropTypes.bool,
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

  sendInitialAttributes = (payload, topic) => {
    this.postMessageClient.send('initial-attributes', this.calculateButtonParameters(this.props))
  }

  componentDidMount () {
    this.postMessageClient = new PostMessageClient(this.iframeDOMComponent.contentWindow)
    this.postMessageClient.subscribe('ready', this.sendInitialAttributes)
    this.postMessageClient.subscribe('payment-success', this.onPaymentSuccess)
    this.postMessageClient.subscribe('error.insufficient-balance', this.onError)
    this.postMessageClient.subscribe('error.unexpected-error', this.onError)
    this.postMessageClient.subscribe('error.not-logged-in', this.onError)
    this.postMessageClient.start()
  }

  onPaymentSuccess = (payload) => {
    const { payment } = payload
    this.props.onPayment && this.props.onPayment(payment)
  }

  componentWillUnmount () {
    this.postMessageClient.finalize()
  }

  calculateButtonParameters = (props) => {
    const {
      to,
      amount,
      currency,
      label,
      successMessage,
      hideAmount,
      opReturn,
      outputs,
      clientIdentifier,
      buttonId,
      buttonData,
      type,
      devMode,
      editable,
      disabled
    } = props

    return {
      to,
      amt: amount,
      ccy: currency,
      lbl: label,
      scsmsg: successMessage,
      hamt: hideAmount,
      opd: opReturn,
      os: JSON.stringify(outputs),
      cid: clientIdentifier,
      bid: buttonId,
      bdt: buttonData,
      t: type,
      dev: devMode,
      edt: editable,
      dsbd: disabled
    }
  }

  calculateIframeSrc = () => {
    const iframeSource = `${IFRAME_URL}?${queryString.stringify({format: 'postmessage'})}`
    return iframeSource
  }

  componentDidUpdate () {
    this.postMessageClient.send('attributes-updated', this.calculateButtonParameters(this.props))
  }

  onError = (eventData) => {
    const { onError } = this.props
    const { error, popup } = eventData
    if (popup) {
      this.setState({popup})
    } else if (error) {
      if (this.isPaymentError(error)) {
        onError && onError(new Error(error))
      }
    }
  }

  isPaymentError = (error) => {
    return error === 'insufficient balance' ||
      error === 'unexpected error'
  }

  render () {
    const {
      popup,
      size: {
        width,
        height
      }
    } = this.state
    const iframeSrc = this.calculateIframeSrc()
    console.log('popup en render', popup)
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
        <Popup popup={popup} onClick={() => this.setState({ popup: null })} />
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
