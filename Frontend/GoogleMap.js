export class GoogleMap {
    showMap(jobs) {
        const map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 0, lng: 0 },
            zoom: 2
        });
        jobs.forEach(job => {
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode({ address: `${job.city}, ${job.country}` }, (results, status) => {
                if (status === google.maps.GeocoderStatus.OK) {
                    const marker = new google.maps.Marker({
                        map: map,
                        position: results[0].geometry.location,
                        title: job.title,
                    });
                    const jobDetails = document.getElementById(job.index);
                    this.markerEventListener(marker, jobDetails);

                }
            });
        });
    }
    markerEventListener(marker, jobDetails) {
        marker.addListener('click', () => {
            jobDetails.scrollIntoView({ behavior: 'smooth', passive: true });
            jobDetails.style.backgroundColor = '#545B77';
            jobDetails.style.color = '#fff';
            setTimeout(() => {
                jobDetails.style.backgroundColor = '#fff';
                jobDetails.style.color = '#000';
            }, 3000);

        }, { passive: true });
    }
    resetMapEventListener(jobs) {
        const resetMap = document.getElementById('reset-map');
        resetMap.addEventListener('click', () => {
            this.showMap(jobs);
            const mapDiv = document.getElementById('map');
            mapDiv.scrollIntoView({ behavior: 'smooth', passive: true });
        }, { passive: true });
    }
}