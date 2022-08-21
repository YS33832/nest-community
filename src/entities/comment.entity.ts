import {Entity, Column, ManyToOne, JoinColumn} from "typeorm";
import {CommonEntity} from "./common.entity";
import {User} from "./user.entity";
import {Post} from "./post.entity";

@Entity()
export class Comment extends CommonEntity{


    @Column( { type:'text', nullable: false})
    content: string

    @ManyToOne(() => User, (user) => user.comments)
    @JoinColumn([
        {
            name: 'user_id',
            referencedColumnName:'user_id'
        }
    ])
    user: User

    @ManyToOne(()=> Post, (post) => post.comments,)
    @JoinColumn([
        {
            name: 'post_id',
            referencedColumnName:'id'
        }
    ])
    post: Post
}