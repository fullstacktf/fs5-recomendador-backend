import { Tag } from "./models";
import { TagRepository } from "./repository";

export class TagService {
    private repository: TagRepository;

    constructor(tagRepository: TagRepository) {
        this.repository = tagRepository;
    };

    async getAllTags() {
        try {
            const allTags = await this.repository.findInCollection();

            return {nResults: allTags.length, results: allTags};
        } catch (error) {
            return {message: "Error retrieving all tags"};
        };    
    };

    async newTag(tag: Tag) {
        try {
            const savedTag = await this.repository.save(tag);
            return {message: "Tag added!"};
        } catch (error) {
            return {message: "Error adding tag"};
        };
    };

    async getTagByID(id: string) {
        try {
            const numberID = Number(id);
            const tagResult = await this.repository.findOne({id: numberID});
            
            return tagResult;
        } catch (error) {
            return {message: "Error retrieving tag"};
        };
    };

    async deleteTag(id: string) {
        try {
            const numberID = Number(id);
            const deletedTag = await this.repository.deleteOne({id: numberID})
            return {message: "Tag deleted"};
        } catch (error) {
            return {message: "Error deleting tag"};
        };
    };
};
