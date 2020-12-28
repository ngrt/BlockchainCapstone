var Verifier = artifacts.require("./Verifier.sol");
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");

module.exports = async function (deployer) {
	await deployer.deploy(Verifier);
	await deployer.deploy(SolnSquareVerifier, "Estate", "EST", Verifier.address);
};
