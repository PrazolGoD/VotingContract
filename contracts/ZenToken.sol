// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
contract ZenToken is ERC20 {

    address public owner;
    uint256 immutable Decimal = 10 * (10 ** 18);
    uint256 immutable Rate = 10;

    constructor(uint256 initialSupply) ERC20("Zenny","ZEN"){
            owner = msg.sender;
            _mint(owner,initialSupply);
        }


    function buyToken() public payable  {
        require(msg.sender!=address(0),"No valid User");
        require(msg.value >= 0 ether,"Insufficient ETH sent");

        uint256 RatedAmount = msg.value * Rate * Decimal;
        _mint(msg.sender,RatedAmount);

        //can i use event to upadete ui semelessly ?

    }

    function priceOfToken() public pure returns(uint256){

        return Rate;

    }


    
}