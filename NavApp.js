
    function initMap() {
        map = L.map('map').setView([32.808092, -83.732058], 15); // Default to Macon
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        // Load Macon Campus by default
        showCampus(2);
    }

    // Show all campuses
    function showAllCampuses() {
        clearMarkers();
        let html = "";
        campuses.forEach(campus => {
            const marker = L.marker([campus.lat, campus.lng])
                .addTo(map)
                .bindPopup(`<b>${campus.name}</b><br>${campus.address}`)
                .on('click', () => showCampus(campus.id));
            markers.push(marker);

            html += `
                <div class="campus" onclick="showCampus(${campus.id})">
                    <h3>${campus.name}</h3>
                    <p>${campus.address}</p>
                </div>
            `;
        });
        document.getElementById('results').innerHTML = html;
        map.fitBounds(markers.map(m => m.getLatLng()));
    }

    // Show a campus with its buildings
    function showCampus(campusId) {
        clearMarkers();
        const campus = campuses.find(c => c.id === campusId);
        if (!campus) return;

        // Campus marker
        const campusMarker = L.marker([campus.lat, campus.lng])
            .addTo(map)
            .bindPopup(`<b>${campus.name}</b><br>${campus.address}`);
        markers.push(campusMarker);

        // Building markers
        campus.buildings.forEach(building => {
            const marker = L.marker([building.lat, building.lng], {
                icon: L.divIcon({
                    className: 'building-icon',
                    html: '🏛️',
                    iconSize: [30, 30]
                })
            })
            .addTo(map)
            .bindPopup(`<b>${building.name}</b><br>${building.desc}`);
            markers.push(marker);
        });

        map.setView([campus.lat, campus.lng], 15);

        // Update info panel
        let html = `
            <button onclick="showAllCampuses()">← All Campuses</button>
            <h2>${campus.name}</h2>
            <p>${campus.address}</p>
            <h3>Buildings</h3>
            <div class="buildings-list">
        `;
        campus.buildings.forEach(building => {
            html += `
                <div class="building" onclick="zoomToBuilding(${building.lat}, ${building.lng})">
                    <h4>${building.name}</h4>
                    <p>${building.desc}</p>
                </div>
            `;
        });
        html += `</div>`;
        document.getElementById('results').innerHTML = html;
    }

    // Helper functions
    function clearMarkers() {
        markers.forEach(marker => map.removeLayer(marker));
        markers = [];
    }

    function zoomToBuilding(lat, lng) {
        map.setView([lat, lng], 18);
    }
