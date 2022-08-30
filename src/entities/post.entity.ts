import {Entity, Column, ManyToOne, OneToMany, JoinColumn} from "typeorm";
import {CommonEntity} from "./common.entity";
import {User} from "./user.entity";
import {Comment} from "./comment.entity";
import {Board} from "./board.entity";

@Entity()
export class Post extends CommonEntity{

    @Column({ type:'varchar', nullable: false})
    subject: string

    @Column( { type:'text', nullable: false})
    content: string

    @Column( { type:'int', nullable: false, default: 0})
    view_count: number

    @ManyToOne(() => User, (user) => user.posts)
    @JoinColumn([
        {
            name: 'user_id',
            referencedColumnName:'user_id'
        }
    ])
    user: User

    @OneToMany(() => Comment, (comment) => comment.post)
    comments: Comment[]

    @ManyToOne(()=> Board, (board) => board.posts, )
    @JoinColumn([
        {
            name: 'board_table',
            referencedColumnName:'table'
        }
    ])
    board: Board
}