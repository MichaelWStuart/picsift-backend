import {} from 'dotenv/config';
import { Router } from 'express';
import superagent from 'superagent';
import multer from 'multer';
import Vision from '@google-cloud/vision';
import mongoose from 'mongoose';
import { Photo } from '../models'
import { formatImageTags } from '../helpers';

const upload = multer({ dest: 'uploads/' });

// const visionClient = Vision({
//   projectId: process.env.PROJECT_ID,
//   keyFilename: 'picsift-19782cb5b13e.json',
// });

const router = Router();

// router.post('/', upload.single('photo'), (req, res, next) =>
//   visionClient.labelDetection({ source: { filename: req.file.path } })
//     .then(results => {
//       Photo.create({
//         name: req.file.originalname,
//         tags: formatImageTags(results),
//       }, (err, photo) => {
//         if (err) res.send(err);
//         res.send(photo);
//       });
//     })
//     .catch(err => res.send(err)));

export default router;
