const express = require('express');
const bodyParser = require('body-parser');
const eslibrary = require('./elasticlibrary');

const app = express();

app.use(bodyParser.json());

app.get('/', (req,res)=> {
    res.send("Hello World");
})

//Save to the db
app.post('/save', (req,res)=> {
    const payload = req.body;
    const indexName = req.query.index;
    const docType = req.query.type;

    // if(eslibrary.checkIndex(req,res,indexName) === false){
    //     eslibrary.createIndex(req, res, indexName);
    // }

   eslibrary.addDoc(req, res, indexName, docType, payload)
})

//Get all saved to the db
app.post('/getall/:index/:type', (req,res)=> {
    const payload = req.body;
    const indexName = req.query.index;
    const docType = req.query.type;
    eslibrary.search(req, res, indexName, docType, payload)
})


//Get survey by ID
app.get('/getall/:index/:type/:id', (req,res)=> {
    const indexName = req.query.index;
    const docType = req.query.type;
    var _id = req.params.id;
    //console.log(id);
       var payload = {
        "query": {
            "bool": {
                "should": [
                    { "match": { _id } }
                ]
            }
        }
    }
    eslibrary.search(req, res, indexName, docType, payload)
})



app.listen('4000', console.log('app listening on port 4000'));