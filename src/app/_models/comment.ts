/**
 * Created by brajevicm on 2/06/17.
 */

export interface IComment {
    id: number;
    user_id: number;
    user: string;
    avatar: string;
    post_id: number;
    post: string;
    flag_id: number;
    flag: string;
    text: string;
    timestamp: string;
    upvotes: number;
}

export class Comment implements IComment {
    id: number;
    user_id: number;
    user: string;
    avatar: string;
    post_id: number;
    post: string;
    flag_id: number;
    flag: string;
    text: string;
    timestamp: string;
    upvotes: number;

    constructor(id: number,
                user_id: number,
                user: string,
                avatar: string,
                post_id: number,
                post: string,
                flag_id: number,
                flag: string,
                text: string,
                timestamp: string,
                upvotes: number) {
    }
}