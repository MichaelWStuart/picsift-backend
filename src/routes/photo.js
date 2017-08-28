import {} from 'dotenv/config';
import { Router } from 'express';
import multer from 'multer';
import Vision from '@google-cloud/vision';
import mongoose from 'mongoose';
import jsonfile from 'jsonfile';
import cors from 'cors';
import { Photo } from '../models'
import { formatImageTags } from '../helpers';

const upload = multer({ dest: 'uploads/' });
const router = Router();
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

// let visionClient;
//
// jsonfile.writeFile('picsift-77ef34dda90a.json', {
//   "type": process.env.G_TYPE,
//   "project_id": process.env.G_PROJECT_ID,
//   "private_key_id": process.env.G_PRIVATE_KEY_ID,
//   "private_key": process.env.G_PRIVATE_KEY,
//   "client_email": process.env.G_CLIENT_EMAIL,
//   "client_id": process.env.G_CLIENT_ID,
//   "auth_uri": process.env.G_AUTH_URI,
//   "token_uri": process.env.G_TOKEN_URI,
//   "auth_provider_x509_cert_url": process.env.G_PROVIDER_CERT_URL,
//   "client_x509_cert_url": process.env.G_CLIENT_CERT_URL,
// }, () => {
//   visionClient = Vision({
//     keyFilename: 'picsift-77ef34dda90a.json',
//   });
// });

const visionClient = Vision({
  keyFilename: 'picsift-77ef34dda90a.json',
});

router.post('/', cors(corsOptions), upload.single('photo'), (req, res, next) => {
  console.log('FILE FILE FILE', req.file)
  console.log(visionClient)
  visionClient.labelDetection({ source: { filename: req.file.path } })
    .then(results => {
      Photo.create({
        name: req.file.originalname,
        tags: formatImageTags(results),
      }, (err, photo) => {
        console.log('err =============> ', err)
        console.log('photo =============> ', photo)
        if (err) res.send(err);
        res.send(photo);
      });
    })
    .catch(err => {
      console.log('CATCH CATCH CATCH', err)
      res.send(err)
    });
  // res.send('two hundred')
});

export default router;
