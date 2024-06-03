import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { UserDTO } from '../user-dto';
import { UserService } from '../services/users.service';
import { Response } from 'express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SkipAuth } from 'src/modules/auth/skip-auth.decorator';

@ApiTags('Users')
@Controller('/users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Create a new user in database',
  })
  @SkipAuth()
  @Post()
  public async create(@Body() usersDto: UserDTO, @Res() res: Response) {
    const user = await this.userService.create(usersDto);
    return res
      .status(HttpStatus.CREATED)
      .json({ message: 'User created', user });
  }
}
