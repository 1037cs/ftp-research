const xhr = new XMLHttpRequest()
const button = document.querySelector('.button-login')
const inputHost = document.querySelector('.input_host')
const inputLogin = document.querySelector('.input_login')
const inputPassword = document.querySelector('.input_password')
const buttonCancel = document.querySelector('.popup_button_close')

button.addEventListener('click',()=> {
	xhr.open('POST', 'http://localhost:3000/api/ftp')

	xhr.onload = () => {
		const list = JSON.parse(xhr.response).files
		console.log(list)
		let sizeList=0, typeSizeList=[], pathsList

		for(let i=0;i<list.length;i++){
			if(list[i].type!='2'){
				sizeList+=list[i].size
				let type = list[i].name.substr(list[i].name.lastIndexOf('.'),list[i].name.length)
				if (!typeSizeList.some(elem=>{return elem.name===type})) {
					typeSizeList.push({name:type, size:list[i].size})
				} else{
					(typeSizeList.some(elem=>{if(elem.name===type) elem.size+=list[i].size}))
				}
			}
		}

		console.log(typeSizeList)
		console.log(sizeList)

		document.querySelector('.container').style.visibility='hidden'
		document.querySelector('.popup_background').style.visibility='visible'
	}
	xhr.setRequestHeader('Content-Type', 'application/json')

	xhr.send(JSON.stringify({
			"host": inputHost.value || "91.222.128.11",
			"user": inputLogin.value || "testftp_guest",
			"password": inputPassword.value || "12345"
		}
	))
})
buttonCancel.addEventListener('click',()=>{
	document.querySelector('.container').style.visibility='visible'
	document.querySelector('.popup_background').style.visibility='hidden'
})
