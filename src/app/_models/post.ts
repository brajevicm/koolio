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
    upvoted: number;
    isActivePost: boolean;
    isActiveComment: boolean;
    isActiveReport: boolean;
    isActiveRemove: boolean;
    reports: number;
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
    upvoted: number;
    isActivePost: boolean;
    isActiveComment: boolean;
    isActiveReport: boolean;
    isActiveRemove: boolean;
    reports: number;

    constructor(id: number,
                user_id: number,
                user: string,
                flag_id: number,
                flag: string,
                title: string,
                image: string,
                timestamp: string,
                upvotes: number,
                comments: number,
                upvoted: number,
                isActive: boolean,
                isActiveComment: boolean,
                isActiveReport: boolean,
                isActiveRemove: boolean,
                reports: number) {
    }
}