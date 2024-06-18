export interface User {
    email: string;
    username: string;
    nameperson: string;
    password: string;
    isAdmin: boolean;
    isSubscribed: boolean;
}

export interface BusinessPerson extends User {
    rutCompany: string;
    rutPerson: string;
    nameCompany: string;
}