const db = require('../models/conn.js');
const express = require(`express`);
const app = express();
const prompt = require('prompt-promise');
let newCEO = {};

app.listen(1337, () => {
    console.log(`Server is running.`);
});

router.get('/', function (req, res, next) {
    res.render('template', {
        locals: {
            title: 'CEOS!',
            listOfDogs: listOfFamousDogs
        },
        partials: {
            partial: 'partial-ceos'
        }
    });
});


const getRootResponse = (req,res) => {
    const route = req.route.path;

    const snippet = `
        <div>
            <h1>HELLO WORLD</h1>
            <p> Get a <strong>${route}</strong></p>
        </div>
    `;
    res.status(200).send(snippet).end();
}

async function getCeoResponse (req,res) {
    const executives = await getExecutives();
    const json = JSON.stringify(executives);

    res.status(200).send(json).end(); //CAN ONLY BE SENT ONCE!
}

app.get(`/`,getRootResponse);
app.get(`/ceos`, getCeoResponse)

function getExecutives(){
    return db.any(`SELECT * FROM ceos;`);
}

function addExecutive(){
    return prompt('Name: ')
    .then(name = val => {
        newCEO['name'] = val;
        return prompt('year: ')
    })
    .then(year = val =>{
        newCEO['year'] = val;
        prompt.done();
        return addExecutiveToDB();
    })
    .catch(rejected = err => {
        console.log('ERROR ', err.stack);
        prompt.finish();
    })
}

function addExecutiveToDB(){
    return db.any(`INSERT INTO ceos (name, year) values ('${newCEO.name}', '${newCEO.year}');`);
}

async function main(){
    
    await addExecutive()
    .then(r => {
        getExecutives()
        .then(executives => {
            console.log(executives);
    
            executives.map(executive => {
                console.log(executive.name, executive.year);
            });
        });
    });
}

//main();