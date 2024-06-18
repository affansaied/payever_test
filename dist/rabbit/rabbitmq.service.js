"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitService = void 0;
const common_1 = require("@nestjs/common");
const amqp = require("amqplib");
require("dotenv/config");
let RabbitService = class RabbitService {
    async init() {
        this.connection = await amqp.connect(process.env.RABBITMQ_URL);
        this.channel = await this.connection.createChannel();
        await this.channel.assertExchange('user_created', 'fanout');
    }
    async sendMessage(message) {
        this.channel.publish('user_created', '', Buffer.from(JSON.stringify(message)));
    }
};
RabbitService = __decorate([
    (0, common_1.Injectable)()
], RabbitService);
exports.RabbitService = RabbitService;
//# sourceMappingURL=rabbitmq.service.js.map