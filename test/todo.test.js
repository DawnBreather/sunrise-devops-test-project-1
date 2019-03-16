

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app.js');

const expect = chai.expect;
chai.use(chaiHttp);

describe('API', ()=>{
    describe('POST', ()=>{
        let item = {
            'task' : 'new task for testing',
            'done' : true
        };
        let itemWithNumber = {
            'task': 45,
            'done': false
        }
        let itemWithoutBoolean = {
            'task': 'item without boolean',
            'done': 'String'
        }
        let itemWithOutDone = {
            'task':'without done',
        };
        let itemWithOutTask = {
            'done': false
        };
        
        it('create new item', (done)=>{
            chai.request(app)
                .post('/api/todo/item')
                .send(item)
                .end((err, res)=>{
                    expect(res).have.status(200);
                    expect(res.body).be.an('object');
                    expect(res.body).have.property('date');
                    expect(res.body).have.property('_id');
                    expect(res.body).have.property('task');
                    expect(res.body).have.property('done');
                    done();
                });
        });
    
        it('create item invalid data (INTEGER) for property "task"', (done)=>{
            chai.request(app)
                .post('/api/todo/item')
                .send(itemWithNumber)
                .end((err, res)=>{
                    expect(res).have.status(200);
                    expect(res).have.be.an('object');
                    expect(res.body).have.property('task').a('string');
                    done();
                });
        });
    
        it('create item invalid data (STRING) for property "done"', (done)=>{
            chai.request(app)
                .post('/api/todo/item')
                .send(itemWithoutBoolean)
                .end((err, res)=>{
                    expect(res).have.status(200);
                    expect(res).have.be.an('object');
                    expect(res.body).have.property('errors');
                    expect(res.body.errors).have.property('done');
                    expect(res.body.errors.done).have.property('kind').eql('Boolean');
                    done();
                });
        });
    
        it('create item without property "task"',(done)=>{
            chai.request(app)
                .post('/api/todo/item')
                .send(itemWithOutTask)
                .end((err,res)=>{
                    expect(res).have.status(200);
                    expect(res.body).be.an('object');
                    expect(res.body).have.property('errors');
                    expect(res.body.errors).have.property('task');
                    expect(res.body.errors.task).have.property('kind').eql('required');
                done();
                });
        });
    
        it('create item without property "done"',(done)=>{
            chai.request(app)
                .post('/api/todo/item')
                .send(itemWithOutDone)
                .end((err,res)=>{
                    expect(res).have.status(200);
                    expect(res.body).be.an('object');
                    expect(res.body).have.property('errors');
                    expect(res.body.errors).have.property('done');
                    expect(res.body.errors.done).have.property('kind').eql('required');
                done();
                });
        });
    });
});

// console.log(ID);
