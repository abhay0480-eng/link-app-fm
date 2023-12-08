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

    async addLinks({Platform,LinksUrl,status,userID}){
        try{
            await this.databases.createDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,ID.unique(),
                {Platform,LinksUrl,status,userID}
            )
          
        }catch(error){
            console.log("Error creating account", error)
            throw error;
        }
    }
    async addProfileInfo({profileImage,firstName,lastName,email,status,userId}){
        try{
           const profileRes =  await this.databases.createDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId2,ID.unique(),
                {profileImage,firstName,lastName,email,status,userId}

            )
            return profileRes
          
        }catch(error){
            console.log("Error creating account", error)
            throw error;
        }
    }
    async updateLinks({Platform,LinksUrl,documentId}){
        try{
            await this.databases.updateDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,documentId,
                {Platform,LinksUrl}
            )
          
        }catch(error){
            console.log("Error creating account", error)
            throw error;
        }
    }
    async updateProfileInfo({profileImage,firstName,lastName,email,status},userId){
        try{
          const profileRes =   await this.databases.updateDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId2,userId,
                {profileImage,firstName,lastName,email,status}
            )
            return profileRes
          
        }catch(error){
            console.log("Error creating account", error)
            throw error;
        }
    }
    async deleteLinks({documentId}){
        try{
            await this.databases.deleteDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,documentId
            )

            return true
          
        }catch(error){
            console.log("Error creating account", error)
            return false
        }
    }
    async getLink(id){
        try{
           const alllinks = await this.databases.listDocuments(conf.appwriteDatabaseId,conf.appwriteCollectionId,
                [
                    Query.equal('userID',[id] )
                ]
            )

            return alllinks
          
        }catch(error){
            console.log("Error creating account", error)
            throw error;
        }
    }

    async getProfileDetails(id){
        try{
            const profileDetails = await this.databases.listDocuments(conf.appwriteDatabaseId,conf.appwriteCollectionId2,
                [
                    Query.equal("userId", [id])
                ]
            )

            return profileDetails
          
        }catch(error){
            console.log("Error creating account", error)
            throw error;
        }
    }

    async uploadFile(file){
        try{
           const FileData =   await this.bucket.createFile(conf.appwriteBucketId, ID.unique() , file 
            )

            return FileData
          
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

    async getImageFile(fileId){
        try{
           const fileurl= await this.bucket.getFilePreview(conf.appwriteBucketId, fileId 
            )
          return fileurl
        }catch(error){
            console.log("Error creating account", error)
            throw error;
        }
    }
}

const service  = new Service
export default service