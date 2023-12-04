
import conf from "../config/conf";
import { Client, Account, ID } from "appwrite";


export class AuthService{
    client = new Client()
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
            this.account = new Account(this.client)
    }

    async createAccount({email,password}){
        try{
            const userAccount = await this.account.create(ID.unique(),email,password)
            if(userAccount){
                return userAccount
            }else{
                return userAccount
            }
        }catch(error){
            console.log("Error creating account", error)
            throw error;
        }
    }

    async login({email,password}){
        try{
           return await this.account.createEmailSession(email,password)
        }catch(error){
            console.log("Error login account", error)
            throw error;
        }
    }

    async getCurrentUser(){
        try{
            return await this.account.get()
        }catch(error){
            console.log("Error login account", error)
            throw error;
        }

    }

    async logout(){
        try{
            return await this.account.deleteSessions()
        }catch(error){
            console.log("Error logout account", error)
            throw error;
        }
        
    }


}

const authService = new AuthService()

export default authService