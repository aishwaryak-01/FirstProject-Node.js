const http = require('http');
const fs=require('fs');

function rqListener(req, res)
{
const url=req.url;
const method=req.method;

if(url==='/')
{
    fs.readFile("message.txt", {encoding:"utf-8"},(err,data)=>{
        if(err){
            console.log(err);
        }
   
    console.log('data from file'+ data);
    res.write('<html>');
    res.write('<head><title>Enter Message</title></head>')
    res.write(`<body>${data}</body>`);
    res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button>Submit</button></form></body>');
    res.write('</html>');
    return res.end();
})
}
else if(url==='/message' && method==='POST')
{
    const body=[];
    req.on('data',(chunk) => {
body.push(chunk);
    }); 
    return req.on('end',() => {
        const parsedBody = Buffer.concat(body).toString();
        console.log('parsedbody>>>>>', parsedBody);
       const message=parsedBody.split('=')[1];
       fs.writeFile('message.txt',message, (err) => {
        if(err)
        {
            console.log(err);
        }
        console.log("indise fs.writefile");
        res.statusCode=302;
res.setHeader('Location','/');
return res.end();
       });
    })
}
//Event happened - Content
else{
res.setHeader('Content-Type','text/html');
res.write('<html>');
res.write('<head><title>Node.js</title></head>');
res.write('<body><h1>Node.js Project</h1></body>');
res.write('</html>');
res.end();
}
}
const server = http.createServer(rqListener);
server.listen(3000);
