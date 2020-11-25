import { Media } from "./models";
import { MediaRepository } from "./repository";

export class MediaService {
    private repository: MediaRepository;

    constructor(mediaRepository: MediaRepository) {
        this.repository = mediaRepository;
    };

    async getAllMedia() {
        return this.repository.findAll();        
    };

    async getMediaByID(id: string) {
        const numberID = Number(id);
        return this.repository.findOne({id: numberID});
    };

    async newMedia(media: Media) {
        return this.repository.save(media);
    };

    async deleteMedia(id: string) {
        const numberID = Number(id);
        return this.repository.deleteOne({id: numberID})
    };

    async updateMedia(media: Media) {
        const newMedia = media;
        const idMedia = newMedia.id;

        return this.repository.updateOne({id: idMedia}, newMedia);
    }

    /*async greaterOrEqualRating(value: string) {
        const newValue = Number(value);
        return this.repository.findGreaterOrEqualRating({rating: { $gte: newValue }});
    }*/
};
