import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import chaiNock from 'chai-nock';
import chaiAsPromised from 'chai-as-promised';
import path from 'path';
import nock from 'nock';


import server from '../server';
import resetDatabase from '../utils/resetDatabase';

chai.use(chaiHttp);
chai.use(chaiNock);
chai.use(chaiAsPromised);

// tout les packages et fonction nescessaire au test sont importé ici, bon courage

// fait les Tests d'integration en premier

  describe('Premiere serie de test (Empty Database)', () => {
    describe('GET books', () => {
        let emptyBooks = {
          books :[]
           }
         beforeEach((done) => {
         resetDatabase(path.join(__dirname, '../data/books.json'), emptyBooks);
         done();
        });
         it('it should GET all the books', (done) => {
            chai.request(server)
                .get('/book')
                .end((err, res) => {
                    expect(res.body.books).to.be.a('array');
                    expect(res.body.books.length).equal(0);
                    expect(res).to.have.status(200);
                    done();
               });
        });
   });
        

   
    describe('Books POST', () => {
            it('it should add the book', (done) => {
                chai.request(server)
                .post('/book')
                .send({"id":"test","title":"tannel 8","years":1990,"pages":400})
                .end(function (err, res) {
                   expect(err).to.be.null;
                   expect(res).to.have.status(200);
                   expect(res.body.message).to.equal('book successfully added');
                   done();
                });
            });
        });
      });   
 describe('Seconde serie de test (Mocked Database)', () => {
     
        describe('PUT book', () => {
          let dataBooks = {
            books :[{"id":"0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9","title":"Coco raconte Channel 2","years":1990,"pages":400}]
             }
           beforeEach((done) => {
           resetDatabase(path.join(__dirname, '../data/books.json'), dataBooks);
           done();
          });
            it('it should put the book', (done) => {
                chai.request(server)
                .put('/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9')
                .send({"title":"Modded things","years":1990,"pages":400})
                .end(function (err, res) {
                   expect(res).to.have.status(200);
                   expect(res.body.message).to.equal('book successfully updated');
                   done();
                });
            });
        });    
      

      describe('Books DELETE', () => {
        
        
            it('it should delete the book', (done) => {
                chai.request(server)
                .del('/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9')
                .end(function (err, res) {
                   expect(res).to.have.status(200);
                   expect(res.body.message).to.equal('book successfully deleted');

                   done();
                });
            });
          });
      
        describe('Books GET id', () => {
          it('it should GET the books by id', (done) => {
            chai.request(server)
                .get('/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    expect(res.body.message).to.equal('book fetched');
                    expect(res.body.book.title).to.be.a('string');
                    

                    done();
                });
          });
       });   
 
      });
   

  it('Premiere serie de test (simulation de réponse ok)', () => {
    let emptyBooks = {
        books : []
    }
   

    beforeEach((done) => {
        resetDatabase(path.join(__dirname, '../data/books.json'),emptyBooks);
        done();
    });

    describe("Books GET", function () {

        it("returns a successful mocked response", function (done) {
          
          nock("http://myApi.com")
            .get('/book')
            .reply(200, {
              "status": 200,
              "message": "This is a mocked response",
              "books":emptyBooks.books,
            });
          chai.request("http://myApi.com")
          .get('/book')
          .end((err, res) => {
              expect(res).to.have.status(200);
              expect(res.body.books).to.be.a('array');
            done();
          });
        })
      });

      describe("Books GET ID", function () {

        it("returns a successful mocked response", function (done) {
          
          nock("http://myApi.com")
            .get('/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9')
            .reply(200, {
              "status": 200,
              "message": "This is a mocked response",
              "books":emptyBooks.books,
            });
          chai.request("http://myApi.com")
          .get('/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9')
          .end((err, res) => {
              expect(res).to.have.status(200);
              expect(res.body.books).to.be.a('array');
            done();
          });
        })
      });

    
        describe('/POST book', () => {
            it("returns a successful mocked response", function (done) {
          
                nock("http://myApi.com")
                  .post('/book')
                  .reply(200, {
                    "message": "book successfully added",
                    "books":emptyBooks.books,
                  });
                chai.request("http://myApi.com")
                .post('/book')
                .send({"id":"test","title":"tannel 8","years":1990,"pages":400})
                .end(function (err, res) {
                   expect(res).to.have.status(200);
                   expect(res.body.message).to.equal('book successfully added');
                   done();
                });
            });
        });
      
    

      describe('Books PUT', () => {
            it("returns a successful mocked response", function (done) {
          
                nock("http://myApi.com")
                  .put('/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9')
                  .reply(200, {
                    "message": "book successfully updated"
                  });
                chai.request("http://myApi.com")
                .put('/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9')
                .send({"title":"Modded things","years":1990,"pages":400})
                .end(function (err, res) {
                   expect(res).to.have.status(200);
                   expect(res.body.message).to.equal('book successfully updated');
                   done();
                });
            });
            
      });

      describe('Books DELETE', () => {
        
            it("returns a successful mocked response", function (done) {
          
                nock("http://myApi.com")
                  .delete('/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9')
                  .reply(200, {
                    "message": "book successfully deleted"
                  });
                chai.request("http://myApi.com")
                .del('/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9')
                .end(function (err, res) {
                   expect(err).to.be.null;
                   expect(res).to.have.status(200);
                   expect(res.body.message).to.equal('book successfully deleted');
                   done();
                });
            });
        });    
    

  })

  it('Seconde série de test (simulation de mauvaise réponse)', () => {
    
    let dataBooks = {
        books : [{"id":"0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9","title":"Coco raconte Channel 2","years":1990,"pages":400}]
    }

    beforeEach((done) => {
        resetDatabase(path.join(__dirname, '../data/books.json'),dataBooks);
        done();
        console.log(dataBooks);
    });

    describe("Books GET", function () {

        it("returns a successful mocked response", function (done) {
          
          nock("http://myApi.com")
            .get('/book')
            .reply(400, {
              "message": "error fetching books",
            });
          chai.request("http://myApi.com")
          .get('/book')
          .end((err, res) => {
              expect(res).to.have.status(400);
              expect(res.body.message).to.equal('error fetching books');
            done();
          });
        })
      });

      describe("Books GET ID", function () {
        it("returns a successful mocked response", function (done) {
          
            nock("http://myApi.com")
              .get('/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9')
              .reply(400, {
                "message": "error fetching books",
              });
            chai.request("http://myApi.com")
          .get('/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9')
          .end((err, res) => {
              expect(res).to.have.status(400);
              expect(res.body.message).to.equal('error fetching books');
            done();
          });
        })
      });

    describe('Books POST', () => {
        describe('/POST book', () => {
            it("returns a successful mocked response", function (done) {         
                nock("http://myApi.com")
                  .post('/book')
                  .reply(400, {
                    "message": "error adding the book",
                  });
                chai.request("http://myApi.com")
                .post('/book')
                .send({"id":"test","title":"tannel 8","years":1990,"pages":400})
                .end(function (err, res) {
                   expect(res).to.have.status(400);
                   expect(res.body.message).to.equal('error adding the book');
                   done();
                });
            });
        });
      
      });

      describe('Books PUT', () => {
        describe('/PUT book', () => {
            it("returns a successful mocked response", function (done) {
          
                nock("http://myApi.com")
                  .put('/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9')
                  .reply(400, {
                    "message": "error updating the book"
                  });
                chai.request("http://myApi.com")
                .put('/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9')
                .send({"title":"Modded things","years":1990,"pages":400})
                .end(function (err, res) {
                   expect(res).to.have.status(400);
                   expect(res.body.message).to.equal('error updating the book');
                   done();
                });
            });
        });    
      });

      describe('Books DELETE', () => {
        describe('/DELETE book', () => {
            it("returns a successful mocked response", function (done) {    
                nock("http://myApi.com")
                  .delete('/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9')
                  .reply(400, {
                    "message": "error deleting the book"
                  });
                chai.request("http://myApi.com")
                .del('/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9')
                .end(function (err, res) {
                   expect(res).to.have.status(400);
                   expect(res.body.message).to.equal('error deleting the book');
                   done();
                });
            });
        });    
      });
  })
