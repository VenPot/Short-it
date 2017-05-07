var chai = require('chai')
var chaihttp = require('chai-http')
var assert = require('chai').assert;
var gnu = require('./generateNewUrl.js')
var shortDb = require('./shortDb.js')
chai.use(chaihttp)


describe('#Generate New URL', function() {

  it('check if input should be a string', function(done) {
    gnu.getNewUrl('hello', function(err, data) {
      if (err) console.log(err)
      assert.typeOf(data, 'string', 'yes it is a string ')
      done()
    })
  })

  it('if input is number -should throw "not a string"  error', function(done) {
    gnu.getNewUrl(1, function(err, data) {
      //console.log("err.msg is ", err.msg)
      assert.equal(err, 'not a string')
      done()
    })
  })

  it('database call should resolve to some data when passing existing handle', function(done) {

    shortDb.getUrl('/42t9', function(err, data) {
      if (err) throw err
        //console.log(data)
      assert.notEqual(data[0], null, 'data already exists')
      done()
    })
  })

  it('db call should resolve to null when passing new handle', function(done) {

    shortDb.getUrl('/45t9', function(err, data) {
      if (err) throw err
        // console.log(data)
      assert.equal(data[0], null, 'yes! it is a new extention')
      done()
    })
  })
})
