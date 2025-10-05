import { Controller, Get } from '@nestjs/common'

@Controller('/')
export class AppController {
  @Get()
  getIndex(): string {
    return 'Hello, this is the API for the translation system.'
  }
}
