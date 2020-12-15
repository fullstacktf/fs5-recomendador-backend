import { User } from "./models";
import { UserRepository } from "./repository";

export class UserService {
    private repository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.repository = userRepository;
    };

    async getAllUsers() {
        try {
            const allUsers = await this.repository.findInCollection();

            return {nResults: allUsers.length, results: allUsers};
        } catch (error) {
            return {message: "Error retrieving all users"};
        };    
    };

    async getUserByID(id: string) {
        try {
            const numberID = Number(id);
            const userResult = await this.repository.findOne({id: numberID});
            
            return userResult;
        } catch (error) {
            return {message: "Error retrieving user"};
        };
    };

    async updateUser(user: User) {
        const newUser = user;
        const idUser = newUser.id;

        return this.repository.updateOne({id: idUser}, newUser);
    };

    async deleteUser(id: string) {
        const numberID = Number(id);
        return this.repository.deleteOne({id: numberID})
    };

    async newUser(user: User) {
        try {
            const savedUser = await this.repository.save(user);
            return {message: "User added!"};
        } catch (error) {
            return {message: "Error adding user"};
        };     
    };
};
