import myContractABI from './myContractABI.js';
import { ethers } from 'ethers';



let provider;
let signer;
let contract; 
let userAddress;

document.getElementById('ConnectButton').addEventListener('click', connectMetaMask);


async function connectMetaMask() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            // Ethers v6 syntax (correct)
            provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            signer = await provider.getSigner(); // Added 'await'
            userAddress = await signer.getAddress();
            
            document.getElementById('ConnectButton').innerHTML = "Connected!";
  
            
            
            
            // Initialize contract
            contract = new ethers.Contract(contractAddress, myContractABI, signer);
        } catch (error) {
            console.error(error);
        }
    } else {
        alert('Please install MetaMask!');
    }
  }


  