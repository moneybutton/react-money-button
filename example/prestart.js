const fs = require('fs')

let port = '5003'
if (process.env.MONEY_BUTTON_REACT_MONEY_BUTTON_EXAMPLE_PORT) {
  port = process.env.MONEY_BUTTON_REACT_MONEY_BUTTON_EXAMPLE_PORT
}
fs.writeFile('.env', `PORT=${port}\nSKIP_PREFLIGHT_CHECK=true\nBROWSER=none\n`, 'utf8', () => {
  console.log('.env file ready')
})
