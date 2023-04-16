import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

export function useWalletAddress() {
    const [walletAddress, setWalletAddress] = useState('');

    useEffect(() => {
        async function fetchWalletAddress() {
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                await window.ethereum.enable();
                const signer = provider.getSigner();
                const signerAddress = await signer.getAddress();
                setWalletAddress(signerAddress);
            } catch (error) {
                console.error(error);
            }
        }
        fetchWalletAddress();
    }, []);

    return walletAddress;
}
