import nem from 'nem-sdk'
import encoding from 'encoding-japanese'

export default class nemWrapper {
	endpoint: string = ''
	host: string = ''
	port: string = ''
	net: string = ''

	constructor() {
		// NIS設定
		this.host = 'https://aqualife2.supernode.me'
		this.port = '7891'
		this.net = nem.model.network.data.mainnet.id
		this.endpoint = nem.model.objects.create("endpoint")(this.host, this.port)
	}

	// NISの状態確認
	async isNIS() {
		let result = await nem.com.requests.endpoint.heartbeat(this.endpoint)
		if (result.message = 'ok') {
			return true
		} else {
			return false
		}
	}

	// アカウント作成
	async createAccount() {
		let walletName = "wallet"
		let password = "wallet"
		let wallet = nem.model.wallet.createPRNG(walletName, password, this.net)
		let common = nem.model.objects.create("common")(password, "")
		let account = wallet.account[0]
		nem.crypto.helpers.passwordToPrivatekey(common, account, account.algo)
		let result = {
			address: account.address,
			privateKey: common.privateKey
		}
		return result
	}

	// アカウント情報取得
	async getAccount(address: string) {
		let result = await nem.com.requests.account.data(this.endpoint, address)
		return result
	}

	// 送金（NEM)
	async sendNem(address: string, privateKey: string, amount: number, message: string) {
		let common = nem.model.objects.create('common')('', privateKey)
		let transferTransaction = nem.model.objects.create('transferTransaction')(address, amount, message)
		let transactionEntity = nem.model.transactions.prepare('transferTransaction')(common, transferTransaction, this.net)
		let result = await nem.model.transactions.send(common, transactionEntity, this.endpoint)
		return result
	}

	// QRコードjson取得
	getQRcodeJson(v: string, type: number, name: string, addr: string, amount: number, msg: string) {
		// v:2, type:1 アカウント, type:2 請求書
		let amountVal = amount * Math.pow(10, 6)
		let json = {
			type: type,
			data: {
				name: name,
				addr: addr,
				amount: amountVal,
				msg: msg
			},
			v: v
		}
		let jsonString = JSON.stringify(json)
		let result = encoding.codeToString(encoding.convert(this.getStr2Array(jsonString), 'UTF8'))
		return result
	}

	// NEMの可分性取得
	getNemDivisibility(): number {
		return Math.pow(10, 6)
	}

	private getStr2Array(str: string) {
		let array = []
		for (let i = 0; i < str.length; i++) {
			array.push(str.charCodeAt(i))
		}
		return array
	}
}