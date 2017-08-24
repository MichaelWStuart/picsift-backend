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
//
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
//   visionClient = Vision({
//     projectId: process.env.G_PROJECT_ID,
//     keyFilename: 'keyFile.json',
//   });
// });

const visionClient = Vision({
  key: process.env.API_KEY,
  projectId: process.env.G_PROJECT_ID,
});

console.log(visionClient)

router.post('/', upload.single('photo'), (req, res, next) =>
  visionClient.labelDetection({ source: { filename: req.file.path } })
    .then(results => {
      Photo.create({
        name: req.file.originalname,
        tags: formatImageTags(results),
      }, (err, photo) => {
        if (err) res.send(err);
        res.send(photo);
      });
    })
    .catch(err => res.send(err)));

export default router;
