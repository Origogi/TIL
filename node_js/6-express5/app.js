import express from 'express';
import fs from 'fs';
import fsAsync from 'fs/promises';

const app = express();

app.use(express.json());

app.get('/file', (req, res) =>{
    fs.readFile('/file1.txt', (err, data) => {
        if (err) {
            res.sendStatus(404);
        }
    });
});

app.get('/file1', (req, res) => {
    try {
        const data = fs.readFileSync('/file1.txt');
        res.send(data);
    } catch (e) {
        res.sendStatus(404);
    }
});

app.get('/file2', (req, res) => {
    return fsAsync
       .readFile('/file2.txt')
       .then(data => res.send(data));

});

app.get('/file3', async (req, res) => {
    const data = await fsAsync.readFile('/file3.txt');
    res.send(data);
});

app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
});

app.listen(8080);