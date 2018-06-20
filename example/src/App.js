import MoneyButton from 'react-money-button'
import React, { Component } from 'react'

// Private key: KwfHwGrVWomkSAgmsQCt4XeG8JSjzMCc2goyeq9FYdLRSLE3kcCo
const TEST_ADDRESS = 'bchtest:qrkmjmfamfdqs5qvadkyrz72v42jk99pvspv4cepp3'
const TEST_AMOUNT_SATOSHIS = 1000
const TEST_OUTPUT_DESCRIPTIONS = [
  {
    type: 'address',
    address: TEST_ADDRESS,
    amountSatoshis: TEST_AMOUNT_SATOSHIS
  }
]

export default class App extends Component {
  render () {
    return (
      <div>
        <header>
          <h1>MoneyButton Example</h1>
        </header>
        <section>
          <p>This is how the button looks when rendered:</p>
          <MoneyButton outputDescriptions={TEST_OUTPUT_DESCRIPTIONS} />
        </section>
      </div>
    )
  }
}
