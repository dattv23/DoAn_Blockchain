import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    if (typeof window.ethereum === 'undefined') {
        throw new Error('Ethereum provider not found');
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

    return transactionContract;
}

export const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState('');
    const [formData, setFormData] = useState({ addressTo: '', amount: '', keyword: '', message: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));

    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    }

    const getAllTransactions = async () => {
        try {
            if (!ethereum)
                return alert("Please install metamask");
            const transactionContract = getEthereumContract();
            const avaiableTransactions = await transactionContract.getAllTransactions();
            console.log(avaiableTransactions);
        } catch (error) {
            console.log(error);
        }
    }

    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum)
                return alert("Please install metamask");

            const accounts = await ethereum.request({ method: 'eth_accounts' });

            if (accounts.length) {
                setCurrentAccount(accounts[0]);

                // getAllTransactions();
            } else {
                console.log('No accounts found');
            }
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object.");
        }
    }

    const checkIfTransactionsExist = async () => {
        try {
            const transactionContract = getEthereumContract();
            const transactionCount = await transactionContract.getTransactionCount();

            window.localStorage.setItem("transactionCount", transactionCount);
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object.");
        }
    }

    const connectWallet = async () => {
        try {
            if (!ethereum)
                return alert("Please install metamask");

            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object.");
        }
    }

    const sendTransaction = async () => {
        try {
            if (!ethereum)
                return alert("Please install metamask");
            const { addressTo, amount, keyword, message } = formData;
            const transactionContract = getEthereumContract();
            const parseAmount = ethers.parseEther(amount);
            console.log(parseAmount._hex);
            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: '0x5208', // 21000 GWEI
                    value: ethers.toBeHex(parseAmount),
                }]
            });

            const transactionHash = await transactionContract.addToBlockChain(addressTo, parseAmount, message, keyword);

            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            setIsLoading(false);
            console.log(`Success - ${transactionHash.hash}`);

            const transactionCount = await transactionContract.getTransactionCount();

            setTransactionCount(transactionCount.toNumber());
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object.");
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
        checkIfTransactionsExist();
    }, []);

    return (
        <TransactionContext.Provider value={{ connectWallet, currentAccount, formData, sendTransaction, handleChange, isLoading }}>
            {children}
        </TransactionContext.Provider>
    )
}