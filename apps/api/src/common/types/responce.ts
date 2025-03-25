//success responce (status)
export class RGeneral {
  status: string;
}

//success response (status,message)
export class RGeneralMessage extends RGeneral {
  message: string;
}
