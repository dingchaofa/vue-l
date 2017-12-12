import '../css/index.css'
require(['./common.js','jquery'],(common,$)=>{
  common.indexInit()
  $(()=>{
    console.log(`hello jquery index`)
  })
})