import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/login")
  logIn(
    @Body(ValidationPipe)
  ): Promise<void> {
    return this.authService.logIn();
  }
}
