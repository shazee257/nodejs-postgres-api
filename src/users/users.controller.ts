import { Controller, Put, Body, UseGuards, Request, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @UseGuards(AuthGuard('jwt'))
    @Put('profile')
    async update(@Request() req: any, @Body() updateDto: any) {
        const userId = req.user.userId;

        // If password is provided, hash it
        if (updateDto.password) {
            updateDto.password = await bcrypt.hash(updateDto.password, 10);
        }

        return this.usersService.update(userId, updateDto);
    }

    @Get()
    async findAll() {
        return this.usersService.findAll();
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    async findOne(@Request() req: any) {
        console.log(req.user);
        return this.usersService.findById(req.user.id);
    }
}
