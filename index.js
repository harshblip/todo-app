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

// GET METHOD
async function getTasks() {
    const tasks = await TodoTask.find({});
    return tasks;
}

app.get("/", async function (req, res) {
    const tasks = await getTasks();
    res.render('todo.ejs', { todoTasks: tasks });
});

// POST METHOD
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

// UPDATE METHOD
app.route('/edit/:id')
    .get(async (req, res) => {
        const id = req.params.id;
        const tasks = await TodoTask.find({});
        res.render('todoEdit.ejs', { todoTasks: tasks, idTask: id });
    })
    .post(async (req, res) => {
        const id = req.params.id;
        try {
            await TodoTask.findByIdAndUpdate(id, { content: req.body.content });
            res.redirect("/");
        } catch (err) {
            res.status(500).send(err);
        }
    });


// DELETE METHOD
app.route('/delete/:id').get(async (req, res) => {
    const id = req.params.id;
    try {
        await TodoTask.findByIdAndDelete(id);
        res.redirect('/');
    } catch (err) {
        res.status(500).send(err);
    }
});