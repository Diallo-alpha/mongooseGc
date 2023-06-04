const express = require('express');
const app = express();
const port = 27017;
const mongoose = require('mongoose');
//conection a la base de donné
{/*mongoose.connect('mongodb+srv://Gomycode:<Dakar2023>@atlascluster.z9exqbr.mongodb.net/',
{ useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));*/}
//alternativ de connexion a la base dee donner
require('dotenv').config()
function connect(){
  try{
      mongoose.connect(process.env.MONGO_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true
      });
      console.log('connection a mongoDB réussie !!');
  }
  catch(err){
      console.log(err);
  }
}
connect();
  //creer le schema personn
  const personSchema = mongoose.Schema({
    name:{type: String, require: true},
    age:{type: Number},
    favFood: [String]
  });
  //creer un modele
  const Person = mongoose.model('Person', personSchema);
  //crer une persone
  let person = new Person({
    name: 'alpha diallo',
    age: 35,
    favFood: ['yassa', 'mafe']
  });
  //enregistrer dans la base de donné
  person 
  .save()
  .then(console.log('persone enregistrer avec succé'))
  .catch(err =>{
    console.error(err)
  });
  //enregistrer plusieur persons 
  const lotfPerson = [
    {name: 'demba', age: 30, favFood:['poulet', 'yassa'], id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },},
    {name: 'john', age: 23, favFood:['mafe', 'Too']},
    {name: 'zack', age: 24, favFood:['thiebou ', 'thiere']},
    {name: 'issa lay', age:25, favFood:['xwwwww', 'dibi']}
  ]
  Person
  .create(lotfPerson)
  .then(console.log('person avec succé'))
  .catch(err =>{
    console.error(err)
  });
  //fin a person 
  Person
  .find()
  .then(docs =>{
    console.log('person find', docs)
  })
  .catch(err =>{
    console.error(err)
  });
  //rechercher une person avec son nom
  Person
  .findOne({name: {'$in':'john'}})
  .then(doc=>{
    console.log('persone trouve avec succè'), doc
  })
  .catch(err =>{
    console.error(err)
  })
  //recherche par id 
  var userId = '647bed74263912b331c2da09'
  Person
  .findById(userId)
  .then(doc =>{
    console.log('persone trouve par son id', doc)
  })
  .catch(err =>{
    console.error(err)
  })
  //find by id and push 
  var userId2 = '647becd40c705f5e9fe464c2'
  Person
  .findById(userId2)
  .then(doc =>{
    doc.favFood.push('pizza')
    doc.save()
    console.log(doc)
  })
  .catch(err =>{
    console.error(err)
  })
  //find one and update
  Person
  .findOneAndUpdate({name: 'john', age: 23, favFood:['plat', 'plat2']})
  .then(doc =>{
    console.log('mise a jour ', doc)
  })
  .catch(err =>{
    console.error(err)
  })
  //supprimer 
  Person
  .deleteMany({name: 'demba'})
  .then(doc =>{
    console.log('a user is deleted', doc)
  })
  .catch(err =>{
    console.log(err)
  })
  //triuver une personne grace a son plat preferer
  Person
    .find({ favoriteFoods: {'$in':'poulet'}})
    .sort('name')
    .limit(2)
    .select()
    .then(docs => {
        console.log('Les personnes qui aiment le poulet:', docs)
    })
    .catch(err => {
        console.error(err)
    })
//demarer le serveur 
  app.listen(port, () =>{
    console.log(`the server is runing on port ${port}`)
  })