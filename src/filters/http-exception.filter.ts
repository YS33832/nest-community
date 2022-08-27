import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import {STATIC_URL} from "../common/constants";

// 커스텀 exception 필터
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const error : any = exception.getResponse();
        if(process.env.NODE_ENV == 'dev'){
            response.send(`<script>alert('${error.message}'); location.href = '${STATIC_URL}'</script>`);
        }else{
            response
                .status(status)
                .render("site/error",{
                    error: "error",
                    statusCode: status,
                    message: error.message,
                    path: request.url,
                });
        }

    }
}