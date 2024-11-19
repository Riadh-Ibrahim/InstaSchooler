import { IsString, IsNotEmpty, Matches, IsEnum, IsBoolean, IsEmail, IsInt, IsOptional, ValidateIf, Max, Min, MinLength } from 'class-validator';
import { Niveau } from '../niveau.enum';
import { Section } from '../section.enum';
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

  @IsEnum(Niveau)
  niveau: Niveau;

  @IsInt()
  @Min(1)
  @Max(9)
  classe: number;

  @IsInt()
  @IsNotEmpty()
  groupe: number;

  @IsOptional()
  @ValidateIf((o) => o.niveau === Niveau.Secondaire && o.classe >= 2 && o.classe <= 4)  // La section est valide seulement si niveau est Secondaire et classe entre 2 et 4
  @IsEnum(Section, {
    message: 'La section doit être une des options suivantes : Lettres, Sciences, Informatique, EconomieGestion, Techniques, ou Mathematiques.',
  })
  section?: Section;

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

  // Validate classe based on niveau
  @ValidateIf((o) => o.niveau === Niveau.Primaire)
  validateClasseForPrimaire() {
    if (this.classe > 6) {
      throw new Error('Pour le niveau Primaire, la classe doit être inférieure ou égale à 6.');
    }
  }

  @ValidateIf((o) => o.niveau === Niveau.DeBase)
  validateClasseForDeBase() {
    if (this.classe < 7 || this.classe > 9) {
      throw new Error('Pour le niveau DeBase, la classe doit être entre 7 et 9.');
    }
  }

  @ValidateIf((o) => o.niveau === Niveau.Secondaire)
  validateClasseForSecondaire() {
    if (this.classe < 1 || this.classe > 4) {
      throw new Error('Pour le niveau Secondaire, la classe doit être entre 1 et 4.');
    }

    // La section est interdite pour la classe 1
    if (this.classe === 1 && this.section) {
      throw new Error('Pour la classe 1, aucune section ne doit être sélectionnée.');
    }

    // Pour les classes 2 à 4 : section obligatoire, mais les options dépendent de la classe
    if ((this.classe === 2 || this.classe === 3 || this.classe === 4) && !this.section) {
      throw new Error('Pour les classes 2, 3 ou 4, une section doit être sélectionnée.');
    }

    // Sections disponibles pour la classe 2
    if (this.classe === 2) {
      if (![Section.Lettres, Section.Sciences, Section.Informatique, Section.EconomieGestion].includes(this.section)) {
        throw new Error('Pour la classe 2, les sections disponibles sont Lettres, Sciences, Informatique, ou Economie & Gestion.');
      }
    }

    // Sections disponibles pour la classe 3 et 4
    if (this.classe === 3 || this.classe === 4) {
      if (![Section.Lettres, Section.Sciences, Section.Informatique, Section.EconomieGestion, Section.Mathematiques, Section.Techniques].includes(this.section)) {
        throw new Error('Pour la classe 3 et 4, les sections disponibles sont Lettres, Sciences, Informatique, Economie & Gestion, Mathematiques, ou Techniques.');
      }
    }
  }

  // Method to generate password and hash it
  async generateHashedPassword(): Promise<string> {
    const password = `${this.firstname}@${this.lastName.toUpperCase()}`;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }
}
