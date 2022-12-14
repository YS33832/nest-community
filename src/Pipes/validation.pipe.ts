import {ArgumentMetadata, BadRequestException, Injectable, PipeTransform} from "@nestjs/common";
import {plainToInstance} from "class-transformer";
import {validate} from "class-validator";
// class-validator 적용 하기 위한 파이프
@Injectable()
export class ValidationPipe implements PipeTransform<any>{
    async transform(value: any, { metatype } : ArgumentMetadata){
        if(!metatype || !this.toValidate(metatype)){
            return value;
        }
        const object = plainToInstance(metatype, value);

        const errors = await validate(object);

        if(errors.length > 0){
            let error_message = [];
            errors.forEach((error)=>{
                error_message.push(Object.values(error.constraints)[0]);
            })
            throw new BadRequestException(error_message);
        }
        return value;
    }

    private toValidate(metatype: Function): boolean{
        const types: Function[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
}