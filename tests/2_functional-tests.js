const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {


   test("Viewing one stock: GET request to /api/stock-prices/", function(end) {
      chai
         .request(server)
         .get('/api/stock-prices?stock=AAPL')
         .end(function(err, res) {

            assert.equal(res.status, 200);
            assert.isObject(res.body);
            assert.isObject(res.body.stockData);
            assert.isNumber(res.body.stockData.price);
            assert.isNumber(res.body.stockData.likes);
            assert.equal(res.body.stockData.likes, 0);
            assert.isString(res.body.stockData.stock);


            end();
         });
   });

   test("Viewing one stock and liking it: GET request to /api/stock-prices", function(end) {
      chai
         .request(server)
         .get('/api/stock-prices?stock=AAPL&like=true')
         .end(function(err, res) {

            assert.equal(res.status, 200);
            assert.isObject(res.body);
            assert.isObject(res.body.stockData);
            assert.isNumber(res.body.stockData.price);
            assert.isNumber(res.body.stockData.likes);
            assert.equal(res.body.stockData.likes, 1);
            assert.isString(res.body.stockData.stock);

            end();
         });
   });


   test("Viewing the same stock and liking it again: GET request to /api/stock-prices/", function(end) {
      chai
         .request(server)
         .get('/api/stock-prices?stock=AAPL&likes=true')
         .end(function(err, res) {

            assert.equal(res.status, 200);
            assert.isObject(res.body);
            assert.isObject(res.body.stockData);
            assert.isNumber(res.body.stockData.price);
            assert.isNumber(res.body.stockData.likes);
            assert.equal(res.body.stockData.likes, 1);
            assert.isString(res.body.stockData.stock);


            end();
         });
   });


   test("Viewing two stocks: GET request to /api/stock-prices/", function(end) {
      chai
         .request(server)
         .get('/api/stock-prices?stock=AAPL&stock=GOOGL')
         .end(function(err, res) {

            assert.equal(res.status, 200);
            assert.isObject(res.body);
            assert.isArray(res.body.stockData);
            assert.isNumber(res.body.stockData[0].price);
            assert.isNumber(res.body.stockData[0].rel_likes);
            assert.isString(res.body.stockData[0].stock);


            end();
         });
   });

   test("Viewing two stocks and liking them: GET request to /api/stock-prices/", function(end) {
      chai
         .request(server)
         .get('/api/stock-prices?stock=AAPL&stock=GOOGL&like=true')
         .end(function(err, res) {

            assert.equal(res.status, 200);
            assert.isObject(res.body);
            assert.isArray(res.body.stockData);
            assert.isNumber(res.body.stockData[0].price);
            assert.isNumber(res.body.stockData[0].rel_likes);
            assert.isString(res.body.stockData[0].stock);


            end();
         });
   });
});
