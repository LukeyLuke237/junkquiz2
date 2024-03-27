const mongoose = require('mongoose');

const express = require('express')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// require('dotenv').config();

const port = process.env.PORT || 3000;

// Create a Schema object
const Schema = mongoose.Schema;

// This Activitry creates the collection called activitimodels
const studentSchema = new Schema({
  name: {type: String, required: true},
  studentID: {type: String, required: true}
})

const w24students = mongoose.model("w24students", studentSchema);

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/form.html")
});

app.post('/', async (req, res) => {
  try {
    // get the data from the form
    if (req.body.myuri == null) {
      res.json('Please enter the uri of your database')
    } else {
      // connect to the database and log the connection
      mongoose.connect(req.body.myuri, {useNewUrlParser: true, useUnifiedTopology: true})
              .then(() => {
                console.log("Connected to MongoDB Atlas");
              })
              .catch((err) => "Error trying to access MongoDB Atlas: " + err)
    }

    // add the data to the database
    const student = new w24students({
      name: "Minh Chien Tran",
      studentID: "300361163"
    })
    student.save()
            .then(() => {
              // send a response to the user
              res.send(`<h1>Document  Added</h1>`);
            })
            .catch((err) => res.status(400).json("Error adding new student: " + err))

    
  }
  catch (err) {
    res.json("Error trying to access MongoDB Atlas: " + err)
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
