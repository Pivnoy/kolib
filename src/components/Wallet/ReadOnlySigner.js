import { Signer } from "@taquito/taquito";

export class ReadOnlySigner{
  constructor(pkh, pk) {}

  async publicKey() {
    return this.pk;
  }
  async publicKeyHash() {
    return this.pkh;
  }
  async sign() {
    throw new Error("Cannot sign");
  }
  async secretKey() {
    throw new Error("Secret key cannot be exposed");
  }
}
