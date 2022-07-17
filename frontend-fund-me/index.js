import { ethers } from "./ether.js";
import { contractAddress, abi } from "./constants.js";

const connectButton = document.querySelector(".connect-btn");
const fundButton = document.querySelector(".fund-btn");
const withdraw = document.querySelector(".withdraw");
const getBalanceButton = document.querySelector(".get-balance");

connectButton.addEventListener("click", async () => {
  try {
    if (window.ethereum !== "undefined") {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      connectButton.textContent = "Connected";
    } else {
      console.log("No metamask");
    }
  } catch (error) {
    console.log(error);
  }
});

getBalanceButton.addEventListener("click", async () => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const balance = await provider.getBalance(contractAddress);
    console.log(ethers.utils.formatEther(balance));
  } catch (error) {
    console.log(error);
  }
});

fundButton.addEventListener("click", async () => {
  const inputValue = document.querySelector(".eth-amount").value;
  const ethAmount = ethers.utils.parseEther(inputValue);
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const fundMe = new ethers.Contract(contractAddress, abi, signer);
    const transaction = await fundMe.fund({
      value: ethAmount,
    });
    transaction.wait(1);

    console.log(transaction);
  } catch (error) {
    console.log(error);
  }
});

withdraw.addEventListener("click", async () => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const fundMe = new ethers.Contract(contractAddress, abi, signer);

    const transaction = await fundMe.withdraw();
    transaction.wait(1);
  } catch (error) {
    console.log(error);
  }
});
