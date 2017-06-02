/**
 * Created by brajevicm on 2/06/17.
 */

export interface IPost {
    id: number;
    user_id: number;
    user: string;
    flag_id: number;
    title: string;
    image: string;
    timestamp: string;
    upvotes: number;
    comments: number;
}

export class Post implements IPost {
    id: number;
    user_id: number;
    user: string;
    flag_id: number;
    flag: string;
    title: string;
    image: string;
    timestamp: string;
    upvotes: number;
    comments: number;

    constructor(id: number,
                user_id: number,
                user: string,
                flag_id: number,
                flag: string,
                title: string,
                image: string,
                timestamp: string,
                upvotes: number,
                comments: number) {
    }
}