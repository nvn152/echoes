import { Account, Avatars, Client, Databases, ID, Storage } from "appwrite";

export const appwriteConfig = {
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  url: import.meta.env.VITE_APPWRITE_URL,
  databaseid: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID,
  userCollectionId: import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID,
  postCollectionId: import.meta.env.VITE_APPWRITE_POST_COLLECTION_ID,
  savesCollectionId: import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID,
};

export const client = new Client();

client.setEndpoint(appwriteConfig.url).setProject(appwriteConfig.projectId);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);

// import { Client, Account } from "appwrite";

// export const client = new Client();

// client
//   .setEndpoint("https://cloud.appwrite.io/v1")
//   .setProject("659ce6825b667c82553f");
// export const account = new Account(client);
