var Verifier = artifacts.require('Verifier');
var proof = require('../../zokrates/code/square/proof.json');
var wrongProof = require('./wrongProof.json');

contract('Verifier', accounts => {
	
	let contract;
	
	beforeEach(async function () {
		contract = await Verifier.new();
	})
	
	it('givenCorrectProof_whenVerifiy_thenPassVerification', async function () {
		const result = await contract.verifyTx.call(proof.proof.a, proof.proof.b, proof.proof.c, proof.inputs);
		
		assert.equal(result, true);
	})
	
	it('givenWrongProof_whenVerifiy_thenVerificationFails', async function () {
		const result = await contract.verifyTx.call(wrongProof.proof.a, wrongProof.proof.b, wrongProof.proof.c, wrongProof.inputs);
		
		assert.equal(result, false);
	})
	
})