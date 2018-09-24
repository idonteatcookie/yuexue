var userModel = require('../../model/user-model')
var should = require('should')

describe('test/model/user-model.test.js', function () {
    it('添加用户', function (done) {
        let user = {
            username: '_test',
            password: '_test',
            age: 88,
            gender: 1,
            tel: 2333333333,
            university: 'pku',
            remark: 'nothing'
        }
        userModel.createUser(user).then(res => {
            res.affectedRows.should.equal(1)
            done()
        }).catch(err => done(err))
    });
});