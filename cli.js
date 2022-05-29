const meow = require('meow')
const privateKeyToAddress = require('.')

const cli = meow(`
    Usage
      $ magic_eth <private-key>
 git@github.com:ayushch80/eth-privatekey-to-address-js.git   Examples
      $ magic_eth 8be877058b85d730243053d0be51672a7c16a83ab4d28523ce0af46ed770af0b
      0xf2ee8De1673CaA3250F701949f330249A52A727b
`, {
  flags: {}
})

let privateKey = cli.input[0]

if (process.stdin) {
  process.stdin.setEncoding('utf8')
  process.stdin.resume()
  let content = ''
  process.stdin.on('data', (buf) => {
    content += buf.toString()
  })
  setTimeout(() => {
    content = content.trim()

    if (content) {
      privateKey = content
    }

    run()
  }, 10)
} else {
  run()
}

function run() {
  if (!privateKey) {
    console.log('private key argument is required')
    process.exit(1)
  }

  process.stdout.write(privateKeyToAddress(privateKey))
  process.exit(0)
}
