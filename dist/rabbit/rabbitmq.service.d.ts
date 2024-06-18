import 'dotenv/config';
export declare class RabbitService {
    private connection;
    private channel;
    init(): Promise<void>;
    sendMessage(message: any): Promise<void>;
}
