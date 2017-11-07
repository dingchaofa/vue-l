//这个文件只是创建一个简单的服务器

const http = require('http')
const url = require('url')

const server = http.createServer((req,res)=>{

  //console.log(typeof url.parse(req.url),'---------')
  //console.log(url.parse(req.url))
  res.statusCode = 404
  res.setHeader('Content-Type','text/html')
  res.setHeader('X-Foo','bar')
  res.setHeader('Set-Cookie', ['type=ninja', 'language=javascript'])
  //res.writeHead(200,'ok ok',{'Content-Type':'text/plain'})
  res.end("ddd")
}).listen(3000,'127.0.0.1',()=>{
  console.log('服务器已经运行，打开：http://127.0.0.1:3000')
})
