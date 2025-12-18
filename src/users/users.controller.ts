import { Controller, Put, Body, UseGuards, Request, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import * as bcrypt from 'bcrypt';
import { GetCurrentUserId } from 'src/common/decorators/getCurrentUserId';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @UseGuards(AuthGuard('jwt'))
    @Put('profile')
    async update(@GetCurrentUserId() userId: string, @Body() updateDto: any) {
        // If password is provided, hash it
        if (updateDto.password) {
            updateDto.password = await bcrypt.hash(updateDto.password, 10);
        }

        return this.usersService.updateById(userId, updateDto);
    }

    @Get()
    async findAll() {
        return this.usersService.findAll();
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    async findOne(@GetCurrentUserId() userId: string) {
        return this.usersService.findById(userId);
    }
}
