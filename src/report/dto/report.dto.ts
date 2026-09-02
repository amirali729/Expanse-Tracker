import {
  IsDate,
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class MonthlyReportQueryDto {
  @IsDateString()
  year: string;

  @IsDateString()
  month: string;
}

export class ReportQueryDto {
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;
}
//year: number
// month: number (1-12)

// startDate: date
// endDate: date MonthlyReportQuerDto
