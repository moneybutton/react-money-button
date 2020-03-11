import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { MoneyButtonJs } from './money-button-js'

const IMBLoader = ({ amount, currency, label, clientIdentifier, onPermissionGranted }) => {
  const ref = useRef()
  useEffect(() => {
    const iframeLoader = new MoneyButtonJs()
    iframeLoader.load().then(async (moneyButton) => {
      const imb = new moneyButton.IMB(ref.current)
      imb.render({
        amount,
        currency,
        label,
        clientIdentifier,
        onPermissionGranted
      })
    })
  }, [])

  return (
    <div ref={ref} />
  )
}

IMBLoader.propTypes = {
  amount: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  label: PropTypes.string,
  onPermissionGranted: PropTypes.func.isRequired
}

export { IMBLoader }
