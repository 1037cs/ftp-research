const xhr = new XMLHttpRequest()
const button = document.querySelector('.button-login')
const inputHost = document.querySelector('.input_host')
const inputLogin = document.querySelector('.input_login')
const inputPassword = document.querySelector('.input_password')
const buttonCancel = document.querySelector('.popup_button_close')

button.addEventListener('click', () => {
	xhr.open('POST', 'http://localhost:3000/api/ftp')

	xhr.onload = () => {
		const list = JSON.parse(xhr.response).files
		console.log(list)
		let summarySize = 0,
			typeSizeList = [],
			pathsList = [{dirName: '.', elements: []}]

		for (let i = 0; i < list.length; i++) {
			if (list[i].type != '2') {
				summarySize = calcSummarySizeOfFiles(summarySize, list[i].size)
				calcSizeOfEachType(typeSizeList, list[i])
				buildCatalog(pathsList, list[i])

			} else {
				pathsList.push({dirName: list[i].name, elements: []})
			}
		}

		printSummarySizeOfFiles(summarySize, document.querySelector('.info_container_size'))
		printSizeOfEachType(typeSizeList,document.querySelector('.info_container_typesize'))
		console.log(pathsList)
		printCatalog(pathsList,document.querySelector('.info_container_catalog'))

		document.querySelector('.container').style.visibility = 'hidden'
		document.querySelector('.popup_background').style.visibility = 'visible'
	}
	xhr.setRequestHeader('Content-Type', 'application/json')

	xhr.send(JSON.stringify({
			"host": inputHost.value || "91.222.128.11",
			"user": inputLogin.value || "testftp_guest",
			"password": inputPassword.value || "12345"
		}
	))
})

buttonCancel.addEventListener('click', () => {
	document.querySelector('.container').style.visibility = 'visible'
	document.querySelector('.popup_background').style.visibility = 'hidden'
})

//main calc functions
function calcSummarySizeOfFiles(summarySize, listSize) {
	summarySize += listSize
	return summarySize
}

function calcSizeOfEachType(typeSizeList, list) {
	let type = list.name.substr(list.name.lastIndexOf('.'), list.name.length)
	if (!typeSizeList.some(elem => {
		return elem.name === type
	})) {
		typeSizeList.push({name: type, size: list.size})
	} else {
		(typeSizeList.some(elem => {
				if (elem.name === type) elem.size += list.size
			}
		))
	}
}

function buildCatalog(pathsList, list) {
	for (let j = 0; j < list.parents.length - 1; j++) {
		pathsList.find(elem => elem.dirName == list.parents[j]).elements.push(list.name)
	}
}

//print functions
function printSummarySizeOfFiles(size, div) {
	const span = document.createElement('span')
	span.innerHTML = `Summary size of files is <b>${(size / 1024 / 1024).toFixed(2)} MB</b>`
	div.append(span)
}

function printSizeOfEachType(list,div){
	for(let i=0; i<list.length;i++) {
		const span = document.createElement('span')
		span.innerHTML = `Size of <b>${list[i].name}</b> files is <b>${(list[i].size/1024).toFixed(2)} KB</b>`
		div.append(span)
	}
}

function printCatalog(list,div){
	for(let i=0; i<list.length;i++) {
		const dirName = document.createElement('span')
		if(list[i].elements.length==0) dirName.innerHTML = `Directory <b>${list[i].dirName}</b> is empty<br>`
		else dirName.innerHTML = `Directory <b>${list[i].dirName}</b> includes: <br>`
		div.append(dirName)
		for(let j=0; j<list[i].elements.length;j++) {
			const file = document.createElement('span')
			file.className='file'
			file.innerHTML += `${list[i].elements[j]} <br>`
			div.append(file)
		}

	}

}