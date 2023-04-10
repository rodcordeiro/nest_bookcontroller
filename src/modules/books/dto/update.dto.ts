import { ApiProperty } from '@nestjs/swagger';

export class UpdateBookDTO {
  @ApiProperty({ required: false })
  name: string;

  @ApiProperty({ required: false })
  author: string;

  @ApiProperty({ required: false })
  releaseYear: number;
}
