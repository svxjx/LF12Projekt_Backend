require("dotenv").config()
const mysql = require("mysql")
const colors = require("colors")
const cors = require("cors")
const express = require("express")
const app = express()

app.use(express.json())
app.use(cors())

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
	console.log(colors.green.bold("Connected!"))
})

app.listen("8080", () => {
	console.log(colors.green.bold("Listening to port 8080"))
})

app.get("/", (req, res) => {
	res.status(200).send("Angular")
})

app.get("/api/:session/new_question", async (req, res) => {
	res.send(await getNewQuestion())
})

app.post("/api/:session/answer", (req, res) => {
	console.log(req.params.session, req.body.answer)
	res.end()
})

/**
 *
 * @param {Number} groupId
 */
async function getNewQuestion(groupId = 1) {
	return new Promise((resolve) => {
		con.query("SELECT * FROM questions ORDER BY RAND()", (err, results) => {
			if (err) return console.error(err)
			if (!results[0] || results[0].length < 1) return console.log("No results")
			results[0].answers = JSON.parse(results[0].answers)
			resolve(results[0])
		})
	})
}
