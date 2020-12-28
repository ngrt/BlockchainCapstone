const HDWallet = require('truffle-hdwallet-provider');
const MNEMONIC = 'theory table dumb message atom giant layer lawn anxiety quote anger axis';

module.exports = {
	networks: {
		development: {
			host: "127.0.0.1",     // Localhost (default: none)
			port: 7545,            // Standard Ethereum port (default: none)
			network_id: "*",       // Any network (default: none)
		},
		rinkeby: {
			provider: () => new HDWallet(MNEMONIC, `https://rinkeby.infura.io/v3/37b03f66c2b94ccb8f0046f1e16113c3`),
			network_id: 4,       // Ropsten's id
			gas: 4712388,
			gasPrice: 100000000000,
			confirmations: 2,    // # of confs to wait between deployments. (default: 0)
			timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
			skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
		}
	}
}
