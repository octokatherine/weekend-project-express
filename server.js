const express = require('express');
const port = process.env.PORT || 3000;
const path = require('path');
const FILE = path.join(__dirname, 'data.json')
const fs = require('fs');

const app = express();

const write = (filePath, data) => {
    return new Promise((resolve, reject) => {
        if(!Array.isArray(data)) {
            return reject('data must be an array');
        }
        fs.writeFile(filePath, JSON.stringify(data), (err)=> {
            if(err){
                return reject(err);
            }
            resolve()
        })
    })
}

const read = (filePath) => {
    return new Promise((resolve, reject)=> {
        fs.readFile(filePath, (err, data) => {
            if(err) {
                return reject(err);
            }
            let results;
            try {
                results = JSON.parse(data.toString());
                if(!Array.isArray(results)){
                    return reject('data must be an array');
                }
            }
            catch(ex) {
                return reject(ex);
            }
            resolve(results);
        })
    });
}

async function getresults() {
    let results = await read(FILE);
    console.log('1' + results)
    return results;
}

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/data', async (req, res, next)=> {
    let results = await getresults();
    console.log('2' + results)
    res.send(results)
    }
    );


app.listen(port, ()=> console.log(`listening on port ${port}`));