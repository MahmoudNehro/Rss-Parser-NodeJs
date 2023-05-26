const App = require('./App.js');
const rssUrl = 'https://www.bayt.com/associates/rss/feed.xml?aff_id=0&country_list=all&jobrole_list=all';
const port = 3000;
let app = new App(rssUrl, port);
app.startServer();