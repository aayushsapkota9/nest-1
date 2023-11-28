import {
  Controller,
  Get,
  Post,
  Body,
  HttpStatus,
  HttpException,
  UseFilters,
  ForbiddenException,
  Param,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from 'src/cats/interfaces/cat.interface';
import { CreateCatDto } from './dto/create-cats.dto';
import { HttpExceptionFilter } from 'src/httpexception/http-exception.filter';
// import { ZodValidationPipe } from './validation.pipe';
// import { CreateCatDto } from './create-cat.dto';

@Controller('cats')
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private catsService: CatsService) {}

  // @Post()
  // @UsePipes(new ZodValidationPipe(createCatSchema))
  // async create(@Body() createCatDto: CreateCatDto) {
  //   this.catsService.create(createCatDto);
  // }

  @Post()
  async create(@Body(new ValidationPipe()) createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll() {
    throw new HttpException('Not Found', 404);
  }

  @Get(':id')
  async findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.catsService.findOne(id);
  }
}
