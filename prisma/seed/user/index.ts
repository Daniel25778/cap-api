import { PrismaClient } from '@prisma/client';

export const userSeed = async (DataSource: PrismaClient): Promise<void> => {
  await DataSource.user.createMany({
    data: [
      {
        email: 'captao@will',
        password: '$2b$10$AoPkXz7bw9nEODRBTbohieuag8f.6XpbjV1yfwqIOQZNr.MuYvnN2'
      }
    ]
  });
};
