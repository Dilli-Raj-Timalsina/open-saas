import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Res,
  Req,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiExcludeEndpoint,
  ApiHeader,
  ApiTags,
} from '@nestjs/swagger';

import { Response } from 'express';
import { User as TUser } from 'src/user/entities/user.entity';
import { AuthService } from '../services/auth.service';
import {
  ConfirmOtpDto,
  ForgotPasswordDto,
  LoginDto,
  SignUpDto,
} from 'src/user/dto/user.dto';
import { RForgotPassword, RUser, TPayload, TSignupPayload } from '..';
import { User } from 'src/common/decorators/user.decorator';
import { RGeneralMessage } from 'src/common/types/responce';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common/decorators/roles.decorator';
import { GoogleOAuthGuard } from '../guards/google-oauth.guard';
import { FacebookGuard } from '../guards/facebook-oauth.guard';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiCreatedResponse({ type: RUser })
  @Post('signup')
  signup(@Body() body: SignUpDto): Promise<RUser> {
    return this.authService.signup(body);
  }

  @ApiCreatedResponse({ type: RUser })
  @Get('confirm-signup')
  confirmSignup(
    @User() user: TSignupPayload,
    @Res({ passthrough: true }) res: Response,
  ): Promise<RUser> {
    return this.authService.confirmSignup(user, res);
  }

  @ApiCreatedResponse({ type: RUser })
  @Post('login')
  login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<RUser> {
    return this.authService.login(body, res);
  }

  @ApiBearerAuth()
  @ApiHeader({
    name: 'user',
  })
  @ApiCreatedResponse({ type: RGeneralMessage })
  @Get('logout')
  @Roles('user')
  @UseGuards(AuthGuard)
  logout(@User() user: TPayload, @Res({ passthrough: true }) res: Response) {
    return this.authService.logout(user, res);
  }

  @ApiCreatedResponse({ type: RUser })
  @Get('refresh-token')
  @Roles('user')
  @UseGuards(AuthGuard)
  refreshToken(
    @User() user: TUser,
    @Res({ passthrough: true }) res: Response,
  ): Promise<RUser> {
    return this.authService.refreshToken(user, res);
  }

  @Get('google')
  @UseGuards(GoogleOAuthGuard)
  async googleAuth(): Promise<void> {}

  @ApiExcludeEndpoint()
  @Get('google-redirect')
  @UseGuards(GoogleOAuthGuard)
  googleAuthRedirect(@Req() req: any, @Res() res: Response): Promise<void> {
    return this.authService.googleLogin(req, res);
  }

  @Get('facebook')
  @UseGuards(FacebookGuard)
  async facebookLogin(): Promise<void> {}

  @ApiExcludeEndpoint()
  @Get('facebook/redirect')
  @UseGuards(FacebookGuard)
  async facebookLoginRedirect(
    @Req() req: any,
    @Res() res: Response,
  ): Promise<void> {
    return this.authService.facebookLogin(req, res);
  }

  @ApiCreatedResponse({
    type: RForgotPassword,
  })
  @Post('forgot-password')
  forgotPassword(
    @Body() body: ForgotPasswordDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.forgotPassword(body.email, res);
  }

  @ApiCreatedResponse({
    type: RGeneralMessage,
  })
  @Post('confirm-otp')
  @Roles('user')
  @UseGuards(RForgotPassword)
  confirmOtp(@Body() body: ConfirmOtpDto, @User() user: TUser) {
    return this.authService.confirmPasswordChange(
      user.email,
      body.otp,
      body.password,
    );
  }
}
