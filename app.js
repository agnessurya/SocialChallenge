const express = require('express')
const app = express()
const routes = require('./routes');
const port = 3000



//body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.use(routes);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
  })