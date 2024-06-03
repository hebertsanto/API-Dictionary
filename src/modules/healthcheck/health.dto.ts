import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class HealthDTO {
  @IsNumber()
  @ApiProperty({ description: 'Code to return to the client' })
  code: number;

  @ApiProperty({ description: 'Message to return to the client' })
  @IsString()
  message: string;

  @ApiProperty({ description: 'Date to return to the client' })
  @IsDate()
  date: Date;
}
