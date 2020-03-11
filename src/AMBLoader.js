import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { MoneyButtonJs } from './money-button-js'

const AMBLoader = ({ amount, currency, label, clientIdentifier, onAuthorizationGiven }) => {
  const ref = useRef()
  useEffect(() => {
    const iframeLoader = new MoneyButtonJs()
    iframeLoader.load().then(async (moneyButton) => {
      const amb = new moneyButton.AMB(ref.current)
      amb.render({
        amount,
        currency,
        label,
        clientIdentifier,
        onAuthorizationGiven
      })
    })
  }, [])

  return (
    <div ref={ref} />
  )
}

AMBLoader.propTypes = {
  amount: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  label: PropTypes.string,
  onAuthorizationGiven: PropTypes.func.isRequired
}

export { AMBLoader }
