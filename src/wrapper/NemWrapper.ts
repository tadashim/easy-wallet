import nem from 'nem-sdk'

export default class NemWrapper {
  private endpoint: string
  private host: string = process.env.NEM_NODE_HOST
  private port: string = process.env.NEM_NODE_PORT
  private net: number = Number(process.env.NEM_NET)
  constructor() {
    // Setting network and nis.
    // this.net = nem.model.network.data.mainnet.id
    console.log(this.host, this.port, this.net)
    this.endpoint = nem.model.objects.create('endpoint')(this.host, this.port)
  }

  // Create account for nem wallet.
  public createAccount() {
    const walletName = 'self-made-nem-wallet'
    const password = 'self-made-nem-wallet'
    const wallet = nem.model.wallet.createPRNG(walletName, password, this.net)
    const common = nem.model.objects.create('common')(password, '')
    const account = wallet.account[0]
    console.log('createAccount', account)
    nem.crypto.helpers.passwordToPrivatekey(common, account, account.algo)
    return {
      address: account.address,
      privateKey: common.privateKey,
    }
  }

  // Get account.
  public async getAccount(address: string) {
    return await nem.com.requests.account.data(this.endpoint, address)
  }

  // Transaction for NEM.
  public async sendNem(address: string, privateKey: string, amount: number,message: string) {
    const common = nem.model.objects.create('common')('', privateKey)
    const transferTransaction = nem.model.objects.create('transferTransaction')(address, amount, message)
    const transactionEntity = nem.model.transactions.prepare('transferTransaction')(common, transferTransaction, this.net)
    return await nem.model.transactions.send(common, transactionEntity, this.endpoint)
  }

  // Get divisibility for nem.
  public getNemDivisibility(): number {
    return Math.pow(10, 6)
  }
}