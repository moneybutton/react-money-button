/**
 * @class MoneyButton
 */

import PropTypes from 'prop-types'
import queryString from 'query-string'
import React, { Component } from 'react'

import './styles.css'

const IFRAME_URL = 'http://localhost:3000/iframe/v2'

export default class MoneyButton extends Component {
  constructor (props) {
    super(props)
    this.state = {
      iframeSource: null
    }
  }

  componentDidMount () {
    let { outputDescriptions } = this.props
    let iframeSource = `${IFRAME_URL}?${queryString.stringify({
      outputDescriptions: JSON.stringify(outputDescriptions)
    })}`
    this.setState({ iframeSource })
  }

  onClick () {
    // TODO: Support postMessage API to get responses from the button such as click
    // Note that we need to rely on the webhook most of the time for security,
    // but a client-side postMessage may be useful for some things, e.g. graphical display
    console.log('You clicked the money button.')
  }

  render () {
    let { iframeSource } = this.state
    return iframeSource !== null ? (
      <iframe
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
  outputDescriptions: PropTypes.any.isRequired
}
