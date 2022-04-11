const express = require('express')
const authRouter = require('./routes/ftp.routes.js')

const app = express()
const PORT = 3000

app.use(require('cors')())
app.use(express.json())
app.use("/api/", authRouter)


app.listen(PORT, (error) => {
	error ? console.log(error) : console.log(`Server is listening on ${PORT}...`)
})