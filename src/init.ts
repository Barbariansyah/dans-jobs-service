import { GetJobsController } from './controllers/get-jobs';

type InitType = {
    getJobsController: GetJobsController;
}

export function init(): InitType {
    const getJobsController = new GetJobsController();
    return {getJobsController};
}