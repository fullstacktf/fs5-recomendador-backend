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
        try {
            const newUser = user;
            const idUser = newUser.id;
            const muserUpdated = await this.repository.updateOne({id: idUser}, newUser);
            return {message: "User updated"};
        } catch (error) {
            return {message: "Error updating user"};
        };        
    };

    async deleteUser(id: string) {
        try {
            const numberID = Number(id);
            const deletedUser = await this.repository.deleteOne({id: numberID})
            return {message: "User deleted"};
        } catch (error) {
            return {message: "Error deleting user"};
        };
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
