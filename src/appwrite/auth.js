import config from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        // Configures the SDK with your server URL and Project ID from your config file
        this.client
            .setEndpoint(config.appWriteURL)
            .setProject(config.projectId);
        
        // Connects the 'Account' service to the configured client
        this.account = new Account(this.client);
    }

    /**
     * Registers a new user and chains a login if successful.
     */
    async createAccount({ email, password, name }){
        try{
            // ID.unique() lets Appwrite generate a random ID for the new user
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if(userAccount){
                // If account creation works, we automatically log them in
                return this.login({email, password})
            } else {
                return userAccount;
            }
        }
        catch(error){
            console.log("Appwrite service::createAccount::error", error)
        }
    }

    /**
     * Authenticates a user and creates a session cookie.
     */
    async login({email, password}){
        try {
            // Exchanges credentials for an active session (logs the user in)
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            console.log("Appwrite Service:: login::error", error)
        }
    }

    /**
     * Checks if a session exists and returns the user's data.
     */
    async getCurrentUser(){
        try {
            // Fetches the profile of the currently logged-in user
            return await this.account.get();
        } catch (error) {
            // Usually fails if the user is not logged in; we return null quietly
            console.log("Appwrite Service error:: getCurrentUserError:: error", error)
        }
        return null; 
    }

    /**
     * Destroys the user session.
     */
    async logout(){
        try {
            // deleteSessions (plural) logs the user out of ALL devices/browsers
            await this.account.deleteSessions()
        } catch (error) {
            console.log("Appwrite service:: logout::error", error)
        }
    }
}

// Exporting an instance (Object) so we don't have to call 'new' in every component
const authService = new AuthService();
export default authService;