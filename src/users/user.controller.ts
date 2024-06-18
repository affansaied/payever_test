import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Body,
  Res,
  UseFilters,
} from '@nestjs/common';

import { Response } from 'express';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ValidationFilter } from '../validate/validate.filter';

@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //1. POST /api/users
  @Post('/users')
  @UseFilters(new ValidationFilter())
  public async createUser(@Body() createUserDto: CreateUserDto): Promise<any> {
    return this.userService.create(createUserDto);
  }

  //2. GET /api/user/{userId}
  @Get('user/:id')
  public async getUser(@Param('id') id: number): Promise<any> {
    return this.userService.getUserById(id);
  }

  //3. GET /api/user/{userId}/avatar
  @Get('user/:id/avatar')
  public async getAvatar(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<any> {
    const b64Avatar = await this.userService.getAvatar(id);
    res.setHeader('Content-Type', 'image/jpeg');
    res.send(Buffer.from(b64Avatar, 'base64'));
    return b64Avatar;
  }

  //4. DELETE /api/user/{userId}/avatar
  @Delete('user/:id/avatar')
  public async deleteAvatar(@Param('id') id: number): Promise<any> {
    this.userService.deleteAvatar(id);
    return { message: 'User Avatar successfully deleted!' };
  }

}
