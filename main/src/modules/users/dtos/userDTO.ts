import Prisma from '@/shared/infrastructure/database';

export type UserDTO = typeof Prisma.getInstance.user.fields;
