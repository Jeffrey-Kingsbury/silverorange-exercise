import { Router, Request, Response } from 'express';
import axios from 'axios';
import * as localReposData from '../../data/repos.json';
import reposDataCombiner from './reposDataCombiner';
export const repos = Router();

repos.get('/', async (_: Request, res: Response) => {
  res.header({
    'cache-control': 'no-store',
    'content-type': 'application/json',
  });

  try {
    await axios
      .get('https://api.github.com/users/silverorange/repos')
      .then(({ data }) => {
        res.status(200).json(reposDataCombiner(localReposData, data));
      });
  } catch (err) {
    res.status(500).send(err);
  }
});
