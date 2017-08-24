import {} from 'dotenv/config';
import { Router } from 'express';
import superagent from 'superagent';
import multer from 'multer';
import Vision from '@google-cloud/vision';
import { Photo } from '../models'
import { formatImageTags } from '../helpers';

const upload = multer({ dest: 'uploads/' });
const visionClient = Vision({ projectId: process.env.PROJECT_ID });

const router = Router();

router.post('/', upload.single('photo'), (req, res, next) =>
  visionClient.labelDetection({ source: { filename: req.file.path } })
    .then(results => {
      console.log(req.file)
      res.send(formatImageTags(results));
    })
    .catch(err => res.send(err)));

export default router;
