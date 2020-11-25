import { Collection, FilterQuery, ObjectId, OptionalId } from 'mongodb';
import { BaseModel, Database } from '../../helpers/Database';

type Query<T> = FilterQuery<T | { _id: string }>;

export class BaseRepository<T extends BaseModel> {
    private readonly collectionName: string;
    protected readonly database: Database;
    
    constructor(database: Database, collectionName: string) {
        this.database = database;
        this.collectionName = collectionName;
    };

    private getCollection(): Collection<T> {
        return this.database.collection<T>(this.collectionName);
    };

    private toObjectIdFilter(id: string): FilterQuery<T> {
        return { _id: new ObjectId(id) as any };
    };

    save(model: OptionalId<T>) {
        this.getCollection().insertOne(model, (error, result) => {
            if (error) {
                console.error('error', error);
            } else {
                console.log('Result: ', result);
            };
        });
    };

    async deleteById(id: string) {
        return new Promise((resolve, reject) => {
            this.getCollection().deleteOne(this.toObjectIdFilter(id), (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                };
            });
        });
    };

    findAll(limit: number = 10): Promise<T[]> {
        return new Promise((resolve, reject) => {
            this.getCollection()
            .find()
            .limit(limit)
            .toArray()
            .then(element => resolve(element))
            .catch(err => reject(err));
        });
    };

    findOne(query: Query<T>): Promise<T | null> {
        return new Promise((resolve, reject) => {
            this.getCollection()
            .findOne(query)
            .then(result => resolve(result))
            .catch(err => reject(err));
        });
    };

    findById(id: string): Promise<T | null> {
        return new Promise((resolve, reject) => {
            this.getCollection()
            .findOne(this.toObjectIdFilter(id))
            .then(result => resolve(result))
            .catch(err => reject(err));
        });
    };
};
