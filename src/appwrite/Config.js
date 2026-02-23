import config from "../config/config";
import { Client, ID, Databases, Query, Storage } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        // SETUP: Initialize the connection to Appwrite
        this.client
            .setEndpoint(config.appWriteURL) // Connects to your specific Appwrite server
            .setProject(config.projectId);   // Selects the specific project

        // Initialize the Database and Storage helpers
        // We do this in the constructor so they are ready to use immediately
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    /**
     * FUNCTION: createPost
     * PURPOSE: Creates a new document (blog post) in the database.
     * WHY: We accept a 'slug' to use as the unique ID. This allows for clean, 
     * readable URLs (e.g., website.com/post/my-first-post) instead of random IDs.
     */
    async createPost({ title, slug, content, status, featuredImage, userId }) {
        try {
            // NOTE: You likely want to 'return' this result so the UI knows it finished!
            return await this.databases.createDocument(
                config.databaseId,  // Which Database?
                config.tableId,     // Which Collection/Table?
                slug,               // Document ID: We use the 'slug' here explicitly!
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("Appwrite service::createPost::error", error)
        }
    }

    /**
     * FUNCTION: updatePost
     * PURPOSE: Modifies an existing document.
     * WHY: We need the 'slug' to identify WHICH document to update. 
     * The 2nd argument is the object containing only the fields we want to change.
     */
    async updatePost(slug, { title, content, status, featuredImage }) {
        try {
            return await this.databases.updateDocument(
                config.databaseId,
                config.tableId,
                slug, // The ID of the document to update
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite service::updatePost::error", error)
        }
    }

    /**
     * FUNCTION: deletePost
     * PURPOSE: Permanently removes a document.
     * WHY: Returns 'true' on success and 'false' on failure so the frontend 
     * can update the UI (e.g., remove the post from the list) accordingly.
     */
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                config.databaseId,
                config.tableId,
                slug // The ID of the document to delete
            )
            return true
        } catch (error) {
            console.log("Appwrite service::deletePost::error", error)
            return false
        }
    }

    /**
     * FUNCTION: getPost
     * PURPOSE: Fetches a single document by its ID (slug).
     * WHY: Used when a user clicks on a specific article to read it.
     */
    async getPost(slug) {
        try {
            // NOTE: Added 'return' here. Without it, the function returns undefined!
            return await this.databases.getDocument(
                config.databaseId,
                config.tableId,
                slug
            )
        } catch (error) {
            console.log("Appwrite service::getPost::error", error)
            return false;
        }
    }

    /**
     * FUNCTION: getPosts
     * PURPOSE: Fetches a list of documents based on a query.
     * WHY: It defaults to [Query.equal("status", "active")] so that, by default, 
     * users only see published posts, not drafts.
     */
    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                config.databaseId,
                config.tableId,
                queries // Passes the filters (e.g., status=active, limit=10, etc.)
            )
        } catch (error) {
            console.log("Appwrite service::getPosts::error", error)
            return false;
        }
    }

    // --- FILE UPLOAD SERVICES ---

    /**
     * FUNCTION: uploadFile
     * PURPOSE: Uploads an actual file (image/pdf) to Appwrite Storage bucket.
     * WHY: Returns the file metadata (like ID) which is needed to link the image 
     * to a blog post later.
     */
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                config.bucketId,
                ID.unique(), // Generates a unique ID for the file name
                file
            )
        } catch (error) {
            console.log("Appwrite service::uploadFile::error", error)
            return false
        }
    }

    /**
     * FUNCTION: deleteFile
     * PURPOSE: Removes a file from the storage bucket.
     * WHY: Used when a user deletes a post or replaces an image to save space.
     */
    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                config.bucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite service::deleteFile::error", error)
            return false
        }
    }

    /**
     * FUNCTION: getFilePreview
     * PURPOSE: Generates a URL to display the image.
     * WHY: This method is synchronous (no 'await') because it doesn't make a 
     * network request; it just constructs a valid URL string for the <img> tag.
     */
    getFileView(fileId){
        return this.bucket.getFileView(
            config.bucketId,
            fileId
        )
    }
}

const service = new Service();
export default service;