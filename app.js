const path = require('path');
const FILE = path.join(__dirname, 'data.json')
const fs = require('fs');

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

write(FILE, [{ name: 'moe'}, { name: 'larry'}])
    .then(()=> read(FILE))
    .then(users => {
        users.push({ name: 'shep '});
        return write(FILE, users);
    })
    .catch(ex => console.log(ex));

