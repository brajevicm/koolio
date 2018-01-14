/**
 * Created by brajevicm on 2/06/17.
 */

export interface IUser {
  id: number;
  role_id: number;
  role: string;
  flag_id: number;
  flag: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  image: string;
  token: string;
  profile_image: string;
}

export class User implements IUser {
  id: number;
  role_id: number;
  role: string;
  flag_id: number;
  flag: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  image: string;
  token: string;
  profile_image: string;

  constructor(id: number,
              role_id: number,
              role: string,
              flag_id: number,
              flag: string,
              username: string,
              password: string,
              firstname: string,
              lastname: string,
              image: string,
              token: string,
              profile_image: string) {
  }
}
