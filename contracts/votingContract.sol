
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./ZenToken.sol";
contract ZenVoting is ZenToken(999999999 * 10 * (10 ** 18)){


        // mapping(address=>uint8) memberTire;
        // 
        mapping(address=>bool) isVoted;


        uint256 pid=0;
        uint256 PTime;

        struct Proposal{
            uint256 _Pid;
            uint256 _Ptime;
            uint256 _Pvotes;
            uint256 _PendTime;
            string _Pdata;
            
        }


        Proposal[] public proposals;


        function createProposal(string memory data) public  {
            require(msg.sender!=address(0),"we need a valid member ");

            uint256 proposalID=pid;
            pid++;

            uint256 Creationtime = block.timestamp;
            uint256 Endingtime= block.timestamp + 3 minutes;

            Proposal memory newProposal = Proposal({
                _Pid :proposalID,
                _Ptime:Creationtime,
                _Pvotes: 0,
                _PendTime:Endingtime,
                _Pdata:data
            });

            proposals.push(newProposal);

        }


        function voteProposal(uint256 Accesspid, uint8 vote) public  {
            require(proposals[Accesspid]._PendTime >= block.timestamp,"Voting time ended ");
            require(isVoted[msg.sender]!=true,"You Already Voted");
            if (vote == 0){
                // add against vote
                proposals[Accesspid]._Pvotes--;
            }
            else if( vote == 1){
                // add for vote
                proposals[Accesspid]._Pvotes++;
            }

            isVoted[msg.sender]=true;

        }

        function GetProposalVoteCount(uint256 Accesspid) public view returns(uint256){
            require(Accesspid<=proposals.length,"Please enter the valid Proposal ID");

            return proposals[Accesspid]._Pvotes;

        }

        function GetProposalData(uint256 Accesspid) public view returns(string memory){
            require(Accesspid<=proposals.length,"Please enter the valid Proposal ID");

            
            return proposals[Accesspid]._Pdata;
            
        }

        function resultofproposal(uint256 Accesspid) public view returns(string memory){
                
                
                require(proposals[Accesspid]._PendTime > block.timestamp,"vote is still active");
                string memory result;
                if (proposals[Accesspid]._Pvotes < 0){
                    result = "Not Approved";

                }
                if (proposals[Accesspid]._Pvotes > 0){
                    result = "Approved";
                    
                }

                return result;
                


        }
        






}