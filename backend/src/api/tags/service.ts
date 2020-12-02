import { Tag } from "./models";
import { TagRepository } from "./repository";

export class TagService {
    private repository: TagRepository;

    constructor(tagRepository: TagRepository) {
        this.repository = tagRepository;
    };

    async getAllTags() {
        return this.repository.findInCollection();        
    };

    async newTag(tag: Tag) {
        return this.repository.save(tag);
    };

    async getTagByID(id: string) {
        const numberID = Number(id);
        return this.repository.findOne({id: numberID});
    };

    async deleteTag(id: string) {
        const numberID = Number(id);
        return this.repository.deleteOne({id: numberID})
    };
};
