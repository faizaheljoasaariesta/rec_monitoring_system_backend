import { Request, Response } from 'express';
import prisma from '../../../../utils/prismaClient';
import { comparePassword } from '../../../../utils/bcrypt';
import { generateToken } from '../../../../utils/jsonwebtoken';
import loginUserSchema from '../schema/loginUserSchema';
import { IUserLoginRequest } from '../../../../types';

export const loginUser = async (
  req: Request<{}, {}, IUserLoginRequest>,
  res: Response
): Promise<void> => {
  const { error } = loginUserSchema.validate(req.body, { abortEarly: true });
  if (error) {
    res.status(400).json({
      status: 'error',
      code: 400,
      message: 'Validasi input gagal',
      details: error.details.map((err) => err.message),
    });
    return;
  }

  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: 'User tidak ditemukan.',
      });
      return;
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({
        status: 'error',
        code: 401,
        message: 'Password salah.',
      });
      return;
    }

    const token = generateToken(user.id);

    await prisma.logActivityUser.upsert({
      where: { userId: user.id },
      update: {
        status: 'online',
        timeLogin: new Date(),
        timeLogout: null,
      },
      create: {
        userId: user.id,
        status: 'online',
        timeLogin: new Date(),
      },
    });

    res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Login berhasil.',
      data: {
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      },
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
