import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { CreateCatDto } from './create-cat.dto';

@Controller('cats')
export class CatsController {
  @Header('Cache-Control', 'none')
  @Post()
  create(@Body() createCatDto: CreateCatDto): string {
    return 'This action adds a new cat';
  }
  @Get('all')
  @HttpCode(204)
  findAll(): string {
    return 'This action returns all cats';
  }
  @Get(':id')
  findOne(@Param() params: any): string {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
  }
  @Get('ab*cd')
  find() {
    return 'This route uses a wildcard';
  }
}
