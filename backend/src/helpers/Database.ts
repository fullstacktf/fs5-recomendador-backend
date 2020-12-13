import { Db, MongoClient, ObjectId } from 'mongodb';

export interface BaseModel {
    _id: ObjectId;
    name: string;
};

export class Database {
    private db: Db | undefined;
    
    load() {
        console.log('Reading from database');
      
        return new Promise((resolve, reject) => {
            MongoClient.connect('mongodb://db:27017/urecommendme', { useUnifiedTopology: true }, (error, client) => {
                if (error) {
                    reject('Error database connection');
                } else {
                    this.db = client.db('urecommendme');
                    resolve('Database connected');
                }
            });
        });
    };
    
    collection<T>(collectionName: string) {
        return this.db!.collection<T>(collectionName);
    };
};