import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/modules/users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findByEmail(email);

    const isValidPassword = await bcrypt.compare(user.pasword, pass);
    if (!isValidPassword) {
      throw new UnauthorizedException('Credential are invalid');
    }
    const payload = { email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
