//测试commonJs规范

module.exports = {
  user: 'ding1',
  get(){
    return console.log('chao1')
  }
}

exports.user = 'ding2'

exports.get = ()=> {
  console.log('chao2')
}
