import MoneyButtonConfigBuilder from '@moneybutton/config'

const config = new MoneyButtonConfigBuilder()
  .addValue('MONEY_BUTTON_WEBAPP_PROXY_URI', process.env.MONEY_BUTTON_WEBAPP_PROXY_URI)
  .build()

export default config
