import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async findAll(search: string, userId: string, page: number = 1, limit: number = 10): Promise<User[]> {

        const whereCondition: Prisma.UserWhereInput = {
            NOT: { id: userId },
        }

        if (search) {
            whereCondition.OR = [
                { username: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
            ]
        }

        return this.prisma.user.findMany({
            skip: (page - 1) * limit,
            take: limit,
            where: whereCondition
        });
    }

    async findOne(where: Prisma.UserWhereInput): Promise<User | null> {
        return this.prisma.user.findFirst({
            where,
        });
    }

    async findById(id: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { id },
        });
    }

    async create(data: Prisma.UserCreateInput): Promise<User> {
        return this.prisma.user.create({
            data,
        });
    }

    async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
        return this.prisma.user.update({
            where: { id },
            data,
        });
    }
}
