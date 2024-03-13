import { MongoClient } from 'mongodb';

class DBClient {
    constructor() {
        this.host = process.env.DB_HOST || 'localhost';
        this.port = process.env.DB_PORT || 27017;
        this.database = process.env.DB_DATABASE || 'files_manager';
        this.client = new MongoClient(`mongodb://${this.host}:${this.port}`, { useNewUrlParser: true, useUnifiedTopology: true });
        this.client.connect((error) => {
            if (error) {
                console.error(`DB connection error: ${error}`);
            } else {
                console.log('DB connected successfully');
            }
        });
    }

    isAlive() {
        return !!this.client && this.client.isConnected();
    }

    async nbUsers() {
        const usersCollection = this.client.db(this.database).collection('users');
        return usersCollection.countDocuments();
    }

    async nbFiles() {
        const filesCollection = this.client.db(this.database).collection('files');
        return filesCollection.countDocuments();
    }
}

const dbClient = new DBClient();

export default dbClient;

