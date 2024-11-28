import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { EOrderBy } from '../enum';

export class BasePaginationDto {
  @ApiProperty({
    type: 'number',
    required: false,
    example: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiProperty({
    type: 'number',
    required: false,
    example: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number = 10;

  @ApiProperty({
    type: 'string',
    required: false,
    enum: EOrderBy,
    example: EOrderBy.DESC,
  })
  @IsOptional()
  @IsString()
  @IsEnum(EOrderBy)
  sort?: EOrderBy;

  @ApiProperty({
    type: 'string',
    required: false,
  })
  @IsOptional()
  @IsString()
  search?: string;

  get skip(): number {
    return this.limit * (this.page - 1);
  }
}
