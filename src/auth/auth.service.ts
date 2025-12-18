import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async register(registerDto: any) {
        const { email, username, password } = registerDto;

        const existingUser = await this.usersService.findOne({
            OR: [{ email }, { username }],
        });

        if (existingUser) {
            throw new ConflictException('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await this.usersService.create({
            email,
            username,
            password: hashedPassword,
        });

        return user
    }

    async login(loginDto: any) {
        const { email, password } = loginDto;

        const user = await this.usersService.findOne({ email });

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { id: user.id, email: user.email };
        const access_token = await this.jwtService.signAsync(payload, {
            // expiresIn: '2h',
            // secret: process.env.JWT_SECRET,
        });

        return {
            user,
            access_token,
        };
    }
}
