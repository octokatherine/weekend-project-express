const express = require('express');
const port = process.env.PORT || 3000;
const path = require('path');
const FILE = path.join(__dirname, 'data.json')
const fs = require('fs');

const app = express();

app.use(express.urlencoded({ extended: false }));

const write = (filePath, data) => {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(data)) {
            return reject('data must be an array');
        }
        fs.writeFile(filePath, JSON.stringify(data), (err) => {
            if (err) {
                return reject(err);
            }
            resolve()
        })
    })
}

const read = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                return reject(err);
            }
            let results;
            try {
                results = JSON.parse(data.toString());
                if (!Array.isArray(results)) {
                    return reject('data must be an array');
                }
            }
            catch (ex) {
                return reject(ex);
            }
            resolve(results);
        })
    });
}

const deleteItem = (name, data) => {
    const filtered = data.filter(product => product.name !== name);
    return filtered;
}

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/data', (req, res, next) => {
    read(FILE)
        .then(result => res.send(result))
});


app.post('/api/products', (req, res, next) => {
    read(FILE)
        .then(data => {
            data.push(req.body);
            write(FILE, data);
        })
    res.redirect('/#/products'); // please set status to 201.  Also, res.redirect creates a page refresh, so probably not the best way to do it.
})

app.post('/api/products/:name', (req, res, next) => {
    console.log('delete')
    read(FILE)
        .then(data => {
            data = deleteItem(req.params.name, data)
            write(FILE, data);
        })
    res.redirect('/#/products'); // don't forget to set status to 204
})

app.listen(port, () => console.log(`listening on port ${port}`));
