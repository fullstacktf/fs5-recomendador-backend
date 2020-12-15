import { Media } from "./models";
import { MediaRepository } from "./repository";

export class MediaService {
    private repository: MediaRepository;

    constructor(mediaRepository: MediaRepository) {
        this.repository = mediaRepository;
    };

    async getAllMedia() {
        try {
            const allMedia = await this.repository.findInCollection();

            return {nResults: allMedia.length, results: allMedia};
        } catch (error) {
            return {message: "Error retrieving all media"};
        };    
    };

    async getMediaByID(id: string) {
        try {
            const numberID = Number(id);
            const mediaResult = await this.repository.findOne({id: numberID});
            
            return mediaResult;
        } catch (error) {
            return {message: "Error retrieving media"};
        };
    };

    async newMedia(media: Media) {
        try {
            const savedMedia = await this.repository.save(media);
            return {message: "Media added!"};
        } catch (error) {
            return {message: "Error adding media"};
        };     
    };

    async deleteMedia(id: string) {
        try {
            const numberID = Number(id);
            const deletedMedia = await this.repository.deleteOne({id: numberID})
            return {message: "Media deleted"};
        } catch (error) {
            return {message: "Error deleting media"};
        };
    };

    async updateMedia(media: Media) {
        try {
            const newMedia = media;
            const idMedia = newMedia.id;
            const mediaUpdated = await this.repository.updateOne({id: idMedia}, newMedia);
            return {message: "Media updated"};
        } catch (error) {
            return {message: "Error updating media"};
        };        
    };

    async getMediaByIDTag(id: string) {
        try {
            const tagID = Number(id);
            const mediaTaggedByIDtag = await this.repository.find({ "tags.id": tagID });
            return {nResults: mediaTaggedByIDtag.length, results: mediaTaggedByIDtag};
        } catch (error) {
            return {message: "Error retrieving media by ID tag"};
        };
    };

    /*async greaterOrEqualRating(value: string) {
        const newValue = Number(value);
        return this.repository.findGreaterOrEqualRating({rating: { $gte: newValue }});
    }*/
};
