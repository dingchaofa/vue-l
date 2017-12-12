require(['./common.js'],function (common) {
  console.log(`hello`)
  common.innerInit()
  $(()=>{
    console.log(`jquery inner`)
  })
})