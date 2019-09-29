/**
 * @class MoneyButton
 */

import PropTypes from 'prop-types'
import React, { Component } from 'react'
import config from './util/config'

const MONEY_BUTTON_JS_URL = config.get('MONEY_BUTTON_IFRAME_LOADER_URI')

class AsyncIframeLoader {
  constructor () {
    this.promise = new Promise((resolve) => {
      this._resolve = resolve
    })
  }

  fetchScript () {
    const aScript = document.createElement('script')
    aScript.type = 'text/javascript'
    aScript.src = MONEY_BUTTON_JS_URL
    document.head.appendChild(aScript)
    MoneyButton.loadingLibrary = true
    aScript.onload = () => {
      this._resolve(window.moneyButton)
    }
  }

  async iframeLoader () {
    return this.promise
  }
}

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
    cryptoOperations: PropTypes.array,
    clientIdentifier: PropTypes.string,
    buttonId: PropTypes.string,
    buttonData: PropTypes.string,
    type: PropTypes.string,
    onPayment: PropTypes.func,
    onError: PropTypes.func,
    onLoad: PropTypes.func,
    devMode: PropTypes.bool
  }

  static asyncIframeLoader = new AsyncIframeLoader()

  constructor (props) {
    super(props)
    this.ref = null
  }

  iframeLoader = async () => {
    return MoneyButton.asyncIframeLoader.iframeLoader()
  }

  async componentDidMount () {
    MoneyButton.asyncIframeLoader.fetchScript()
    await this.refreshMoneyButton(this.props)
  }

  refreshMoneyButton = async (props) => {
    const iframeLoader = await this.iframeLoader()
    iframeLoader.render(this.ref, this.createParams(props))
  }

  shouldComponentUpdate (nextProps) {
    this.refreshMoneyButton(nextProps)
    return false
  }

  createParams = (props) => {
    return {
      to: props.to,
      amount: props.amount,
      currency: props.currency,
      label: props.label,
      successMessage: props.successMessage,
      opReturn: props.opReturn,
      outputs: props.outputs,
      cryptoOperations: props.cryptoOperations,
      clientIdentifier: props.clientIdentifier,
      buttonId: props.buttonId,
      buttonData: props.buttonData,
      type: props.type,
      onPayment: props.onPayment,
      onError: props.onError,
      onLoad: props.onLoad,
      editable: props.editable,
      disabled: props.disabled,
      devMode: props.devMode
    }
  }

  setRef = (r) => {
    this.ref = r
  }

  render () {
    return (
      <div ref={this.setRef} />
    )
  }
}
