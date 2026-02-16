const config = {
    appWriteURL: String(import.meta.env.VITE_APPWRITE_URL),
    projectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    tableId : String(import.meta.env.VITE_TABLE_ID),
    databaseId: String(import.meta.env.VITE_DATABASE_ID),
    bucketId: String(import.meta.env.VITE_BUCKET_ID)
}

export default config