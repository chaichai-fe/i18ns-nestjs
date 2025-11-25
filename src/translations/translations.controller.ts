import {
  Controller,
  Get,
  Post,
  Delete,
  HttpStatus,
  Param,
  Put,
  Res,
  UseGuards,
  Query,
} from '@nestjs/common'
import { TranslationsService } from './translations.service'
import CreateTranslationDto from './dto/create-translation.dto'
import { Body } from '@nestjs/common'
import { Response } from 'express'
import { AuthGuard } from 'src/auth/auth.guard'
import { ApiBearerAuth } from '@nestjs/swagger'
import { PaginationDto } from '../common/dto/pagination.dto'

@Controller('translations')
export class TranslationsController {
  constructor(private readonly translationsService: TranslationsService) {}

  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    const result = await this.translationsService.findAll(paginationDto)
    return {
      statusCode: HttpStatus.OK,
      message: 'find all success',
      result,
    }
  }

  @Post()
  async create(@Body() createTranslationDto: CreateTranslationDto) {
    const result = await this.translationsService.create(createTranslationDto)
    return {
      statusCode: HttpStatus.CREATED,
      message: 'create success',
      result,
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.translationsService.remove(+id)
    return {
      statusCode: HttpStatus.OK,
      message: 'delete success',
      result,
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTranslationDto: CreateTranslationDto,
  ) {
    const result = await this.translationsService.update(
      +id,
      updateTranslationDto,
    )
    return {
      statusCode: HttpStatus.OK,
      message: 'update success',
      result,
    }
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const result = await this.translationsService.findById(+id)
    return {
      statusCode: HttpStatus.OK,
      message: 'find by id success',
      result,
    }
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token') // swagger 认证使用
  @Get('export/json')
  async downloadTranslationsAsJson(@Res() res: Response) {
    const translations = await this.translationsService.getTranslationsAsJson()
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=translations.json',
    )

    return res.send(translations)
  }
}
