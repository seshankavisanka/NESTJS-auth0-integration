import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { PermissionGuard } from 'src/authorization/permission.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':userId')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @SetMetadata('permissions', ['create:user', 'admin'])
  @Post()
  create() {
    return this.userService.create();
  }

  @Patch(':userId')
  update(@Param('id') id: string) {
    return this.userService.update(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':userId')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
