import {} from 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import photoRoutes from './routes/photo';

const app = express();

mongoose.connect(process.env.MDB_URI);

const whitelist = ['ws://localhost:8097', 'http://localhost:8081'];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use('*', cors(corsOptions));

app.use('/photo', photoRoutes)

app.post('/test', cors(corsOptions), (req, res, next) => {
  res.send('shit works');
})

app.listen(process.env.PORT || 8080, () => console.log('back end up on port 8080'));
