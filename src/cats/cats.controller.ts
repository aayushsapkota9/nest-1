import {
  Controller,
  Get,
  Post,
  Body,
  HttpStatus,
  HttpException,
  UseFilters,
  ForbiddenException,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from 'src/cats/interfaces/cat.interface';
import { CreateCatDto } from './dto/create-cats.dto';
import { HttpExceptionFilter } from 'src/httpexception/http-exception.filter';
// import { CreateCatDto } from './create-cat.dto';

@Controller('cats')
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
    throw new ForbiddenException();
  }

  @Get()
  async findAll() {
    throw new HttpException('Not Found', 404);
  }
}
