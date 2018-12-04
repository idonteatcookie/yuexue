const should = require('should')

const {
    camel2_,
    _2Camel,
    _2Camel4Arr,
    md5,
    getRandomString,
    changeKey2$Key
} = require('../utils')

describe('util/index.js', () => {

    describe('camel2_(): 对象的 key 驼峰式命名会转为下划线命名', () => {
        it('没有大写字母不转换', () => {
            camel2_({ abc: 'ABC' }).should.be.deepEqual({ abc: 'ABC' })
        });

        it('驼峰式命名会转为下划线命名', () => {
            camel2_({ aBc: 'ABC', aBC: 'ABC' }).should.be.deepEqual({ a_bc: 'ABC', a_b_c: 'ABC' })
        });
    });

    describe('_2Camel(): 对象的 key 下划线命名会转为驼峰式命名', () => {
        it('没有下划线不转换', () => {
            _2Camel({ abc: 'ABC' }).should.be.deepEqual({ abc: 'ABC' })
        });

        it('驼峰式命名会转为下划线命名', () => {
            _2Camel({ a_bc: 'ABC', a_b_c: 'ABC' }).should.be.deepEqual({ aBc: 'ABC', aBC: 'ABC' })
        });
    });

    describe('_2Camel4Arr(): 数组中每一个元素的 key 下划线命名会转为驼峰式命名', () => {
        it('数组中每一个元素的 key 下划线命名会转为驼峰式命名', () => {
            _2Camel4Arr([{ abc: 'ABC'}, { a_bc: 'ABC' }, { a_b_c: 'ABC' } ])
              .should.be.deepEqual([{ abc: 'ABC' }, { aBc: 'ABC' }, { aBC: 'ABC' }])
        });
    });

    describe('md5(): 使用 md5 加密字符串', () => {
        it('md5(\'123456\')=\'e10adc3949ba59abbe56e057f20f883e\'', () => {
            md5('123456').should.be.equal('e10adc3949ba59abbe56e057f20f883e')
        });
    });

    describe('getRandomString(n): 获取一个长度为n随机字符串(n<11)', () => {
        it('getRandomString(5) 获取一个随机字符串 /^[0-9a-z]{5}$/', () => {
            getRandomString(5).should.be.match(/^[0-9a-z]{5}$/)
        });
    });

    describe('changeKey2$Key(obj): 把一个对象的key都改成$key ', () => {
        it('changeKey2$Key({k: \'v\'}) -> {$k: \'v\'}', () => {
            changeKey2$Key({k: 'v'}).should.be.deepEqual({$k: 'v'})
        });
    });

});

