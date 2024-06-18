"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./user.schema");
const rxjs_1 = require("rxjs");
const fs = require("fs");
const saveAvatar_1 = require("../help/saveAvatar");
const path = require("path");
const rabbitmq_service_1 = require("../rabbit/rabbitmq.service");
const mailer_1 = require("@nestjs-modules/mailer");
const class_validator_1 = require("class-validator");
let UserService = class UserService {
    constructor(userModel, httpService, rabbitService, mailerService) {
        this.userModel = userModel;
        this.httpService = httpService;
        this.rabbitService = rabbitService;
        this.mailerService = mailerService;
    }
    async create(createUserDto) {
        const errors = await (0, class_validator_1.validate)(createUserDto);
        if (errors.length > 0) {
            throw new common_1.BadRequestException(errors);
        }
        const userExists = await this.userModel.findOne({
            email: createUserDto.email,
        });
        if (userExists) {
            throw new common_1.BadRequestException('User already exists.');
        }
        const numOfCollections = (await this.userModel.find()).length;
        const createdUser = new this.userModel({
            id: numOfCollections + 1,
            email: createUserDto.email,
            first_name: createUserDto.first_name,
            last_name: createUserDto.last_name,
            avatar: createUserDto.avatar,
        });
        await createdUser.save();
        await this.rabbitService.sendMessage({ userId: createdUser.id });
        await this.mailerService.sendMail({
            to: createdUser.email,
            subject: 'Welcome to our app!',
            context: { name: createdUser.first_name },
        });
        return createdUser;
    }
    async getUserById(userId) {
        const req = this.httpService.get(`https://reqres.in/api/users/${userId}`);
        const res = await (0, rxjs_1.lastValueFrom)(req);
        const userFound = res.data.data;
        return userFound;
    }
    async getAvatar(userId) {
        const userFound = await this.userModel.findOne({ id: userId });
        let avatar = userFound.avatar;
        if (avatar.startsWith('http')) {
            const avatarHash = await (0, saveAvatar_1.saveAvatar)(avatar);
            avatar = avatarHash;
            await this.userModel.findByIdAndUpdate(userFound._id, {
                $set: { avatar },
            });
        }
        const avatarPath = `${process.cwd()}/src/avatars/${avatar}`;
        const avatarBuffer = fs.readFileSync(avatarPath);
        const b64Avatar = Buffer.from(avatarBuffer).toString('base64');
        return b64Avatar;
    }
    async deleteAvatar(userId) {
        const user = await this.userModel.findOne({ id: userId });
        if (!user || !user.avatar) {
            throw new common_1.NotFoundException(`User with id ${userId} not found or has no avatar`);
        }
        const avatarPath = path.resolve(process.cwd(), 'src/avatars', user.avatar);
        await fs.promises.unlink(avatarPath);
        user.avatar = '';
        const updatedUser = await user.save();
        return updatedUser;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        axios_1.HttpService,
        rabbitmq_service_1.RabbitService,
        mailer_1.MailerService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map