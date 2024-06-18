"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_module_1 = require("./users/user.module");
require("dotenv/config");
const axios_1 = require("@nestjs/axios");
const mailer_1 = require("@nestjs-modules/mailer");
let AppModule = class AppModule {
    onModuleInit() {
        if (!process.env.TEST_ENV) {
            console.log('Connected to database successfully!');
        }
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            mongoose_1.MongooseModule.forRoot(process.env.MONGO_URI),
            mailer_1.MailerModule.forRoot({
                transport: {
                    host: process.env.MAILER_HOST,
                    port: 2525,
                    secure: false,
                    auth: {
                        user: process.env.MAILER_USER,
                        pass: process.env.MAILER_PASS,
                    },
                },
                defaults: {
                    from: '"No Reply" <noreply@example.com>',
                },
            }),
            user_module_1.UserModule,
            axios_1.HttpModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map