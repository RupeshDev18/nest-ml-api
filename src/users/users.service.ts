import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}


  async create(dto: CreateUserDto): Promise<User> {
  const hash = await bcrypt.hash(dto.password, 10);
  const user = this.userRepo.create({
    username: dto.username,
    password: hash,
  });
  return this.userRepo.save(user);
 }


  async findByUsername(username: string): Promise<User | undefined | null> {
    return this.userRepo.findOne({ where: { username } });
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.findByUsername(username);
    if (!user) return null;
    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch ? user : null;
  }
}
