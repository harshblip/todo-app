const express = require("express")
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const TodoTask = require('./models/TodoTask')
const { MongoClient } = require('mongodb');

async function connectDb() {
    try {
        const client = new MongoClient(process.env.DB_CONNECT);
        await client.connect();
        console.log('connected to db!');
        app.listen(3000, () => { console.log('listening on port 3000') });
    } catch (err) {
        console.error('Failed to connect to db', err);
    }
}

connectDb();

app.use("/static", express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

// GET
app.get('/', (req, res) => {
    res.render('todo.ejs');
})

// POST
app.post('/', async (req, res) => {
    const todoTask = new TodoTask({
        content: req.body.content
    });
    try {
        await todoTask.save();
        res.redirect("/");
    } catch (err) {
        res.status(500).send(err);
    }
    console.log(req.body);
});
