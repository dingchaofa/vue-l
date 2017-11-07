const http = require('http')
const url = require('url')
const util = require('util')
const fs = require('fs')

const server = http.createServer((req,res)=>{

  //console.log(typeof url.parse(req.url),'---------')
  //console.log(url.parse(req.url))

  res.setHeader('Content-Type','text/html')
  res.setHeader('X-Foo','bar')
  res.setHeader('Set-Cookie', ['type=ninja', 'language=javascript'])

  let pathName =url.parse(req.url).pathname.slice(1)

  fs.readFile(pathName,(err,data)=>{
    if(err){
      res.writeHead(404,'no ok',{'haha':'aa'})
    }else{
      res.writeHead(200,'ok ok',{'ha1ha':'a1a'})
      res.write(data)
    }
    res.end(data)
  })

  //res.writeHead(200,'ok ok',{'Content-Type':'text/plain'})

}).listen(3000,'127.0.0.1',()=>{
  console.log('服务器已经运行，打开：http://127.0.0.1:3000')
})
