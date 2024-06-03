import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { UserDTO } from '../user-dto';
import { UserService } from '../services/users.service';
import { Response } from 'express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SkipAuth } from '../../auth/skip-auth.decorator';
import { Logger } from 'src/config/logger';

@ApiTags('Users')
@Controller('/users')
export class UsersController {
  constructor(
    private readonly userService: UserService,
    private readonly logger: Logger,
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Create a new user in database',
  })
  @SkipAuth()
  @Post('signup')
  public async create(@Body() userDTO: UserDTO, @Res() res: Response) {
    const user = await this.userService.create(userDTO);
    this.logger.log('[UsersController] : creating a user...');
    return res
      .status(HttpStatus.CREATED)
      .json({ message: 'User created', user });
  }
}
