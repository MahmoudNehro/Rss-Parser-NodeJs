import { Job } from './Job.js';
import { GoogleMap } from './GoogleMap.js';
export class App {
    async start(baseUrl) {
        const loader = document.getElementById('loader');
        loader.classList.remove('d-none');
        let job = new Job(baseUrl);
        let googleMap = new GoogleMap();
        await job.fetchJobs().then(data => {
            job.displayJobs();
            googleMap.showMap(data);
            googleMap.resetMapEventListener(data);
            job.jobListEventListener();
        });
    }
}