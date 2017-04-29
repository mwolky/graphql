const { MongoClient } = require('mongodb');
const assert = require('assert');
const graphqlHTTP = require('express-graphql');
const express = require('express');
const fs = require('fs');
const path = require('path');
const { graphql } = require('graphql');
const { introspectionQuery } = require('graphql/utilities');

const app = express();

app.use(express.static('public'));

const mySchema = require('./src/schema/index');
const MONGO_URL = 'mongodb://localhost:27017/test';

MongoClient.connect(MONGO_URL, (err,db) => {
  assert.equal(null,err);
  console.log('connected to mongodb server');

  app.use('/graphql', graphqlHTTP({
    schema: mySchema,
    context: { db },
    graphiql: true
  }));

  graphql(mySchema, introspectionQuery)
    .then(result => {
      fs.writeFileSync(
        path.join(__dirname,'cache/schema.json'),
        JSON.stringify(result, null, 2)
      );
      console.log('Generated cached schema.json file');
    })
    .catch(console.error)
  app.listen(3000, () => {
    console.log('running express');
  });
});