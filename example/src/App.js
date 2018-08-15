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
  constructor (props) {
    super(props)
    const initialState = {
      toValue: '5',
      amountValue: '1000',
      currencyValue: 'BCH-SAT',
      labelValue: 'Leave a tip!',
      hideAmountValue: 'false',
      opReturnValue: 'moneybutton.com',
      outputsValue: TEST_PAYMENT_OUTPUTS,
      clientIdentifierValue: '1',
      buttonIdValue: '93434523234',
      buttonDataValue: 'somedata',
      typeValue: 'tip'
    }

    this.state = Object.assign({}, initialState)
    this.state.currentParams = initialState
    this.state.showButton = true
  }

  onPayment (payment) {
    console.log(
      `react-money-button/example: You clicked the money button and received a postMessage response: ${payment}`
    )
  }
  onError (err) {
    console.log('Error', err)
  }

  handleChange (field) {
    return event => {
      event.preventDefault()
      this.setState({ [field]: event.target.value })
    }
  }

  handleCheckBoxChange (field) {
    return event => {
      this.setState({ [field]: event.target.checked })
    }
  }

  handleOutputsChange = async event => {
    const newVale = JSON.parse(event.target.value)
    return this.setState({ outputsValue: newVale })
  }

  updateParameters = async event => {
    event.preventDefault()
    const {
      toValue,
      amountValue,
      currencyValue,
      labelValue,
      hideAmountValue,
      opReturnValue,
      outputsValue,
      clientIdentifierValue,
      buttonIdValue,
      buttonDataValue,
      typeValue
    } = this.state
    this.setState(
      {
        currentParams: {
          toValue,
          amountValue,
          currencyValue,
          labelValue,
          hideAmountValue,
          opReturnValue,
          outputsValue,
          clientIdentifierValue,
          buttonIdValue,
          buttonDataValue,
          typeValue
        },
        showButton: false
      },
      () => {
        setTimeout(() => this.setState({ showButton: true }), 0)
      }
    )
  }

  render () {
    const currentParams = this.state.currentParams
    return (
      <div>
        <header>
          <h1>MoneyButton Example</h1>
        </header>
        <section>
          <form onSubmit={this.updateParameters}>
            <div>
              <label>to:</label>
              <input
                type='text'
                value={this.state.toValue}
                onChange={this.handleChange('toValue')}
                placeholder={'to'}
              />
            </div>
            <div>
              <label>amount:</label>
              <input
                type='text'
                value={this.state.amountValue}
                onChange={this.handleChange('amountValue')}
                placeholder={'amount'}
              />
            </div>
            <div>
              <label>currency:</label>
              <input
                type='text'
                value={this.state.currencyValue}
                onChange={this.handleChange('currencyValue')}
                placeholder={'currency'}
              />
            </div>
            <div>
              <label>label:</label>
              <input
                type='text'
                value={this.state.labelValue}
                onChange={this.handleChange('labelValue')}
                placeholder={'label'}
              />
            </div>
            <div>
              <label>hideAmount:</label>

              <input
                type='checkbox'
                checked={this.state.hideAmountValue}
                onChange={this.handleCheckBoxChange('hideAmountValue')}
                placeholder={'hideAmount'}
              />
            </div>
            <div>
              <label>opReturn:</label>
              <input
                type='text'
                value={this.state.opReturnValue}
                onChange={this.handleChange('opReturnValue')}
                placeholder={'opReturn'}
              />
            </div>
            <div>
              <label>outputs:</label>
              <textarea
                cols='40'
                rows='5'
                type='text'
                value={JSON.stringify(this.state.outputsValue)}
                onChange={this.handleOutputsChange}
                placeholder={'ouptuts'}
              />
            </div>
            <div>
              <label>clientIdentifier:</label>
              <input
                type='text'
                value={this.state.clientIdentifierValue}
                onChange={this.handleChange('clientIdentifierValue')}
                placeholder={'clientIdentifier'}
              />
            </div>

            <div>
              <label>buttonId:</label>
              <input
                type='text'
                value={this.state.buttonIdValue}
                onChange={this.handleChange('buttonIdValue')}
                placeholder={'buttonId'}
              />
            </div>

            <div>
              <label>buttonData:</label>
              <input
                type='text'
                value={this.state.buttonDataValue}
                onChange={this.handleChange('buttonDataValue')}
                placeholder={'buttonData'}
              />
            </div>

            <div>
              <label>type:</label>

              <select value={this.state.typeValue} onChange={this.handleChange('typeValue')}>
                <option vale='tip'>tip</option>
                <option vale='buy'>buy</option>
              </select>
            </div>

            <button>Update</button>
          </form>

          {/* ACtual Money Button code */}
          <p>This is how the button looks when rendered:</p>
          {this.state.showButton && (
            <MoneyButton
              to={currentParams.toValue}
              amount={currentParams.amountValue}
              currency={currentParams.currencyValue}
              label={currentParams.labelValue}
              hideAmount={currentParams.hideAmountValue === 'true'}
              opReturn={currentParams.opReturnValue}
              outputs={currentParams.outputsValue}
              clientIdentifier={currentParams.clientIdentifierValue}
              buttonId={currentParams.buttonIdValue}
              buttonData={currentParams.buttonDataValue}
              type={currentParams.typeValue}
              onPayment={this.onPayment.bind(this)}
              onError={this.onError.bind(this)}
            />
          )}
        </section>
      </div>
    )
  }
}
