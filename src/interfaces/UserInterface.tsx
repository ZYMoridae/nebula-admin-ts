export default interface UserInterface {
  id: number,
  username: string,
  email: string,
  role: RoleInterface
  createdAt? : string,
  updatedAt? : string,
  telephone: string,
  address1: string,
  address2: string,
  firstname: string,
  lastname: string,
  gender: string,
  admin: boolean
}

export interface RoleInterface {
  id: number,
  code: string
}