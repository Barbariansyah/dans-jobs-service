import { Request, NextFunction, Response, request } from 'express';
import _ from 'lodash';
import { ErrorCodeMap } from '../util/errors';

export const errorHandler = () => {
    return (err: any, req: Request, res: Response, next: NextFunction) => {
        const statusCode = ErrorCodeMap[err.error_code];
        if(_.isNumber(statusCode)) {
            console.log(err)
            return res.status(statusCode).send({err})
        }

        return res.status(statusCode).send({
            error_code:`SERVER_ERROR`, 
            message:`Unexpected Error`
        })   
    }
}