import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import TokenConfig from './../Config/Token';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

function Auth(request: Request, response: Response, next: NextFunction): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('Token de acesso nao encontrado');
  }

  try {
    const [, token] = authHeader.split(' ');

    const { secret } = TokenConfig.JWT;

    const decoded = verify(token, secret);

    console.log(decoded);

    const { sub } = decoded as TokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch (error) {
    throw new Error('Token Inavlido');
  }
}

export default Auth;
