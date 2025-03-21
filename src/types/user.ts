export type Role = "STUDENT" | "ADMIN" | "OWNER";

export type User = {
    firstName: string,
    lastName: string,
    email: string,
    id: number,
    role: Role
}

export type Session = {
    access_token: string,
    user: User
}

export type UserData = {
    profilePicture: string;
    contact: string;
} & User
