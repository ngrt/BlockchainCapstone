var CustomERC721Token = artifacts.require('CustomERC721Token');

contract('CustomERC721Token', accounts => {
	
	const account_one = accounts[0];
	const account_two = accounts[1];
	let contract;
	
	describe('match erc721 spec', function () {
		beforeEach(async function () {
			contract = await CustomERC721Token.new("Estate", "EST", {from: account_one});
			
			await contract.mint(account_two, 1, {from: account_one});
			await contract.mint(account_two, 2, {from: account_one});
			await contract.mint(account_two, 3, {from: account_one});
		})
		
		it('should return total supply', async function () {
			const totalSupply = await contract.totalSupply.call();
			
			assert.equal(totalSupply, 3, "Total supply should be equal to 3");
		})
		
		it('should get token balance', async function () {
			const tokenBalance = await contract.balanceOf.call(account_two);
			
			assert.equal(parseInt(tokenBalance, 10), 3, "The token balance should be equal to 3")
		})
		
		// token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
		it('should return token uri', async function () {
			const tokenURI = await contract.tokenURI.call(1);
			
			assert.equal(tokenURI, 'https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1', "The token")
		})
		
		it('should transfer token from one owner to another', async function () {
			// WHEN
			await contract.transferFrom(account_two, account_one, 1, {from: account_two});
			
			// THEN
			const newOwner = await contract.ownerOf.call(1);
			assert.equal(newOwner, account_one);
		})
	});
	
	describe('have ownership properties', function () {
		beforeEach(async function () {
			contract = await CustomERC721Token.new("Estate", "EST", {from: account_one});
		})
		
		it('should fail when minting when address is not contract owner', async function () {
			try {
				await contract.mint(account_two, 1, {from: account_two})
				assert.fail("Should have thrown an error")
			} catch (error) {
				assert.notEqual(error.message.search('Caller must be the owner.'), -1)
			}
		})
		
		it('should return contract owner', async function () {
			// GIVEN
			await contract.mint(account_two, 1, {from: account_one});
			
			//WHEN
			const owner = await contract.ownerOf.call(1);
			
			// THEN
			assert.equal(owner, account_two);
		})
	});
})