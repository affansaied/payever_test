import { HttpService } from '@nestjs/axios';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './user.schema';
import { RabbitService } from '../rabbit/rabbitmq.service';
import { MailerService } from '@nestjs-modules/mailer';
export declare class UserService {
    private readonly userModel;
    private httpService;
    private readonly rabbitService;
    private readonly mailerService;
    constructor(userModel: Model<UserDocument>, httpService: HttpService, rabbitService: RabbitService, mailerService: MailerService);
    create(createUserDto: CreateUserDto): Promise<User>;
    getUserById(userId: number): Promise<User>;
    getAvatar(userId: number): Promise<string>;
    deleteAvatar(userId: number): Promise<User>;
}
