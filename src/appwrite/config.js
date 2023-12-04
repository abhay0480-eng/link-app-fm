/* eslint-disable no-unused-vars */
import conf from "../config/conf";
import { Client, ID, Databases,Storage,Query } from "appwrite";

export class Service{
    client = new Client()
    databases;
    bucket;
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
            this.databases = new Databases(this.client)
            this.bucket = new Storage(this.client)
    }

    async addLinks({platform,link,profileImage,firstName,lastName,email,status,userId}){
        try{
            await this.databases.createDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,ID.unique(),
                {platform,link,profileImage,firstName,lastName,email,status,userId}
            )
          
        }catch(error){
            console.log("Error creating account", error)
            throw error;
        }
    }
    async addProfileInfo({profileImage,firstName,lastName,email,status,userId}){
        try{
            await this.databases.createDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId2,ID.unique(),
                {profileImage,firstName,lastName,email,status,userId}
            )
          
        }catch(error){
            console.log("Error creating account", error)
            throw error;
        }
    }
    async updateLinks({platform,link}){
        try{
            await this.databases.updateDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,ID.unique(),
                {platform,link}
            )
          
        }catch(error){
            console.log("Error creating account", error)
            throw error;
        }
    }
    async updateProfileInfo({profileImage,firstName,lastName,email,status,userId}){
        try{
            await this.databases.updateDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId2,ID.unique(),
                {profileImage,firstName,lastName,email,status,userId}
            )
          
        }catch(error){
            console.log("Error creating account", error)
            throw error;
        }
    }
    async deleteLinks({userId}){
        try{
            await this.databases.deleteDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,userId
            )

            return true
          
        }catch(error){
            console.log("Error creating account", error)
            return false
        }
    }
    async getLink(){
        try{
            await this.databases.listDocuments(conf.appwriteDatabaseId,conf.appwriteCollectionId,ID.unique(),
            Query.equal('platform', 'link')
            )
          
        }catch(error){
            console.log("Error creating account", error)
            throw error;
        }
    }

    async getProfileDetails(userId){
        try{
            await this.databases.getDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId2,userId,
            )
          
        }catch(error){
            console.log("Error creating account", error)
            throw error;
        }
    }

    async uploadFile(file){
        try{
            await this.bucket.createFile(conf.appwriteBucketId, ID.unique() , file 
            )
          
        }catch(error){
            console.log("Error creating account", error)
            throw error;
        }
    }

    async deleteFile(fileId){
        try{
            await this.bucket.deleteFile(conf.appwriteBucketId, fileId 
            )
          return true
        }catch(error){
            console.log("Error creating account", error)
            throw error;
        }
    }
}

const service  = new Service
export default service