const http = require('http');

const courses = [
    { name: 'HTML' },
    { name: 'CSS' },
    { name: 'JS' },
    { name: 'Node' },
];

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/courses') {
        if (method === 'GET') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(courses));

        } else if (method ==='POST') {
            const body = [];
            req.on('data', chunk => {
                console.log(chunk);
                body.push(chunk);
            });

            req.on('end', () => {
                const course = JSON.parse(Buffer.concat(body).toString());
                courses.push(course);
                console.log(courses);
                res.writeHead(201);
                res.end();
            });
        }
    }
});

server.listen(8080);