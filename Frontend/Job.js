export class Job {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.jobs = [];
    }

    async fetchJobs() {
        try {
            const response = await fetch(`${this.baseUrl}/jobs`);
            const data = await response.json();
            this.jobs = data.jobs;
        } catch (error) {
            const errorElement = document.getElementById('error');
            errorElement.classList.remove('d-none');
            const mapDiv = document.getElementById('map');
            mapDiv.classList.add('d-none');
            const resetMapBtn = document.getElementById('reset-map');
            resetMapBtn.classList.add('d-none');

        }
        return this.jobs;
    }

    displayJobs() {
        const jobsList = document.getElementById('jobs-list');
        const loader = document.getElementById('loader');
        this.jobs.forEach((job, index) => {
            const firstElement = jobsList.firstElementChild;
            const newElement = firstElement.cloneNode(true);
            newElement.querySelector('.job-title').textContent = `Job Title:  ${job.title}`;
            let viewOnMapButton = newElement.querySelector('.view-on-map');
            let locationText;
            let applyButton = newElement.querySelector('.apply');
            if (job.city || job.country) {
                locationText = `${job.city}, ${job.country}`;
            } else {
                locationText = 'No location provided';
            }
            viewOnMapButton.textContent = locationText;
            viewOnMapButton.id = index;
            applyButton.href = job.link;
            applyButton.target = '_blank';
            newElement.classList.remove('d-none');
            jobsList.appendChild(newElement);

        });
        loader.classList.add('d-none');

    }

    jobListEventListener() {
        const jobsList = document.getElementById('jobs-list');
        jobsList.addEventListener('click', event => {
            console.log(event.target);
            if (event.target.classList.contains("view-on-map")) {
                const jobId = event.target.id;
                let job;
                this.jobs.forEach(element => {
                    if (element.index == jobId) {
                        job = element;
                    }
                });
                const map = new google.maps.Map(document.getElementById('map'), {
                    center: { lat: 0, lng: 0 },
                    zoom: 2
                });
                const geocoder = new google.maps.Geocoder();
                geocoder.geocode({ address: `${job.city}, ${job.country}` }, (results, status) => {
                    console.log(results[0].geometry.location);
                    if (status === google.maps.GeocoderStatus.OK) {
                        map.setCenter(results[0].geometry.location);
                         new google.maps.Marker({
                            map: map,
                            position: results[0].geometry.location,
                            title: job.title,
                            label: {
                                text: job.title,
                                color: "black",
                                fontWeight: "bold",
                                className: "custom-label" // Add a custom CSS class

                            }
                        });
                        const mapDiv = document.getElementById('map');
                        mapDiv.scrollIntoView({ behavior: 'smooth' ,  passive: true });
                        map.setZoom(10);
                    }
                }, { passive: true });
            }
        }, { passive: true });
    }
}