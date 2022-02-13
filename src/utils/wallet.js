import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";

const preferredNetwork = "hangzhounet";

const options = {
  name: "Kolibri project",
  iconUrl: "https://ibb.co/Qcsqq30",
  preferredNetwork: preferredNetwork,
};

export const rpcURL = "https://hangzhounet.smartpy.io";

export const wallet = new BeaconWallet(options);

export const tz = new TezosToolkit(rpcURL);

tz.setWalletProvider(wallet);

const getActiveAccount = async () => {
  return await wallet.client.getActiveAccount();
};

const connectWallet = async () => {
  let account = await wallet.client.getActiveAccount();

  if (!account) {
    await wallet.requestPermissions({
      network: { type: preferredNetwork },
    });
    tz.setWalletProvider(wallet);
    account = await wallet.client.getActiveAccount();
  }
  return { success: true, wallet: account };
};

const disconnectWallet = async () => {
  await wallet.disconnect();
  return { success: true, wallet: null };
};

const checkIfWalletConnected = async (wallet) => {
  try {
    const activeAccount = await wallet.client.getActiveAccount();
    if (!activeAccount) {
      await wallet.client.requestPermissions({
        type: { network: preferredNetwork },
      });
    }
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

const getBalanceXtz = async() => {
    
  return (await tz.tz.getBalance(await wallet.getPKH())).toNumber()/1_000_000 + 'ꜩ';

}

export {
  connectWallet,
  disconnectWallet,
  getActiveAccount,
  checkIfWalletConnected,
  getBalanceXtz
};
