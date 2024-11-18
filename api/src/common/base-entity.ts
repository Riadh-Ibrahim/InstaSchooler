import { 
    PrimaryGeneratedColumn, 
    Column, 
    CreateDateColumn, 
    UpdateDateColumn, 
    DeleteDateColumn 
  } from "typeorm";
  
  export abstract class BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ type: 'varchar', length: 255 })
    firstname: string;
  
    @Column()
    lastName: string;
  
    @Column()
    email: string;
  
    @Column()
    password: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    deletedBy: string;
  
    @CreateDateColumn({ type: 'timestamp', update: false })
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
  
    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deletedAt: Date;
  }
  