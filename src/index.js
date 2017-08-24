import {} from 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import multer from 'multer';
import Vision from '@google-cloud/vision';

import { formatImageTags } from './helpers';

const app = express();
const upload = multer({ dest: 'uploads/' });
const visionClient = Vision({ projectId: process.env.PROJECT_ID });
const isProd = process.env.NODE_ENV === 'production';

mongoose.connect(process.env.MDB_URI);

app.use(cors({ origin: 'http://localhost:8081', credentials: true }));

console.log(visionClient)

app.post('/upload', upload.single('photo'), (req, res, next) =>
//   console.log(req.file)
//   res.send('dfsfsfdsf')
// })
  visionClient.labelDetection({ source: { filename: req.file.path } })
    .then(results => {
      res.send(formatImageTags(results));
    }));

app.get('/test', (req, res) => {
  res.send('asdads')
})

app.listen(process.env.PORT || 8080, () => console.log('back end up on port 8080'));
