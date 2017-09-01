import {} from 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import photoRoutes from './routes/photo';

const app = express();

// mongoose.connect(process.env.MDB_URI);

app.use(cors({ origin: 'ws://localhost:8097', credentials: true }));
app.use('/photo', photoRoutes)

app.post('/test', (req, res) => {
  res.send('shit works');
})

app.listen(process.env.PORT || 8080, () => console.log('back end up on port 8080'));
