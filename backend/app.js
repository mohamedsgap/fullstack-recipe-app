// MONGODB PW: un0xlqfbTxUVH7In
// MONGODB CONNECTION: mongodb+srv://mohamed:<password>@cluster0-fytzm.mongodb.net/test?retryWrites=true&w=majority

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Recipe = require('./models/recipe');

const app = express();


mongoose.connect('mongodb+srv://mohamed:un0xlqfbTxUVH7In@cluster0-fytzm.mongodb.net/test?retryWrites=true&w=majority').then(() => {
    console.log("'Successfully connected to MongoDB Atlas!'");
}).catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());


app.post('/api/recipes', (req, res, next) => {
    const recipe = new Recipe({
        title: req.body.title,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        time: req.body.time,
        difficulty: req.body.difficulty
    });
    recipe.save().then(()=> {
        res.status(201).json({
            message: 'Post saved successfully!'
        });
    }).catch((error)=>{
        res.status(400).json({
            error: error
        });
    });
});

app.get('/api/recipes/:id', (req, res, next) => {
    Recipe.findOne({
        _id: req.params.id

    }).then((recipe)=>{
        res.status(200).json(recipe);
    }).catch((error)=>{
        res.status(400).json({
            error: error
        });
    });
});

app.put('/api/recipes/:id', (req, res, next) => {
    const recipe = new Recipe({
      _id: req.params.id,
      title: req.body.title,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
      time: req.body.time,
      difficulty: req.body.difficulty
    });
    Recipe.updateOne({_id: req.params.id}, recipe).then(
      () => {
        res.status(201).json({
          message: 'Recipe updated successfully!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });


 app.delete('/api/recipes/:id', (req, res, next) => {
     Recipe.deleteOne({_id: req.params.id}).then(
       () => {
         res.status(200).json({
           message: 'Deleted!'
         });
       }
     ).catch(
       (error) => {
         res.status(400).json({
           error: error
         });
       }
     );
   });



app.use('/api/recipes',(req, res, next) => {
    Recipe.find().then((recipes)=>{
        res.status(200).json(recipes);
    }).catch((error)=>{
        res.status(400).json({
            error: error
        });
    });
});


module.exports = app;
