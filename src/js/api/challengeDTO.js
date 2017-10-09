class ChallengeDTO {
    constructor(challenge) {
        this.challenge = challenge;
    }

    fromServer() {
        const dto = this.challenge;
        dto.id = this.challenge._id;
        return dto;
    }

    toServer() {
        const dto = {
            displayName: this.challenge.displayName,
            description: this.challenge.description,
            views: this.challenge.views,
            criteria: this.challenge.criteria,
            private: this.challenge.private,
            createdBy: this.challenge.createdBy
        };
        if (this.challenge._id) {
            dto._id = this.challenge._id;
        }
        return dto;
    }
}
export default ChallengeDTO;