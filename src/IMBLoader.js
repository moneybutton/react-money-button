import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { MoneyButtonJs } from './money-button-js'

/**
 * TODO: This component doesn't make any sense any more. With the new IMB api this completely
 * no needed. It's going to be removed before launch IMB.
 */
const IMBLoader = ({ amount, currency, label, clientIdentifier, onPermissionGranted }) => {
  const requestPermission = useCallback(() => {
    const iframeLoader = new MoneyButtonJs()
    iframeLoader.load().then(async (moneyButton) => {
      const imb = new moneyButton.IMB({
        amount,
        currency,
        label,
        clientIdentifier
      })
      await imb.askForPermission()
      onPermissionGranted(imb)
    })
  }, [])

  return (
    <button onClick={requestPermission}>Request permission</button>
  )
}

IMBLoader.propTypes = {
  amount: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  label: PropTypes.string,
  onPermissionGranted: PropTypes.func.isRequired
}

export { IMBLoader }
