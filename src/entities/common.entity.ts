import {CreateDateColumn, DeleteDateColumn, UpdateDateColumn, PrimaryGeneratedColumn} from "typeorm";
import {IsUUID} from "class-validator";

export abstract class CommonEntity {
    @IsUUID()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @CreateDateColumn({
        type: 'timestamp'
    })
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamp'})
    updatedAt: Date

    @DeleteDateColumn({ type: 'timestamp'})
    deletedAt?: Date | null

}