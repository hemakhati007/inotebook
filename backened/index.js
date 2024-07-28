const connectToMongo = require("./db");
const express = require("express");

connectToMongo();

const app = express();
const port = 5000;

app.use(express.json()); //middleware to send data to req body   .json()==>to type cast  to json //request are sending in json
// //home route
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

//Avilable Routes
//to link the routes
app.use("/api/auth", require("./routes/auth"));

app.use('/api/notes',require('./routes/notes'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
}); 