import { IsString, IsNotEmpty, Matches, IsEnum, IsBoolean, IsEmail, IsInt, IsOptional, ValidateIf, Max, Min, MinLength } from 'class-validator';
import { Matiere } from '../matiere.enum';
import * as bcrypt from 'bcrypt';

export class CreateTeacherDto {
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

  @IsEnum(Matiere)
  matiere: Matiere;

  @IsBoolean()
  isPaid: boolean;

  @IsNotEmpty()
  @Matches(/^([2459])[0-9]{7}$/, {
    message: 'Numéro de téléphone invalide.',
  })
  Phone: string;

  // Method to generate password and hash it
  async generateHashedPassword(): Promise<string> {
    const password = `${this.firstname}@${this.lastName.toUpperCase()}`;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }
}
