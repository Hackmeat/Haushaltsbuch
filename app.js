const express = require('express')
const sqlite3 = require('sqlite3').verbose()
const bodyParser = require('body-parser')

const app = express()
const jsonParser = bodyParser.json()

var cors = require('cors')
app.use(cors())

let currentdb = 'temp1'

let db_zahlung = 'zahlung'
let db_purpose = 'purpose'
let db_category = 'category'

//----------------------------------------------------------------
//Connecting to database
const db = new sqlite3.Database('./db/template.db', err => {
    if (err) {
        return console.error(err.message)
    }
    console.log('Connected to database')
})

//----------------------------------------------------------------
//Creating a local server
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000/')
})

//----------------------------------------------------------------
//Getting Data from the db and passing it to the frontend

//Whole Database
app.get('/all', (req, res) => {
    const stmt = 'select * from ' + currentdb + ''
    db.all(stmt, (err, rows) => {
        if (err) {
            res.status(500).json('error')
            return console.error(err.message)
        }
        res.status(200).json(rows)
    })
})

//Search categorys
app.get('/cat/:name', (req, res) => {
    const stmt = db.prepare('select * from ' + currentdb + ' where category=?')
    stmt.all(req.params.name, (err, rows) => {
        if (err) {
            res.status(500).json('error')
            return console.error(err.message)
        }
        res.status(200).json(rows)
    })
})

//Detail search
app.get('/det/:name', (req, res) => {
    const stmt = db.prepare('select * from ' + currentdb + ' where detail=?')
    stmt.all(req.params.name, (err, rows) => {
        if (err) {
            res.status(500).json('error')
            return console.error(err.message)
        }
        res.status(200).json(rows)
    })
})

//Specific date
app.get('/specDate/:name', (req, res) => {
    const stmt = db.prepare('select * from ' + currentdb + ' where date=?')
    stmt.all(req.params.name, (err, rows) => {
        if (err) {
            res.status(500).json('error')
            return console.error(err.message)
        }
        res.status(200).json(rows)
    })
})

//Date contains
app.get('/rangeDate/:name', (req, res) => {

    const stmt = db.prepare('select * from ' + currentdb + ' where instr(date, ?) > 0')
    stmt.all(req.params.name, (err, rows) => {
        if (err) {
            res.status(500).json('error')
            return console.error(err.message)
        }
        res.status(200).json(rows)
    })
})

//----------------------------------------------------------------
//Getting data from the frontend and passing it to the db
app.post('/add', jsonParser, (req, res) => {
    const stmt = db.prepare('insert into ' + currentdb + ' (category, detail, amount, date) values (?, ?, ?, ?)')
    let temp = req.body['amount'].replace(',', '.')
    if (temp >= 0 || temp <= 0) {
        stmt.run(req.body['category'], req.body['detail'], temp, req.body['date'])
        stmt.finalize()
        res.status(200).json('success')
    } else {
        console.log("Error - amount not a number")
    }
});