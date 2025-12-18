import { Controller, Get, Res } from '@nestjs/common';
import express from 'express';

@Controller()
export class AppController {
  constructor() { }

  @Get()
  getHello(@Res() res: express.Response) {
    return res.status(200).json({ message: `Health Check Passed` });
  }
}
