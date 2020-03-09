import config from './util/config'

const MONEY_BUTTON_JS_URL = config.get('MONEY_BUTTON_IFRAME_LOADER_URI')

/**
 * Singleton class to load www.moneybutton.com/moneybutton.js
 */
class MoneyButtonJs {
  constructor () {
    if (MoneyButtonJs.instance) {
      return MoneyButtonJs.instance
    }
    MoneyButtonJs.instance = this
    this.promise = new Promise((resolve) => {
      this._resolve = resolve
    })
    if (typeof window !== 'undefined') {
      this._fetchScript()
    }
  }

  _fetchScript () {
    if (window.moneyButton) {
      return this._resolve(window.moneyButton)
    }
    const aScript = document.createElement('script')
    aScript.type = 'text/javascript'
    aScript.src = MONEY_BUTTON_JS_URL
    document.head.appendChild(aScript)
    aScript.onload = () => {
      this._resolve(window.moneyButton)
    }
  }

  async load () {
    return this.promise
  }
}

export { MoneyButtonJs }
