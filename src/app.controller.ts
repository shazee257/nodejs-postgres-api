import { Controller, Get, Res } from '@nestjs/common';
import { generateResponse } from './common/helpers/generateResponse';
import express from 'express';

@Controller()
export class AppController {
  constructor() { }

  @Get()
  getHello(@Res() res: express.Response) {
    generateResponse(null, `Health Check Passed`, res);
  }
}
