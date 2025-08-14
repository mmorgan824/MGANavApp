
const buildings = [
    {
        id: 1,
        name: "Main Library",
        department: "University Library",
        floors: 5,
        description: "The main university library with study spaces and book collections.",
        lat: 40.7128,
        lng: -74.0060
    },
    {
        id: 2,
        name: "Science Building",
        department: "Science Faculty",
        floors: 4,
        description: "Home to physics, chemistry, and biology departments.",
        lat: 40.7135,
        lng: -74.0072
    },
    {
        id: 3,
        name: "Student Center",
        department: "Student Services",
        floors: 3,
        description: "Cafeteria, student lounge, and administrative offices.",
        lat: 40.7115,
        lng: -74.0055
    }
];

// Initialize the map
let map;
let markers = [];

function initMap() {
    // Set initial map view (replace with your campus coordinates)
    map = L.map('map').setView([40.7128, -74.0060], 16);
    
    // Add tile layer (you can use other map providers)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // Add markers for all buildings
    addBuildingMarkers();
}

function addBuildingMarkers() {
    // Clear existing markers
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];
    
    // Add new markers
    buildings.forEach(building => {
        const marker = L.marker([building.lat, building.lng])
            .addTo(map)
            .bindPopup(`<b>${building.name}</b><br>${building.department}`);
        
        markers.push(marker);
    });
}

function searchBuilding() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const results = buildings.filter(building => 
        building.name.toLowerCase().includes(searchTerm) ||
        building.department.toLowerCase().includes(searchTerm)
    );
    
    if (results.length > 0) {
        displayBuildingInfo(results[0]);
        highlightBuildingOnMap(results[0]);
    } else {
        document.getElementById('info-content').innerHTML = 
            `<p>No buildings found matching "${searchTerm}".</p>`;
    }
}

function displayBuildingInfo(building) {
    const infoDiv = document.getElementById('info-content');
    infoDiv.innerHTML = `
        <h3>${building.name}</h3>
        <p><strong>Department:</strong> ${building.department}</p>
        <p><strong>Floors:</strong> ${building.floors}</p>
        <p><strong>Description:</strong> ${building.description}</p>
    `;
}

function highlightBuildingOnMap(building) {
    // Center map on the building
    map.setView([building.lat, building.lng], 18);
    
    // Open the popup for this building
    const buildingMarker = markers.find(marker => 
        marker.getLatLng().lat === building.lat && 
        marker.getLatLng().lng === building.lng
    );
    
    if (buildingMarker) {
        buildingMarker.openPopup();
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initMap();
    
    // Set up event listeners
    document.getElementById('search-button').addEventListener('click', searchBuilding);
    document.getElementById('search-input').addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            searchBuilding();
        }
    });
});