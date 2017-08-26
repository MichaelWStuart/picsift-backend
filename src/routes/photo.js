import {} from 'dotenv/config';
import { Router } from 'express';
import multer from 'multer';
import Vision from '@google-cloud/vision';
import mongoose from 'mongoose';
import jsonfile from 'jsonfile';
import { Photo } from '../models'
import { formatImageTags } from '../helpers';

const upload = multer({ dest: 'uploads/' });
const router = Router();

// let visionClient;

const visionClient = Vision({
  keyFilename: 'picsift-b92bb86b9d8d.json',
});

// console.log(visionClient)



// jsonfile.writeFile('keyFile.json', {
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
  // visionClient = Vision({
  //   keyFilename: 'keyFile.json',
  // });
//   console.log(visionClient)
// });


router.post('/', upload.any(), (req, res, next) => {
  console.log('FILE FILE FILE', req.file)
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
});

export default router;
