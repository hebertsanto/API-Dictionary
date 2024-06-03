import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { UserDTO } from '../user-dto';
import { UserService } from '../services/users.service';
import { Response } from 'express';

@Controller('/users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post()
  public async create(@Body() usersDto: UserDTO, @Res() res: Response) {
    const user = await this.userService.create(usersDto);
    return res
      .status(HttpStatus.CREATED)
      .json({ message: 'User created !', user });
  }
}
