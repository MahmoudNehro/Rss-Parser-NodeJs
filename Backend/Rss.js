const Parser = require('rss-parser');
class Rss {
    constructor(rssUrl) {
        this.parser = new Parser();
        this.arrayOfData = [];
        this.rssUrl = rssUrl;
    }
    async parseFeed() {
        let feed = await this.parser.parseURL(this.rssUrl);
        let contentSnippet;
        feed.items.forEach(item => {
            contentSnippet = item.contentSnippet;
            const jobObject = {
                index: feed.items.indexOf(item),
                title: item.title.trim(),
                link: item.link,
                city: '',
                country: '',
            };
            if (contentSnippet.split('Job Location:')[1]) {
                jobObject.city = contentSnippet.split('Job Location:')[1].split('Job Role:')[0].trim().split(',')[0].trim();
            }
            if (contentSnippet.split('Job Location:')[1]) {
                if (contentSnippet.split('Job Location:')[1].split('Job Role:')[0].trim().split('Company Industry:')[0].split(',')[1]) {
                    jobObject.country = contentSnippet.split('Job Location:')[1].split('Job Role:')[0].trim().split('Company Industry:')[0].split(',')[1].trim();
                }
            }
            this.arrayOfData.push(jobObject);
        });
    }
    get jobs() {
        return this.arrayOfData;
    }
}

module.exports = Rss;