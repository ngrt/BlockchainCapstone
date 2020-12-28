pragma solidity >=0.4.21 <0.6.0;

import "./ERC721Mintable.sol";
import "./Verifier.sol";

contract IVerifier {
    function verifyTx(
        uint[2] memory a,
        uint[2][2] memory b,
        uint[2] memory c, uint[2] memory input
    ) public view returns (bool r);
}

contract SolnSquareVerifier is CustomERC721Token {
    struct Solution {
        uint256 index;
        address _address;
        bool minted;
        bool existing;
    }

    mapping(bytes32 => Solution) private solutions;
    IVerifier verifier;

    event SolutionAdded(uint256 index);

    constructor(string memory name, string memory symbol, address verifierAddress) CustomERC721Token(name, symbol) public {
        verifier = IVerifier(verifierAddress);
    }

    function addSolution(
        uint[2] memory a,
        uint[2][2] memory b,
        uint[2] memory c,
        uint[2] memory input,
        uint256 index) public {

        bytes32 solutionHash = keccak256(abi.encodePacked(input[0], input[1]));
        require(solutions[solutionHash].existing == false, "Solution exists already");
        require(verifier.verifyTx(a, b, c, input), "The verification submitted failed");

        solutions[solutionHash] = Solution(index, msg.sender, false, true);

        emit SolutionAdded(index);
    }

    function mintNFT(address to, uint256 index, uint a, uint b) public {
        bytes32 solutionHash = keccak256(abi.encodePacked(a, b));
        require(solutions[solutionHash].existing == true, "Solution doesn't already exist");
        require(solutions[solutionHash].index == index, "This solution was made for another index.");
        require(solutions[solutionHash].minted == false, "This token has already be minted with this solution.");
        require(solutions[solutionHash]._address == msg.sender, "Only the owner of the solution can mint");

        super.mint(to, index);
        solutions[solutionHash].minted = true;
    }

}
