import '../css/index.css'
require(['./common.js'],(common)=>{
  common.indexInit()
  $(()=>{
    console.log(`hello jquery index`)
  })
})