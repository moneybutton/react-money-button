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
  onPayment (payment) {
    console.log(
      `react-money-button/example: You clicked the money button and received a postMessage response: ${payment}`
    )
  }
  onError (err) {
    console.log('Error', err)
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
            to='bchtest:qz2dcdn8knkadgz8fjgue8c5la7pshggt5c4e3swsk'
            amount='1000'
            currency='BCH-SAT'
            label='Leave a tip!'
            hideAmount={false}
            opReturn='yours.org'
            outputs={TEST_PAYMENT_OUTPUTS}
            clientIdentifier='1'
            buttonId='93434523234'
            buttonData='somedata'
            type='tip'
            onPayment={this.onPayment.bind(this)}
            onError={this.onError.bind(this)}
          />
        </section>
      </div>
    )
  }
}
