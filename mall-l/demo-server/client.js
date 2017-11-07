//用node.js做中间层，相对的变成客户端去访问其他地址

const http = require('http')
const url = require('url')
const util = require('util')
const fs = require('fs')

http.get('http://www.baidu.com/index.html',(res)=>{
  const {statusCode} = res
  const contentType = res.headers['content-type']

  let error

  if(statusCode !==200){
    error = new Error(`请求失败。\n状态码：${statusCode}`)
  }else if(!/^text\/html/.test(contentType)){
    error = new Error(`无效的content-type.\n期望application/json但获取的是${contentType}`)
  }
  if(error){
    console.error(`请求error1:${error}`)
    //res.resume(); // 消耗响应数据以释放内存,猜测：如果不消耗，那么非报错数据进来，就会有之前的错误，也无法触发end事件。
    return
  }

  let rawData = ''
  res.on('data',(chunk)=>{
    rawData +=chunk
  })

  res.on('end',()=>{
    try {
      const parsedData = rawData.slice(0,10)//JSON.parse(rawData)
      console.log(`parsedData:${parsedData}`)
      //console.log(rawData,44444)
    }catch(error){
      console.error(`请求响应结束，执行的回调函数发生错误error2${error}`) //SyntaxError: Unexpected token < in JSON at position //应该是对象，但是请求的是html
    }
  })
}).on('error',(error)=>{
  console.error(`发送请求的地址错误error3${error}`) //'http://www.ba111idu.com/index.html'
})
