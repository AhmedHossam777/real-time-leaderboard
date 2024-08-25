import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
	type: 'postgres',
<<<<<<< HEAD

	url: process.env.DATABASE_URL,


=======
	url: `${process.env.DATABASE_URL}`,
	ssl: {
		rejectUnauthorized: false,
	},
>>>>>>> e4e1e15ac312d9df13e29b416d380d758dbe3277
	entities: [__dirname + '/**/*.entity{.ts,.js}'], // Ensure the path is correct
	migrations: [__dirname + '/migrations/*{.ts,.js}'],
	synchronize: false,
	migrationsRun: true,
});

AppDataSource.initialize()
	.then(() => {
		console.log('Data Source has been initialized!');
	})
	.catch((err) => {
		console.error('Error during Data Source initialization', err);
	});