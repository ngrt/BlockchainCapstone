var Verifier = artifacts.require('Verifier');
var SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
var proof = require('../../zokrates/code/square/proof.json');
var wrongProof = require('./wrongProof.json');

contract('SolnSquareVerifier', accounts => {
	
	let solnSquareVerifierContract;
	let verifierContract;
	const account_one = accounts[0];
	
	
	beforeEach(async function () {
		verifierContract = await Verifier.new();
		solnSquareVerifierContract = await SolnSquareVerifier.new("Estate", "EST", verifierContract.address, {from: account_one});
		console.log(solnSquareVerifierContract)
	})
	
	it('givenCorrectProof_whenMint_thenTokenMint', async function () {
		await solnSquareVerifierContract.addSolution(
			proof.proof.a,
			proof.proof.b,
			proof.proof.c,
			proof.inputs,
			1);
		await solnSquareVerifierContract.mintNFT(account_one, 1, proof.inputs[0], proof.inputs[1], {from: account_one});
		
		const totalSupply = await solnSquareVerifierContract.totalSupply.call();
		
		assert.equal(totalSupply, 1);
	})
	
	it('givenSameProof_whenVerifiedSameTwice_thenOneTokenMint', async function () {
		await solnSquareVerifierContract.addSolution(
			proof.proof.a,
			proof.proof.b,
			proof.proof.c,
			proof.inputs,
			1);
		await solnSquareVerifierContract.mintNFT(account_one, 1, proof.inputs[0], proof.inputs[1], {from: account_one});
		
		try {
			await solnSquareVerifierContract.addSolution(
				proof.proof.a,
				proof.proof.b,
				proof.proof.c,
				proof.inputs,
				2);
			await solnSquareVerifierContract.mintNFT(account_one, 1, proof.inputs[0], proof.inputs[1], {from: account_one});
			
			assert.fail("Should have thrown an error")
		} catch (error) {
			assert.notEqual(error.message.search("Solution exists already"), -1);
		}
		
		const totalSupply = await solnSquareVerifierContract.totalSupply.call();
		
		assert.equal(totalSupply, 1);
	})
	
	it('givenWrongProof_whenMint_thenTokenNotMint', async function () {
		try {
			await solnSquareVerifierContract.addSolution(
				wrongProof.proof.a,
				wrongProof.proof.b,
				wrongProof.proof.c,
				wrongProof.inputs,
				1);
			assert.fail("Should have thrown an error")
		} catch (error) {
			assert.notEqual(error.message.search("The verification submitted failed"), -1);
		}
		
		const totalSupply = await solnSquareVerifierContract.totalSupply.call();
		assert.equal(totalSupply, 0);
	})
	
})