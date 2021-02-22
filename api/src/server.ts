import express from 'express';

const app = express();

app.get('/', (request, response) => {
  response.status(200).json({"message": "Hello World - NLW4"});
})

app.listen(3333, () => console.log('Server is running on port 3333'));
