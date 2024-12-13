class RandomEmailGenerator {
    constructor() {
        this.characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    }
    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    getRandomString(length) {
        let result = '';
        for (let i = 0; i < length; i++) {
            result += this.characters[this.getRandomInt(this.characters.length)];
        }
        return result;
    }

    generate() {
        const randomString = this.getRandomString(10);
        const domain = 'gmail.com';
        return `${randomString}@${domain}`;
    }
} export default RandomEmailGenerator;