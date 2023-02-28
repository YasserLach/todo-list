const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const client = require('./connection.js')
const cookieParser = require('cookie-parser')
require('dotenv').config();

const app = express()
app.use(cors({
    credentials: true,
    origin: ['http://localhost:8080']
}))
app.use(cookieParser())
app.use(bodyParser.json());



// to add a new user 
app.post('/users', async (req, res) => {
    const user = req.body;
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(user.password, salt)

    let insertQuery = `insert into person(first_name, last_name, email,password) 
                       values('${user.first_name}', '${user.last_name}', '${user.email}','${hashPassword}')`

    client.query(insertQuery, (err, result) => {
        if (!err) {
            res.send('Insertion was successful')
        }
        else { console.log(err.message) }
    })
    client.end;
})


// to login 
app.post('/login', async (req, res) => {
    const result = await client.query(`Select * from person where email= '${req.body.email}' `)

    if (result.rows.length == 0) {
        return res.status(400).send('Cannot find user')
    }
    try {
        const password = result.rows.map((user) => user.password)
        const idp = result.rows.map((user) => user.idp)

        if (!await bcrypt.compare(req.body.password, password[0])) {
            return res.status(400).send('password is incorrect')
        }
        const token = jwt.sign({ id: idp }, process.env.SECRET)
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        })
        res.send('login successful')
    }
    catch {
        res.status(500).send()
    }

    client.end;
})


app.get('/user', async (req, res) => {
    try {
        
        const cookie = req.cookies['jwt']
        const claims = jwt.verify(cookie, process.env.SECRET)

        if (!claims) {
            return res.status(404).send({
                message: 'unauthenticated'
            })
        }

        const result = await client.query(`Select * from person where idp= '${claims.id}' `)
        res.send(result.rows)
        console.log(result.rows)
    }
    catch {
        return res.status(404).send({
            message: 'unauthenticated'
        })
    }
    client.end;
})


//to logout 

app.post('/logout', async (req, res) => {

    res.cookie('jwt', '', {
        maxAge: 0
    })
    res.send({ message: 'log out success' })

})

// to get the list of the user 

app.get('/mylist/:id', async (req, res) => {

    client.query(`Select * from mylist where idp = ${req.params.id}`, (err, result) => {
        if (!err) {
            res.send(result.rows);
        }
    });
    client.end;
})


// To post a new todo for the user 

app.post('/todo', (req, res) => {

    const cookie = req.cookies['jwt']
    const claims = jwt.verify(cookie, process.env.SECRET)

    if (!claims) {
        return res.status(404).send({
            message: 'unauthenticated'
        })
    }

    const user = req.body;
    let insertQuery = `INSERT INTO mylist(title, snippet, body, idp)
	                    VALUES ('${user.title}', '${user.snippet}' ,'${user.body}' , ${user.idp})`
    client.query(insertQuery, (err, result) => {
        if (!err) {
            res.send('Insertion was successful')
        }
        else { console.log(err.message) }
    })
    client.end;
})


// To delete a new post 

app.delete('/delete/:id', (req, res) => {
    let insertQuery = `delete from mylist where idt=${req.params.id}`

    client.query(insertQuery, (err, result) => {
        if (!err) {
            res.send('Deletion was successful')
        }
        else { console.log(err.message) }
    })
    client.end;
})




const port = process.env.PORT
app.listen(port, () => { console.log(`serveur running on port ${port}`) })
client.connect();
