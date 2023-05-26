const Rss = require('./Rss.js');
const http = require('http');
class App {
    constructor(rssUrl, port) {
        this.rss = new Rss(rssUrl);
        this.port = port;
    }

    startServer() {
        const server = http.createServer(async (request, response) => {
            try {
                const jobs = this.rss.jobs;
                if (jobs.length === 0) {
                    await this.rss.parseFeed();
                }
                response.setHeader('Content-Type', 'application/json');
                response.setHeader('Access-Control-Allow-Origin', '*');
                if (request.method === 'GET' && request.url === '/jobs') {
                    response.statusCode = 200;
                    response.end(JSON.stringify({
                        jobs: jobs,
                        error: null,
                    }));
                } else {
                    response.statusCode = 404;
                    response.end(JSON.stringify({
                        jobs: [],
                        error: 'Route not found'
                    }));
                }
            } catch (error) {
                response.statusCode = 500;
                response.end(JSON.stringify({
                    jobs: [],
                    error: 'Internal server error'
                }));
                console.log(error);
            }
        });
        server.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
}

module.exports = App;