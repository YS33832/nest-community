import {Entity, Column, OneToMany} from "typeorm";
import {CommonEntity} from "./common.entity";
import {Comment} from "./comment.entity";
import {Post} from "./post.entity";

@Entity()
export class User extends CommonEntity{

    @Column({ type:'varchar', unique: true, nullable: false})
    user_id : string

    @Column({ type:'varchar', nullable: false})
    user_password: string

    @Column( { type:'varchar', nullable: false})
    user_name: string

    @Column( { type:'varchar', nullable: false})
    user_email: string

    @Column( { type:'int', nullable: false, default: 1})
    user_level: number

    @OneToMany(() => Comment, (comment) => comment.user, {
        cascade: true,
    })
    comments: Comment[]

    @OneToMany(() => Post, (post) => post.user, {
        cascade: true,
    })
    posts: Post[]
}