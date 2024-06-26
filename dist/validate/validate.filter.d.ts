import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
export declare class ValidationFilter implements ExceptionFilter {
    catch(exception: BadRequestException, host: ArgumentsHost): void;
}
