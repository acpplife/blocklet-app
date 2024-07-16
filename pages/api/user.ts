import { serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../api/prisma';
import { uuid } from '../../utils';
import { profileFormSchema, ProfileFormValues } from '../../validator/profile';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { userId } = req.cookies;
    if (!userId) {
      return res.json({ user: null });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    return res.json({ user });
  } else if (req.method === 'POST') {
    const validation = profileFormSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ errors: validation.error.errors });
    }

    const { username, email, phone } = req.body as ProfileFormValues;
    let userId = req.cookies.userId;

    if (!userId) {
      userId = uuid();
      res.setHeader('Set-Cookie', serialize('userId', userId, { path: '/' }));
    }

    const user = await prisma.user.upsert({
      where: { id: userId },
      update: { username, email, phone },
      create: {
        id: userId,
        username,
        email,
        phone,
      },
    });

    return res.json({ user });
  } else {
    res.status(405).end();
  }
}
