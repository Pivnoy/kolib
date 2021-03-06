import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { NETWORK, RPC_URL } from "../values";
import { ReadOnlySigner } from "@quipuswap/sdk";
import { createOvens } from "../kolibri_api/kolibri";


const options = {
  name: "Kolibri project",
  iconUrl: "https://ibb.co/Qcsqq30",
  // preferredNetwork: NETWORK,
};

const wallet = new BeaconWallet(options);

let tz = null;


const getActiveAccount = async () => {
  wallet.client.preferredNetwork = NETWORK;
  return await wallet.client.getActiveAccount();
};

const connectWallet = async () => {
  await wallet.clearActiveAccount();
  
  let account = await getActiveAccount();

  if (!account) {
    wallet.client.preferredNetwork = NETWORK;
    await wallet.requestPermissions({
      network: { type: NETWORK },
    });

    await createTezosKit();

    createOvens();

    account = await wallet.client.getActiveAccount();
  }
  
  return { success: true, wallet: account };
};

const disconnectWallet = async () => {
  await wallet.disconnect();
};

const createTezosKit = async () => {
  tz = new TezosToolkit(RPC_URL);
  let acc = await getActiveAccount()
  if (acc) {
    tz.setWalletProvider(wallet);
    tz.setSignerProvider(new ReadOnlySigner(acc.address, acc.publicKey));
  }
}

const getBalanceXtz = async () => {

  return (await tz.tz.getBalance(await wallet.getPKH())).dividedBy(1_000_000).toFixed(2);

}

export {
  connectWallet,
  disconnectWallet,
  getActiveAccount,
  createTezosKit,
  getBalanceXtz,
  tz,
  wallet,
};
