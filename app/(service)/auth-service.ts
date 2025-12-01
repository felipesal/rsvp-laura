import db from "@/lib/db";
import { compareSync } from "bcrypt-ts";

type User = {
    name: string,
    email: string,
    password?: string,
    id: string
}

export async function authenticate(email: string, password: string):Promise<User | null> {
    const user = await db.user.findFirst({
        where: {email}
    });

    if(!user) {
        return null;
    }

    const passwordMatch = compareSync(password, user.password);

    console.log("auth result",passwordMatch);

    if(passwordMatch) {
        return {email: user.email, name: user.name, id: user.id};
    }

    return null;
}