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
	port: 3306,
	multipleStatements: true,
})

con.connect((err) => {
	if (err) throw err
	console.log("Connected!")
	con.query("SELECT * FROM questions", (err, results) => {
		if (err) return console.error(err)
		if (!results || results[0].length < 1) return console.log("No results")
		console.log(JSON.parse(results[0].answers)[results[0].solution])
	})
})

app.listen("8080", () => {
	console.log(colors.green.bold("Listening to port 8080"))
})

app.get("/", (req, res) => {
	res.status(200).send("Angular")
})

app.get("/api/new_question", (req, res) => {
	res.json({
		id: 1,
		groupId: 1,
		question: "wer ist toll?",
		answers: '["te","da","tp","dad"]',
		solution: 2,
	})
})

app.post("/api/answer", (req, res) => {
	console.log(req.body)
	console.log(`user answered with : ${req.body}`)
	res.end()
})
