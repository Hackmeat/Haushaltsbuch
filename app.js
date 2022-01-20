const express = require('express')
const sqlite3 = require('sqlite3').verbose()
const bodyParser = require('body-parser')

const app = express()
const jsonParser = bodyParser.json()

var cors = require('cors')
app.use(cors())

let test_db = 'haushaltsbuch_test.db'
let nico_db = 'haushaltsbuch_nico_beulich.db'

let full_db = 'SELECT * FROM Payment left Join Purpose on Payment.purpose_id = Purpose.id left Join Category on Purpose.category_id = Category.id left JOIN Typ on Category.typ_id = Typ.id'
let order_by_date = 'Order by Payment.date desc'

//----------------------------------------------------------------
//Connecting to database
const db = new sqlite3.Database('./db/' + nico_db, err => {
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
    const stmt = full_db
    db.all(stmt, (err, rows) => {
        if (err) {
            res.status(500).json('error')
            return console.error(err.message)
        }
        res.status(200).json(rows)
    })
})

//Date contains
app.get('/rangeDate/:name', (req, res) => {
    const stmt = db.prepare(full_db + ' where instr(date, ?) > 0 ' + order_by_date)
    stmt.all(req.params.name, (err, rows) => {
        if (err) {
            res.status(500).json('error')
            return console.error(err.message)
        }
        res.status(200).json(rows)
    })
})

//Get all categorys
app.get('/categorys', (req, res) => {
    const stmt = db.prepare('SELECT id, category FROM Category')
    stmt.all(req.params.name, (err, rows) => {
        if (err) {
            res.status(500).json('error')
            return console.error(err.message)
        }
        res.status(200).json(rows)
    })
})

//Get purposes base on category id
app.get('/purposes/:name', (req, res) => {
    const stmt = db.prepare('SELECT id, purpose FROM purpose WHERE category_id Like ?')
    stmt.all(req.params.name, (err, rows) => {
        if (err) {
            res.status(500).json('error')
            return console.error(err.message)
        }
        res.status(200).json(rows)
    })
})

//get all data for expenses
app.get('/expense/pur', (req, res) => {
    const stmt = db.prepare('SELECT Purpose.purpose, SUM(Payment.value) as value, Purpose.pur_color FROM Payment left Join Purpose on Payment.purpose_id = Purpose.id left join Category on Purpose.category_id = Category.id where typ_id like 1 GROUP by purpose.id')
    stmt.all(req.params.name, (err, rows) => {
        if (err) {
            res.status(500).json('error')
            return console.error(err.message)
        }
        res.status(200).json(rows)
    })
})

//get all data for categorys
app.get('/expense/cat', (req, res) => {
    const stmt = db.prepare('SELECT Category.category, SUM(Payment.value) as value, Category.cat_color FROM Payment left Join Purpose on Payment.purpose_id = Purpose.id left join Category on Purpose.category_id = Category.id where typ_id like 1 GROUP by category.id')
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
    const stmt = db.prepare('insert into Payment (value, purpose_id, date) values (?, ?, ?)')
    stmt.run(req.body['value'], req.body['purpose'], req.body['date'])
    console.log(req.body)
    stmt.finalize()
    res.status(200).json('success')
});