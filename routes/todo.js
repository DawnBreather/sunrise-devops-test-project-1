const express = require('express');

const router = express.Router();
const Todo = require('../models/Todo');

router.get('/item', function (req, res, next){
    // let users = {};
    Todo.find({}, (err, tasks)=>res.status(200).send(tasks));
});

router.get('/item:id', function (req, res, next){
    let id = req.params.id;
    console.log(id);
    Todo.findById(id, (err, user)=>{
        if(err){
            return next(new Error('User was not found!'));
        }
        res.status(200).send(user);
    });
});


router.post('/item', function (req, res, next){

    let item = new Todo({
        task: req.body.task,
        done: req.body.done,
        date: Date.now(),
    });

    item.save(function(error, item) {
        if (error) {
            res.status(200).send(error);
        }else{
            res.status(200).send(item);
        }
    });

});


router.put('/item/:id', (req, res, next)=>{
    let id = req.params.id;
    Todo.findById(id, function (error, todo) {
        if (error) {
          return next(new Error('Todo was not found'))
        } else {
          todo.task = req.body.task;
          todo.done = req.body.done;
    
          todo.save(
            function (error, todo) {
              if (error) {
                res.status(400).send('Unable to update todo')
              } else {
                res.status(200);
              }
            });
        }
      })
});

router.delete('/item/:id', (req, res, next)=>{
    let id = req.params.id;
    console.log(id);
    Todo.findByIdAndRemove(id, (err)=>{
        if (err) {
            return next( new Error('Todo was not found'))
        }
        res.status(200).send('item successfully removed');
    })
});

module.exports = router;