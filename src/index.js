/**
 * @class MoneyButton
 */

import PropTypes from 'prop-types'
import { loadMoneyButtonJs } from '@moneybutton/javascript-money-button'
import React, { Component } from 'react'

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
    onCryptoOperations: PropTypes.func,
    clientIdentifier: PropTypes.string,
    buttonId: PropTypes.string,
    buttonData: PropTypes.string,
    type: PropTypes.string,
    onPayment: PropTypes.func,
    onError: PropTypes.func,
    onLoad: PropTypes.func,
    devMode: PropTypes.bool
  }

  constructor (props) {
    super(props)
    this.ref = null
  }

  iframeLoader = async () => {
    return loadMoneyButtonJs()
  }

  async componentDidMount () {
    await this.refreshMoneyButton(this.props)
  }

  refreshMoneyButton = async (props) => {
    const iframeLoader = await this.iframeLoader()
    if (!this.ref) {
      return
    }
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
      onCryptoOperations: props.onCryptoOperations,
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
