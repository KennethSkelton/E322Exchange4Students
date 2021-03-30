const express = require('express')
const app = express()
const uid = require('uid')
const path = require('path')
const port = 3000

let objs = {}

// express configuration
app.use(express.json({type: '*/*'}));



// Set your routes
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname +"/HTML/marketplace.html"));
});

app.post('/', function (req, res) {
    
    res.send(`Received object. ${JSON.stringify(req.body)}`);

});

app.post('/share', (req, res) => {
    let id = uid(16)
    console.log(id);
    objs[id] = req.body;
    console.log(`This is body: ${req.body}`);
    res.send({success:true, link: `http://localhost:3000/${id}`});
});

app.get('/:id', (req, res) =>{
    if (req.params.id && objs[req.params.id]){
        var data = objs[req.params.id];
        delete objs[req.params.id]
        res.send(data);
    } else {
        res.status(404).send({success: false, error: 404, message: "Not Found!" })
    }
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))