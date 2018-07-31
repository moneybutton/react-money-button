import MoneyButtonConfigBuilder from 'mb-config'

const config = new MoneyButtonConfigBuilder()
  .addValue('MONEY_BUTTON_WEBAPP_IFRAME_URI', process.env.MONEY_BUTTON_WEBAPP_IFRAME_URI)
  .build()

export default config
