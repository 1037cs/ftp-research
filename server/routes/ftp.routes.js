const Router = require('express')
const ftp = require('basic-ftp')
let files = []

const router = new Router()

router.post('/ftp', async (req, res) => {
	files=[]
	await ftpConnect()
	return res.json({files})
})

async function getList(client,str='./') {
	const list = await client.list(str)
	for(let i=0;i<list.length;i++){
		list[i].parents=str.split('/')
		files.push(list[i])

		if(list[i].type=='2'){
			console.log(`Changed to ${list[i].name}`)
			await getList(client,str+list[i].name+'/')
		}
	}
}

async function ftpConnect() {
	const client = new ftp.Client()
	client.ftp.verbose = true
	try {
		await client.access({
			host: "91.222.128.11",
			user: "testftp_guest",
			password: "12345",
			secure: false
		})
		await getList(client)
	}
	catch(err) {
		console.log(err)
	}
	client.close()
}

module.exports = router