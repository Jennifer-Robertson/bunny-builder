const express = require('express')
const app = express()
const bodyParser = require('body-parser')
//this is a json-parser to handle dealing with HTTP POST requests to access the data easily
app.use(express.json())
const cors = require('cors')
app.use(cors())

const MongoClient = require('mongodb').MongoClient;

const bunnyEyes = {
    unimpressed: "(._.)",
    crazy: "(@.@)",
    sleepy: "(-.-)",
    shocked: "(o.o)"
}

const bunnyEars = {
    round: "()_()",
    pointy: "/\\_/\\",
    slanted: "(\\_/)"
}

const bunnyBody = {
    bigTailOnLeft: 'O(")(")',
    bigTailOnRight: '(")(")O',
    littleTailOnLeft: 'o(")(")',
    littleTailOnRight: '(")(")o',
}


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')

})
app.get('/styles.css', (req, res) => {
    res.sendFile(__dirname + '/styles.css')
})

app.get('/main.js', (req, res) => {
    res.sendFile(__dirname + '/main.js')
})

app.post("/bunny", (req, res) => {
    console.log("bunny")
})

const mongoConnectionString = "mongodb+srv://bunnies:bunbun123@bunnies.arlgn.mongodb.net/?retryWrites=true&w=majority"
MongoClient.connect(mongoConnectionString, {
    useUnifiedTopology: true
}).then(client => {

    app.use(bodyParser.urlencoded({
        extended: true
    }))
    app.use(bodyParser.json())

    console.log('Connected to Database')
    const db = client.db('bunnyArmy')
    const bunnyCollection = db.collection('wholeBunnies')
    

    
    app.post('/wholeBunnies', (req, res) => {
        const ears = req.body.ears
        const eyes = req.body.eyes
        const body = req.body.body

        if(ears && eyes && body){
            let fullBunny = {
                ears: bunnyEars[ears],
                eyes: bunnyEyes[eyes],
                body: bunnyBody[body]
            }
    
            bunnyCollection.insertOne(fullBunny)
                .then(result => {
                    res.redirect('/')
                })
                .catch(error => console.error(error))
        }
        else {
            res.redirect('/')
        }
    })

    app.get('/wholeBunnies', (req, res) => {
        bunnyCollection.find().toArray()
        .then(results => {
            res.json(results)
            console.log(results)
        })
        .catch(error => console.error(error))
    })






    const PORT = 3001;
    app.listen(PORT)
    console.log(`Server running on port ${PORT}`)

})
