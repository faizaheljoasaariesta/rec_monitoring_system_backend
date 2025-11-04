import { Request, Response } from 'express';
import crypto from 'crypto';
import { IUserRegisterRequest } from '../../../../types';
import { sendVerificationEmail } from '../../../../utils/mails/verify';

import prisma from '../../../../utils/prismaClient';
import redis from '../../../../utils/redisClient';
import registerUserSchema from '../schema/registerUserSchema';

export const registerUser = async (
  req: Request<{}, {}, IUserRegisterRequest>,
  res: Response
): Promise<void> => {
  const { error } = registerUserSchema.validate(req.body, { abortEarly: true });
  if (error) {
    res.status(400).json({
      status: 'error',
      code: 400,
      message: 'Validasi input gagal',
      details: error.details.map((err) => err.message),
    });
    return;
  }

  const { name, email, password, confirmPassword } = req.body;

  const validDomains = ['mail.ugm.ac.id', 'ugm.ac.id'];
  const emailDomain = email.split('@')[1];

  if (!validDomains.includes(emailDomain)) {
    res.status(400).json({
      status: 'error',
      code: 400,
      message: 'Email harus menggunakan domain UGM.',
    });
    return;
  }

  const domainRoleMap: Record<string, 'operator' | 'administrator'> = {
    'mail.ugm.ac.id': 'operator',
    'ugm.ac.id': 'administrator',
  };

  const role = domainRoleMap[emailDomain];

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
        ],
      },
    });

    if (existingUser) {
      res.status(409).json({
        status: 'error',
        code: 409,
        message: 'Username atau email sudah digunakan.',
      });
      return;
    }

    if (password !== confirmPassword) {
      res.status(409).json({
        status: 'error',
        code: 409,
        message: 'Konfirmasi password tidak cocok.',
      });
      return;
    }

    const verificationCode = crypto.randomInt(100000, 999999).toString();
    const redisKey = `verify:${email}`;

    const userData = {
      name,
      email,
      password,
      role,
      code: verificationCode,
    };

    await redis.set(redisKey, JSON.stringify(userData), 'EX', 600);

    await sendVerificationEmail(email, verificationCode);

    res.status(200).json({
      status: 'pending',
      code: 200,
      message: 'Kode verifikasi telah dikirim ke email Anda.',
      data: { email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: 'error',
      code: 500,
      message: 'Terjadi kesalahan pada server.',
    });
  }
};