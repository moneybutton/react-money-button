import MoneyButton from 'react-money-button'
import React, { Component } from 'react'

// Private key: KwfHwGrVWomkSAgmsQCt4XeG8JSjzMCc2goyeq9FYdLRSLE3kcCo
const TEST_ADDRESS = 'bchtest:qrkmjmfamfdqs5qvadkyrz72v42jk99pvspv4cepp3'
const TEST_AMOUNT_SATOSHIS = 1000
const TEST_PAYMENT_OUTPUTS = [
  {
    type: 'address',
    address: TEST_ADDRESS,
    amountSatoshis: TEST_AMOUNT_SATOSHIS
  }
]

export default class App extends Component {
  onPayment (data) {
    console.log(
      `react-money-button/example: You clicked the money button and received a postMessage response: ${data}`
    )
  }

  render () {
    return (
      <div>
        <header>
          <h1>MoneyButton Example</h1>
        </header>
        <section>
          <p>This is how the button looks when rendered:</p>
          <MoneyButton
            paymentOutputs={TEST_PAYMENT_OUTPUTS}
            onPayment={this.onPayment.bind(this)}
          />
        </section>
      </div>
    )
  }
}
