import fetch from 'node-fetch';
import { Router, Request, Response } from 'express';
import _ from 'lodash';

export class GetJobsController {
    private router: Router;

    public constructor() {
        this.router = Router();
        this.router.get('/', this.get.bind(this))
        this.router.get('/:id', this.getJobDetail.bind(this))
    }

    getRouter(): Router {
        return this.router
    }

    public async get(req: Request, res: Response): Promise<Response> {
        let apiUrl = "https://jobs.github.com/positions.json"
        
        if (req.query) {
            apiUrl += `?`
            for (const key in req.query) {
                apiUrl +=`${key}=${req.query[key]}&`
            }
            apiUrl.slice(0,-1)
        }
        
        let apiRes = await fetch(apiUrl);
        let data = await apiRes.json();

        return res.status(200).json(data);
    }

    public async getJobDetail(req: Request, res: Response): Promise<Response> {
        let apiUrl = `https://jobs.github.com/positions/${req.params.id}.json`        
        let apiRes = await fetch(apiUrl);
        let data = await apiRes.json();

        return res.status(200).json(data);
    }
}