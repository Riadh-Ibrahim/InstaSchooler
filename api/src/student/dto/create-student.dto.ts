import { IsString, IsNotEmpty, IsEmail, IsBoolean, Matches, MinLength, IsOptional } from 'class-validator';
import * as bcrypt from 'bcrypt';

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsString()
  @IsOptional()
  classe?: string;

  @IsBoolean()
  isPaid: boolean;

  @IsEmail()
  @IsNotEmpty()
  parentEmail: string;

  @IsNotEmpty()
  @Matches(/^([2459])[0-9]{7}$/, {
    message: 'Numéro de téléphone invalide.',
  })
  parentPhone: string;

  // Method to generate password and hash it
  async generateHashedPassword(): Promise<string> {
    const password = `${this.firstname}@${this.lastName.toUpperCase()}`;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }
}
