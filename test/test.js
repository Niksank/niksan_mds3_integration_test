const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../index')
const should = chai.should()
const expect = chai.expect

chai.use(chaiHttp)

// ---> DEBUT
/**
  * Génération des nouvelles couleurs et enregistrement de ces
  * couleurs dans un tableau.
  */
const newValues = []
const colorKey = 'NEW_COLOR_'
let nextCursor = 0;
const payloadColor = () => {
  const nextColor = `${colorKey}${nextCursor}`
  newValues.push(nextColor)
  nextCursor++;
  return { 'color': nextColor }
}
const getCurrentCulor = () => {
  return nextCursor > 0 ? `${colorKey}${nextCursor - 1}` : `${colorKey}O`
}
// <-- FIN


describe('List', () => {

	// Get all color list
  describe('/GET colors', () => {
    it('​should return all colors​', (done) => {
      chai.request(app).get('/colors').end((err, res) => {
        expect(res).to.have.status(200);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.results.should.be.a('array');
        res.should.be.json;
        res.body.results.length.should.be.eql(3);
        done();
      });
    });
  });
  // invalid path
  describe('/GET colors', () => {
    it('should return Bad Request​', (done) => {
      chai.request(app).get('/color').end((err, res) => {
        expect(res).to.have.status(404);
        res.should.have.status(404);
        done();
      });
    });
  });

  //add color 
  describe('/POST colors', () => {
    it('should add new color', (done) => {
      const param = {
        color: 'BLACK',
      };
      chai.request(app).post('/colors').send(param).end((err, res) => {
        expect(res).to.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object'); 
        res.body.results.should.be.a('array');
        res.body.results[3].should.be.equal(param.color);
        done();
      });
    });
  });

	// Get new color list 
  describe('/GET colors', () => {
    it('​should return new color list Request​', (done) => {
      chai.request(app).get('/colors').end((err, res) => {
        expect(res).to.have.status(200);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.results.should.be.a('array');
        res.should.be.json;
        res.body.results.length.should.be.equal(4);
        done();
      });
    });
  });	
  
 });
