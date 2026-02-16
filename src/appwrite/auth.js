import config from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        // Sets up the connection to your specific Appwrite server and project
        this.client
            .setEndpoint(config.appWriteURL)
            .setProject(config.projectId);
        
        // Initializes the Account SDK using the configured client
        this.account = new Account(this.client);
    }

    /**
     * Creates a new user and immediately logs them in if successful.
     */
    async createAccount({ email, password, name }){
        try{
            // ID.unique() generates a random unique string for the user ID
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if(userAccount){
                // Automatically log the user in after successful registration
                return this.login(email, password)
            } else {
                return userAccount;
            }
        }
        catch(error){
            console.log("Appwrite service::createAccount::error", error)
        }
    }

    /**
     * Authenticates a user using their email and password.
     */
    async login({email, password}){
        try {
            // Creates a new session for the user
           return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            console.log("Appwrite Service:: login::error", error)
        }
    }

    /**
     * Retrieves the currently logged-in user's data.
     * Returns null if no active session is found.
     */
    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite Service error:: getUserError:: error", error)
        }
        return null; // Ensures the app knows no user is logged in
    }

    /**
     * Logs the user out by deleting all active sessions.
     */
    async logout(){
        try {
            // deleteSessions (plural) clears the session from all devices
            await this.account.deleteSessions()
        } catch (error) {
            console.log("Appwrite service:: logout::error", error)
        }
    }
}

// Create an instance so we can use dot notation: authService.login()
const authService = new AuthService();

export default authService;