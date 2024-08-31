import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
	type: 'postgres',
	host: `${process.env.DB_HOST}`,
	port: `${process.env.DB_PORT}` as any,
	username: `${process.env.DB_USERNAME}`,
	password: `${process.env.DB_PASSWORD}`,
	database: `${process.env.DB_DATABASE}`,

	entities: [__dirname + '/**/*.entity{.ts,.js}'], // Ensure the path is correct
	migrations: [__dirname + '/migrations/*{.ts,.js}'],
	synchronize: false,
	migrationsRun: true,
});

AppDataSource.initialize()
             .then(() => {
	             console.log('Data Source has been initialized!')
             })
             .catch((err) => {
	             console.error('Error during Data Source initialization', err);
             })