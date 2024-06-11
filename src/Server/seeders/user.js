import { TryCatch } from "../middelwares/error.js"
import { User } from "../models/user.js";
import {faker} from "@faker-js/faker"

const createUser=async(numUsers)=>{
    try {
        const usersPromise=[];
        for (let i=0; i< 10; i++ ){
            const tempUser=User.create({
                name:faker.person.fullName(),
                username:faker.internet.userName(),
                password:"password",
                avatar:{
                    url:faker.image.avatar(),
                    public_id:faker.system.fileName(),
                }
            })
            usersPromise.push(tempUser)
        }
        await Promise.all(usersPromise);
        console.log("Users created", numUsers);
        process.exit(1)

    } catch (error) {
        console.log(error)
    }
}
export {createUser}