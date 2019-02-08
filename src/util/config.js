import MoneyButtonConfigBuilder from '@moneybutton/config'

const config = new MoneyButtonConfigBuilder()
  .addValueWithDefault('MONEY_BUTTON_IFRAME_LOADER_URI', process.env.MONEY_BUTTON_IFRAME_LOADER_URI, 'https://www.moneybutton.com/moneybutton.js')
  .build()

export default config
