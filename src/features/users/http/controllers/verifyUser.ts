import { Request, Response } from 'express';
import prisma from '../../../../utils/prismaClient';
import redis from '../../../../utils/redisClient';
import { hashPassword } from '../../../../utils/bcrypt';

export const verifyUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, code } = req.body;

  const redisKey = `verify:${email}`;
  const data = await redis.get(redisKey);

  if (!data) {
    res.status(400).json({
      status: 'error',
      code: 400,
      message: 'Data verifikasi tidak ditemukan atau kadaluarsa.',
    });
    return;
  }

  const parsed = JSON.parse(data);

  if (parsed.code !== code) {
    res.status(400).json({
      status: 'error',
      code: 400,
      message: 'Kode verifikasi salah.',
    });
    return;
  }

  try {
    const hashedPassword = await hashPassword(parsed.password);

    const newUser = await prisma.user.create({
      data: {
        name: parsed.name,
        email: parsed.email,
        username: parsed.email,
        password: hashedPassword,
        role: parsed.role,
      },
    });

    await redis.del(redisKey);

    res.status(201).json({
      status: 'success',
      code: 201,
      message: 'Registrasi berhasil.',
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        username: newUser.email,
        role: newUser.role,
        createdAt: newUser.createdAt,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: 'error',
      code: 500,
      message: 'Terjadi kesalahan saat menyimpan data.',
    });
  }
};
