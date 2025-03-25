import { RGeneral, RGeneralMessage } from 'src/common/types/responce';

export class RForgotPassword extends RGeneralMessage {
  access_token: string;
}

//response type of login and signup in auth
export class RUser extends RGeneral {
  access_token: string;
}

export class TPayload {
  id: string;
  email: string;
  roles: string[];
  firstName: string;
  middleName: string | null;
  lastName: string | null;
  iat: string;
  exp: string;
  premiumExpiry: Date | null;
  session_id: string;
}

export class TSignupPayload {
  email: string;
  roles: string[];
  password: string;
  firstName: string;
  middleName: string;
  lastName: string;
}
