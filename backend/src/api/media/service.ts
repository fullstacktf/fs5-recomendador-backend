import { Media, RatingListItem } from "./models";
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

    async getMediaByIDTag(tags: string[]) {
        try {
            let allMedia = [];

            for (let t = 0; t < tags.length; t++) {
                const tagID = Number(tags[t]);
                const mediaTaggedByIDtag: Media[] = await this.repository.find({ "tags.id": tagID });

                for (let m = 0; m < mediaTaggedByIDtag.length; m++) {
                    allMedia.push(mediaTaggedByIDtag[m]);
                };
            };

            const seen = new Set();

            const filteredArr = allMedia.filter(el => {
                const duplicate = seen.has(el.id);
                seen.add(el.id);
                return !duplicate;
            });

            filteredArr.sort((a, b) => b.rating - a.rating);

            return {nResults: filteredArr.length, results: filteredArr};
        } catch (error) {
            return {message: "Error retrieving media by ID tag"};
        };
    };

    calculateRating(ratings: RatingListItem[]) {
        let array = [];

        for (const r in ratings) {
            array.push(ratings[r].rating);
        };

        return array.reduce((a, b) => a + b) / array.length;
    };

    async rateMedia(id: string, u: string, r: string) {
        try {
            const idMedia = Number(id);
            const idUser = Number(u);        
            const rating = Number(r);

            // Delete previous user rating
            await this.repository.update({id: idMedia}, {$pull: {ratings: {id: idUser}}});

            // Add new user rating
            await this.repository.update({id: idMedia}, {$push: {ratings: {id: idUser, rating: rating}}});

            // Update media rating because of new rate
            const media = await this.repository.findOne({id: idMedia});

            if (media) {
                const newRating = this.calculateRating(media.ratings);

                await this.repository.update({id: idMedia}, {$set: {rating: newRating}});

                return {message: "Media rated"};
            } else {
                return {message: "Error retrieving media when rating"};
            };
        } catch (error) {
            return {message: "Error rating media"};
        };
    };

    /*async greaterOrEqualRating(value: string) {
        const newValue = Number(value);
        return this.repository.findGreaterOrEqualRating({rating: { $gte: newValue }});
    }*/
};
