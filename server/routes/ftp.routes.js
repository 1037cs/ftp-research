const Router = require('express')
const ftp = require('basic-ftp')
let files = []

const router = new Router()

router.post('/ftp', async (req, res) => {
	await ftpConnect(req, res)
	return res.json({files})
})

async function getList(client, str = './') {
	const list = await client.list(str)
	for (let i = 0; i < list.length; i++) {
		list[i].parents = str.split('/')
		files.push(list[i])

		if (list[i].type == '2') {
			console.log(`Changed to ${list[i].name}`)
			await getList(client, str + list[i].name + '/')
		}
	}
}

async function ftpConnect(req, res) {
	const client = new ftp.Client()
	const {host, user, password} = req.body
	console.log(host, user, password)
	client.ftp.verbose = true
	try {
		await client.access({
			host: host,
			user: user,
			password: password,
			secure: false
		})
		await getList(client)
	} catch (err) {
		console.log(err)
		return res.json({message: err})
	}
	client.close()
}

module.exports = router