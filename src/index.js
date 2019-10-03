const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const contactRouter = require('./routers/task');

const app = express();


app.use(express.json());
app.use(userRouter);
app.use(contactRouter);

const port = process.env.PORT;

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});

