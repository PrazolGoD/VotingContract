import myContractABI from './myContractABI.js';
import { ethers } from 'ethers';




let provider;
let signer;
let contract; 
let userAddress;

const contractAddress = "0x282b8648B33EB0EA0fa22977593d999732D2E782"; 

document.getElementById('ConnectButton').addEventListener('click', connectMetaMask);
document.getElementById('BuyTokenButton').addEventListener('click', buyToken);


async function connectMetaMask() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            // Ethers v6 syntax (correct)
            provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            signer = await provider.getSigner(); // Added 'await'
            userAddress = await signer.getAddress();
            
            document.getElementById('ConnectButton').innerHTML = "Connected!";
            document.getElementById('BuySection').style.display = 'block';
  
            
            
            
            // Initialize contract
            contract = new ethers.Contract(contractAddress, myContractABI, signer);
        } catch (error) {
            console.error(error);
        }
    } else {
        alert('Please install MetaMask!');
    }
  }

  async function buyToken() {
    const amount = document.getElementById('BuyAmount').value;




    if (!amount || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }

    try {
        const weiAmount = ethers.parseEther(amount);
        console.log("Sending transaction with value:", weiAmount.toString());
        
        // Add this check
        if (!contract.buyToken) {
            throw new Error("buyToken function not found in contract");
        }

        const tx = await contract.buyToken({
            value: weiAmount
        });
        console.log("Transaction hash:", tx.hash);
        
        await tx.wait();
        alert('Tokens purchased successfully!');
    } catch (error) {
        console.error(error);
        alert('Transaction failed!');
    }
}





  