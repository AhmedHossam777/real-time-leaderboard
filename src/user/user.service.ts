import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
	constructor(@InjectRepository(User) private repo: Repository<User>) {}

	async create(createUserDto: CreateUserDto) {
		const user = this.repo.create(createUserDto);
		return await this.repo.save(user);
	}

	async findAll() {
		return await this.repo.find();
	}

	async findOne(id: number) {
		if (!id) throw new NotFoundException('user not found');
		return await this.repo.findOneBy({ id });
	}

	async find(email: string) {
		return await this.repo.find({ where: { email } });
	}

	async update(id: number, updateUserDto: UpdateUserDto) {
		const user = await this.repo.findOneBy({ id });
		if (!user) throw new NotFoundException('user not found');
		Object.assign(user, updateUserDto);
		return await this.repo.save(user);
	}

	async remove(id: number) {
		const user = await this.repo.findOneBy({ id });
		if (!user) throw new NotFoundException('user not found');
		await this.repo.remove(user);
		return 'user removed';
	}
}