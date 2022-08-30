import {Entity, Column, OneToMany, Index} from "typeorm";
import {CommonEntity} from "./common.entity";
import {Post} from "./post.entity";

@Entity()
export class Board extends CommonEntity{

    @Index({ unique: true})
    @Column({ type:'varchar', unique: true, nullable: false})
    table : string

    @Column({ type:'varchar', unique: true, nullable: false})
    title : string

    @Column({ type:'varchar', nullable: false, default: 0})
    anonymous: number

    @Column( { type:'varchar', nullable: true})
    category: string

    @Column( { type:'varchar', nullable: false, default: "basic"})
    skin_path: string

    @OneToMany(() => Post, (post) => post.board)
    posts:Post[]

}