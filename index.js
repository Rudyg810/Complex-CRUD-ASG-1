const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const mongoURL = 'mongodb://localhost:27017';
const dbName = 'nudgedata';

const mongo = new MongoClient(mongoURL);

app.post('/api/v3/app/nudges', async (req, res) => {
  try {
    const { type, title, date, startTime, endTime, description } = req.body;
    const db = mongo.db(dbName);
    const collection = db.collection("data");
    const newData = {
      type,
      title,
      date,
      startTime,
      endTime,
      description,
      preview: '',
    };
    await collection.insertOne(newData);

  } catch (e) {
    console.log(e);
  }
});

app.get('/api/v3/app/nudges/:id', async (req, res) => {
  try {
    const nudgeId = req.params.id;
    const db = mongo.db(dbName);
    const collection = db.collection("data");
    const nudge = await collection.findOne({ _id: ObjectId(nudgeId) });

    res.json(nudge);
  } catch (e) {
    console.log(e);
  }
});

app.put('/api/v3/app/nudges/:id', async (req, res) => {
  try {
    const nudgeId = req.params.id;
    const { type, title, date, startTime, endTime, description } = req.body;

    // Update the nudge in the database
    const db = mongo.db(dbName);
    const collection = db.collection("data");
    await collection.updateOne(
      { _id: ObjectId(nudgeId) },
      {
        $set: {
          type,
          title,
          date,
          startTime,
          endTime,
          description,
        },});

  } catch (e) {
    console.log(e);
}});


app.delete('/api/v3/app/nudges/:id', async (req, res) => {
  try {
    const nudgeId = req.params.id;

    const db = mongo.db(dbName);
    const collection = db.collection("data");
    await collection.deleteOne({ _id: ObjectId(nudgeId) });

  } catch (e) {
    console.log(e);
  }
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
  });
  