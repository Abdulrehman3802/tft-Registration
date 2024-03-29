import { INestApplication, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy  {

  constructor() {
    super({
      // log: ['query']
    });
  }

  async onModuleInit() {
    try {
      await this.$connect();
    } catch (error) {
      console.error('Error connecting to the database:', error);
    }
  }

  async enableShutdownHooks(app: INestApplication) {
    // @ts-ignore
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }

  async onModuleDestroy() {
    try {
      await this.$disconnect();
    } catch (error) {
      console.error('Error disconnecting from the database:', error);
    }
  }
}