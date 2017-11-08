var AV = require('leancloud-storage');

var APP_ID = 'WzP3jIAzOJR7lGlulCrJfmyU-gzGzoHsz';
var APP_KEY = 'tqvvUcn2AmnvgYSsMtPIPCff';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

var TestObject = AV.Object.extend('TestObject');
var testObject = new TestObject();
testObject.save({
  words: 'Hello World!'
}).then(function(object) {
  alert('LeanCloud Rocks!');
})