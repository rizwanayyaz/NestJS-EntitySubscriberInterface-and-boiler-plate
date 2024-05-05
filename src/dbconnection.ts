import { DataSource } from "typeorm";
import { User } from "./users/entities/user.entity";
import { UserSubscriber } from "./users/usersSubscriber";
import { ConfigModule } from "@nestjs/config";

ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true,
  })
const host =  process.env.DB_HOST;
const port:any = process.env.DB_PORT;
const type:any = process.env.DB_TYPE;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;

export const appDataSource = new DataSource({
    
    type: "mysql",
    host: host,
    port: port,
    username: username,
    password: password,
    database: database,
    entities: [User],
    synchronize: true,
    subscribers: [UserSubscriber],
    //logging: true,
    //logger: 'advanced-console'
 });
 
 const main = async () => {
     console.time('main');
     await appDataSource.initialize();
 };
 
 main().catch(err => {
     console.error(err);
     process.exit(1);
 });