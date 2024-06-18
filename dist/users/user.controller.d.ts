import { Response } from 'express';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    createUser(createUserDto: CreateUserDto): Promise<any>;
    getUser(id: number): Promise<any>;
    getAvatar(id: number, res: Response): Promise<any>;
    deleteAvatar(id: number): Promise<any>;
}
