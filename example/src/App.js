import MoneyButton from '@moneybutton/react-money-button'
import React, { Component } from 'react'

// Private key: KwfHwGrVWomkSAgmsQCt4XeG8JSjzMCc2goyeq9FYdLRSLE3kcCo
// const TEST_ADDRESS = 'n3BvaC814dgr3DY7skXaKxWsrPXpJASUX5'
// const TEST_AMOUNT_SATOSHIS = 1000
// const TEST_PAYMENT_OUTPUTS = [
//   {
//     type: 'ADDRESS',
//     address: TEST_ADDRESS,
//     satoshis: TEST_AMOUNT_SATOSHIS
//   }
// ]

export default class App extends Component {
  constructor (props) {
    super(props)
    const initialState = {
      toValue: '5',
      amountValue: '0.1',
      currencyValue: 'USD',
      labelValue: 'Leave a tip!',
      successMessageValue: 'Success!',
      opReturn: 'moneybutton.com',
      outputsValue: JSON.stringify([]),
      clientIdentifierValue: 'some public client identifier',
      buttonIdValue: '93434523234',
      buttonDataValue: JSON.stringify({website: 'www.moneybutton.com', category: 'Awesomeness', description: 'cool platform', owner: 'Money Button'}),
      typeValue: 'tip',
      editableValue: false,
      disabledValue: false
    }

    this.state = Object.assign({}, initialState)
    this.state.currentParams = initialState
    this.state.showButton = true
  }

  onPayment (payment) {
    console.log(
      `react-money-button/example: You clicked Money Button and received a postMessage response:`, payment
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
      return new Promise(resolve => this.setState({ [field]: event.target.checked }, resolve))
    }
  }

  handleEditableChange = async (event) => {
    await this.handleCheckBoxChange('editableValue')(event)
    if (this.state.editableValue) {
      this.setState({
        outputsValue: '[]'
      })
    }
  }

  handleOutputsChange = async event => {
    return this.setState({ outputsValue: event.target.value })
  }

  forceReloadButton = () => {
    this.setState({showButton: false}, () => {
      setTimeout(() => this.setState({showButton: true}), 10)
    })
  }

  render () {
    const currentParams = this.state.currentParams
    let outputsValue
    try {
      outputsValue = JSON.parse(currentParams.outputsValue)
    } catch (err) {
      outputsValue = []
    }
    return (
      <div>
        <header>
          <h1>MoneyButton Example</h1>
        </header>
        <section>
          <form>
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
              <label>Success Message:</label>
              <input
                type='text'
                value={this.state.successMessageValue}
                onChange={this.handleChange('successMessageValue')}
                placeholder={'Success Message'}
              />
            </div>
            <div>
              <label>opReturn:</label>
              <input
                type='text'
                value={this.state.opReturn}
                onChange={this.handleChange('opReturn')}
                placeholder={'opReturn'}
              />
            </div>
            <div>
              <label>outputs:</label>
              <textarea
                cols='40'
                rows='5'
                type='text'
                value={this.state.outputsValue}
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

            <div>
              <label>Editable:</label>
              <input type='checkbox' value={this.state.editableValue} onChange={this.handleEditableChange} />
            </div>

            <div>
              <label>Disabled:</label>
              <input type='checkbox' value={this.state.disabledValue} onChange={this.handleCheckBoxChange('disabledValue')} />
            </div>
          </form>
          <button onClick={this.forceReloadButton}>Reload</button>

          {/* Actual Money Button code */}
          <p>This is how the button looks when rendered:</p>
          {this.state.showButton && (
            <div style={{transform: 'translateY(0)'}}>
              <MoneyButton
                to={this.state.toValue}
                amount={this.state.amountValue}
                currency={this.state.currencyValue}
                editable={this.state.editableValue}
                label={this.state.labelValue}
                successMessage={this.state.successMessageValue}
                opReturn={this.state.opReturn}
                outputs={outputsValue}
                clientIdentifier={this.state.clientIdentifierValue}
                buttonId={this.state.buttonIdValue}
                buttonData={this.state.buttonDataValue}
                type={this.state.typeValue}
                onPayment={this.onPayment.bind(this)}
                onError={this.onError.bind(this)}
                disabled={this.state.disabledValue}
              />
            </div>
          )}
        </section>
      </div>
    )
  }
}
