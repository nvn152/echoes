import { ID, Query } from "appwrite";

import { appwriteConfig, account, databases, avatars } from "./config";
import { INewUser } from "@/types";

// ============================================================
// AUTH
// ============================================================

// ============================== SIGN UP
export async function createUserAccount(user: INewUser) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(user.name);

    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      username: user.username,
      imageUrl: avatarUrl,
    });

    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
}

// ============================== SAVE USER TO DB
export async function saveUserToDB(user: {
  accountId: string;
  email: string;
  name: string;
  imageUrl: URL;
  username?: string;
}) {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseid,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user
    );

    return newUser;
  } catch (error) {
    console.log(error);
  }
}

export async function signInAccount(user: { email: string; password: string }) {
  try {
    const session = await account.createEmailSession(user.email, user.password);
    return session;
  } catch (error) {
    console.log(error);
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) {
      throw Error;
    }
    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseid,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    //   let promise = databases.listDocuments(
    //     "[659e8c8a2c039dce0c30]",
    //     "[659f77a70d87d5bb4c78]",
    //     [Query.equal("title", "Hamlet")]
    //   );

    //   if (!promise) {
    //     throw Error;
    //   }

    //   console.log(promise);
    //   // changed

    if (!currentUser) throw Error;

    return currentUser.documents[0];

    //   return (promise = JSON.parse(JSON.stringify(promise)));
  } catch (error) {
    console.log(error);
  }
}
