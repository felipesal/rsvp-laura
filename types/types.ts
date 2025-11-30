export interface Invite{
    token: String,
    name: String,
    status: String,
    companions: Companion[]
}

export interface Companion{
    name: String,
    status: String
}