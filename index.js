require("dotenv").config()
const mysql = require("mysql")
const colors = require("colors")
const cors = require("cors")
const express = require("express")
const app = express()

app.use(express.json())

/**
 * connection to db
 */
const con = mysql.createConnection({
	database: process.env.DATABASE,
	host: process.env.HOST,
	user: process.env.USER,
	password: process.env.PASSWORD,
	charset: "utf8mb4",
	port: 8080,
	multipleStatements: true,
})

app.listen("8080", () => {
	console.log(colors.green.bold("Listening to port 8080"))
})

app.get("/", (req, res) => {
	res.status(200).send("Angular")
})

app.get("/api/new_question", (req, res) => {
	res.json({ fragen: ["1", "2"], antwort: 0 })
})

app.post("/api/answer", (req, res) => {
	console.log(req.body)
	console.log(`user answered with : ${req.body}`)
	res.end()
})
