import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { AuthDTO } from '../auth.dto';
import { Response } from 'express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SkipAuth } from '../skip-auth.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiResponse({ status: HttpStatus.OK, description: 'User log in ' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Credential are invalid',
  })
  @SkipAuth()
  @Post('login')
  public async signIn(@Body() signInDto: AuthDTO, @Res() res: Response) {
    const { access_token } = await this.authService.signIn(
      signInDto.email,
      signInDto.password,
    );
    return res
      .status(HttpStatus.OK)
      .json({ message: 'User Log in', access_token });
  }
}
