import { Router } from 'express';
import superagent from 'superagent';
import { Photo } from './models'

const router = Router();

router.post('/', upload.single('photo'), (req, res, next) =>
  visionClient.labelDetection({ source: { filename: req.file.path } })
    .then(results => {
      console.log(req.file)
      res.send(formatImageTags(results));
    }));

export default router;
