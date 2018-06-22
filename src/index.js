/**
 * @class MoneyButton
 */

import PropTypes from 'prop-types'
import queryString from 'query-string'
import React, { Component } from 'react'

import './styles.css'

const IFRAME_ORIGIN = 'http://localhost:3000'
const IFRAME_URL = `${IFRAME_ORIGIN}/iframe/v2`

export default class MoneyButton extends Component {
  constructor (props) {
    super(props)
    this.iframeDOMComponent = null // the iframe DOM component will be set on mount
    this.state = {
      iframeSource: null
    }
  }

  componentDidMount () {
    let { paymentOutputs } = this.props
    let iframeSource = `${IFRAME_URL}?${queryString.stringify({
      paymentOutputs: JSON.stringify(paymentOutputs)
    })}`
    this.setState({ iframeSource })

    // Useful information about iframes in react:
    // https://medium.com/@ebakhtarov/handling-of-iframes-in-react-f038be46ac24
    window.addEventListener('message', this.handlePostMessage.bind(this))
  }

  componentWillUnmount () {
    window.removeEventListener('message')
  }

  handlePostMessage (event) {
    if (event.source !== this.iframeDOMComponent.contentWindow) {
      // We've received a message from an iframe other than the one that we
      // rendered. Do nothing. TODO: Remove the log in production. This is only
      // here for debugging purposes.
      console.log(
        `react-money-button: postMessage: wrong iframe: ${
          event.source
        } should be ${this.iframeDOMComponent.contentWindow}`
      )
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
    if (this.props.onPayment) {
      console.log(`react-money-button: event.data: ${event.data}`)
      // this.props.onPayment(event)
      this.props.onPayment(event.data)
    }
  }

  shouldComponentUpdate () {
    // Guarantee the iframe won't be reloaded even if props or state changes.
    // That is because we don't want to reload the page in the iframe. If for
    // some reason in the future we want props or state to cause a reload, we
    // will need to add some more sophisticated logic here rather than always
    // returning false.
    if (this.state.iframeSource) {
      return false
    }
    return true
  }

  render () {
    let { iframeSource } = this.state
    return iframeSource !== null ? (
      <iframe
        ref={f => (this.iframeDOMComponent = f)}
        src={iframeSource}
        width='100px'
        height='40px'
        scrolling='no'
        style={{ border: 'none' }}
      />
    ) : null
  }
}

MoneyButton.propTypes = {
  paymentOutputs: PropTypes.any.isRequired
}
