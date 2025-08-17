/* ======= Data ======= */
const campuses = [
  {
    id: 1,
    name: "Cochran Campus",
    address: "1100 Second Street SE, Cochran, GA 31014",
    lat: 32.379845, lng: -83.342543,
    buildings: [
      { name: "Russell Auditorium", lat: 32.38039, lng: -83.346899, desc: "Performance venue" },
      { name: "Student Rec Center", lat: 32.381122, lng: -83.341309, desc: "Fitness facilities" },
      { name: "Roberts Library", lat: 32.381032, lng: -83.347188, desc: "Main library" },
      { name: "Dillard Hall", lat: 32.381087, lng: -83.345772, desc: "Science labs and classrooms" },
      { name: "Grace Hall", lat: 32.381222, lng: -83.34427, desc: "Residence hall" },
      { name: "Harris Hall", lat: 32.379765, lng: -83.347371, desc: "Residence hall" },
      { name: "Talmadge Hall", lat: 32.379303, lng: -83.34677, desc: "Residence hall" },
      { name: "Peacock Office Building", lat: 32.379693, lng: -83.346072, desc: "Administrative offices" },
      { name: "Wiggs Office Building", lat: 32.380362, lng: -83.345279, desc: "Faculty offices" },
      { name: "Walker Hall", lat: 32.380037, lng: -83.345622, desc: "Classrooms and auditorium" },
      { name: "Ebenezer Hall", lat: 32.380498, lng: -83.344785, desc: "Residence hall" },
      { name: "Morris Gymnasium", lat: 32.379883, lng: -83.344452, desc: "Athletic and fitness facility" },
      { name: "Georgia Hall", lat: 32.380046, lng: -83.343616, desc: "Dining hall" },
      { name: "Alderman Hall", lat: 32.37924, lng: -83.345397, desc: "Classrooms" },
      { name: "Whipple Hall", lat: 32.380797, lng: -83.34192, desc: "Academic building" },
      { name: "Athletic Training Facility", lat: 32.380598, lng: -83.340901, desc: "Sports medicine and training" },
      { name: "Anderson Dormitory", lat: 32.382055, lng: -83.344098, desc: "Residence hall" },
      { name: "Haynes Dormitory", lat: 32.381422, lng: -83.34354, desc: "Residence hall" },
      { name: "Gateway Dormitory", lat: 32.382155, lng: -83.34265, desc: "Residence hall" },
      { name: "Regents Dormitory", lat: 32.381756, lng: -83.340644, desc: "Residence hall" },
      { name: "Sanford Hall", lat: 32.380656, lng: -83.346346, desc: "Career services" },
      { name: "Browning Dormitory", lat: 32.379438, lng: -83.34619, desc: "Residence hall" },
      { name: "Jackson Office Building", lat: 32.380475, lng: -83.34501, desc: "HR, IT, business" },
      { name: "Knights Dormitory", lat: 32.381538, lng: -83.342607, desc: "Residence hall" },
      { name: "Chiller Plant", lat: 32.379521, lng: -83.344935, desc: "Utility building" },
      { name: "Memorial Hall", lat: 32.380955, lng: -83.346255, desc: "Math classrooms" }
    ]
  },
  {
    id: 2,
    name: "Macon Campus",
    address: "100 University Parkway, Macon, GA 31206",
    lat: 32.808092, lng: -83.732058,
    buildings: [
      { name: "Administration (ADMIN)", lat: 32.808127, lng: -83.732117, desc: "Student Services" },
      { name: "Library (LIB)", lat: 32.808469, lng: -83.732992, desc: "Administration" },
      { name: "Plant Services", lat: 32.806992, lng: -83.733609, desc: "Facilities" },
      { name: "Campus Support Services (CSS)", lat: 32.808145, lng: -83.733839, desc: "Campus Support Services" },
      { name: "Mathematics (MATH)", lat: 32.808739, lng: -83.733855, desc: "Math" },
      { name: "Math Auditorium (AUD)", lat: 32.808717, lng: -83.73414, desc: "Math" },
      { name: "Charles H. Jones Building (Jones)", lat: 32.808732, lng: -83.735159, desc: "" },
      { name: "Professional Sciences Center (PSC)", lat: 32.809573, lng: -83.734059, desc: "" },
      { name: "Teacher Education Building (TEB)", lat: 32.809852, lng: -83.732879, desc: "" },
      { name: "Student Life Center (SLC)", lat: 32.810712, lng: -83.732085, desc: "Student Life" },
      { name: "Music (MUS)", lat: 32.811622, lng: -83.731222, desc: "Music" },
      { name: "Arts Complex (ART)", lat: 32.809319, lng: -83.731806, desc: "Art" },
      { name: "School of Arts & Letters (SOAL)", lat: 32.80894, lng: -83.732091, desc: "" },
      { name: "Recreation & Wellness Center (REC)", lat: 32.811571, lng: -83.733979, desc: "Recreation" },
      { name: "Lakeview Pointe (LP)", lat: 32.812787, lng: -83.733544, desc: "Residence hall" },
      { name: "University Pointe (UP)", lat: 32.810116, lng: -83.736763, desc: "Residence hall" },
      { name: "Peyton T. Anderson Enrollment Center (PAC)", lat: 32.809854, lng: -83.729129, desc: "Enrollment" }
    ]
  },
  {
    id: 3,
    name: "Dublin Campus",
    address: "800 Veterans Blvd, Dublin, GA 31021",
    lat: 32.532837, lng: -82.935989,
    buildings: [
      { name: "Academic Building", lat: 32.532765, lng: -82.935265, desc: "Classrooms" },
      { name: "Student Services", lat: 32.53282, lng: -82.936, desc: "Admissions" }
    ]
  }
];

/* ======= Map & UI ======= */
let map;
let markers = [];
let currentCampusId = 2;

function clearMarkers() {
  markers.forEach(m => map.removeLayer(m));
  markers = [];
}

function initMap() {
  // Disable scroll-wheel zoom (use +/– buttons or pinch)
  map = L.map("map", { scrollWheelZoom: true }).setView([32.808092, -83.732058], 15);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(map);

  showCampus(2);

  window.addEventListener("resize", () => map.invalidateSize(false));

  document.getElementById("search-btn").addEventListener("click", search);
  document.getElementById("search").addEventListener("keydown", (e) => {
    if (e.key === "Enter") search();
  });
}

function showAllCampuses() {
  clearMarkers();
  let html = "";
  campuses.forEach(c => {
    const marker = L.marker([c.lat, c.lng])
      .addTo(map)
      .bindPopup(`<b>${c.name}</b><br>${c.address}`)
      .on("click", () => showCampus(c.id));
    markers.push(marker);

    html += `
      <div class="campus" onclick="showCampus(${c.id})">
        <h3>${c.name}</h3>
        <p class="muted">${c.address}</p>
      </div>`;
  });
  document.getElementById("results").innerHTML = html;
  map.fitBounds(markers.map(m => m.getLatLng()));
}

function showCampus(campusId) {
  currentCampusId = campusId;
  clearMarkers();
  const campus = campuses.find(c => c.id === campusId);
  if (!campus) return;

  const campusMarker = L.marker([campus.lat, campus.lng])
    .addTo(map)
    .bindPopup(`<b>${campus.name}</b><br>${campus.address}`);
  markers.push(campusMarker);

  campus.buildings.forEach(b => {
    const marker = L.marker([b.lat, b.lng], {
      icon: L.divIcon({ className: "building-icon", html: "🏛️", iconSize: [30, 30] })
    })
      .addTo(map)
      .bindPopup(`<b>${b.name}</b><br>${b.desc || ""}`);
    markers.push(marker);
  });

  map.setView([campus.lat, campus.lng], 15);

  let html = `
    <button class="back-btn" onclick="showAllCampuses()">← All Campuses</button>
    <h2 class="panel-title">${campus.name}</h2>
    <p class="muted">${campus.address}</p>
    <h3>Buildings</h3>
    <div class="buildings-list">`;

  campus.buildings.forEach(b => {
    html += `
      <div class="building" onclick="zoomToBuilding(${b.lat}, ${b.lng})">
        <h4>${b.name}</h4>
        <p class="muted">${b.desc || ""}</p>
      </div>`;
  });

  html += `</div>`;
  document.getElementById("results").innerHTML = html;
}

function zoomToBuilding(lat, lng) {
  map.setView([lat, lng], 18);
}

function search() {
  const q = (document.getElementById("search").value || "").trim().toLowerCase();
  if (!q) return showCampus(currentCampusId);

  const campusMatches = campuses.filter(c => c.name.toLowerCase().includes(q));
  const buildingMatches = [];
  campuses.forEach(c => c.buildings.forEach(b => {
    if (b.name.toLowerCase().includes(q)) buildingMatches.push({ campus: c, building: b });
  }));

  // Single building match → jump straight there
  if (campusMatches.length === 0 && buildingMatches.length === 1) {
    const { campus, building } = buildingMatches[0];
    showCampus(campus.id);
    return setTimeout(() => zoomToBuilding(building.lat, building.lng), 0);
  }

  clearMarkers();
  const bounds = [];
  let html = `<h3>Search Results</h3><div class="search-results">`;

  if (campusMatches.length) {
    html += `<h4>Campuses</h4>`;
    campusMatches.forEach(c => {
      bounds.push([c.lat, c.lng]);
      html += `
        <div class="result campus-result" onclick="showCampus(${c.id})">
          <strong>${c.name}</strong><br><span class="muted">${c.address}</span>
        </div>`;
    });
  }

  if (buildingMatches.length) {
    html += `<h4>Buildings</h4>`;
    buildingMatches.forEach(({ campus, building }) => {
      bounds.push([building.lat, building.lng]);
      const click = `showCampus(${campus.id}); setTimeout(()=>zoomToBuilding(${building.lat}, ${building.lng}), 0);`;
      html += `
        <div class="result building-result" onclick='${click}'>
          <strong>${building.name}</strong> <span class="muted">(${campus.name})</span><br>
          <span class="muted">${building.desc || ""}</span>
        </div>`;
      const m = L.marker([building.lat, building.lng], {
        icon: L.divIcon({ className: "building-icon", html: "🏛️", iconSize: [30, 30] })
      }).addTo(map);
      markers.push(m);
    });
  }

  if (!campusMatches.length && !buildingMatches.length) {
    html += `<p class="muted">No matches found.</p>`;
  }

  html += `</div>`;
  document.getElementById("results").innerHTML = html;
  if (bounds.length) map.fitBounds(bounds);
}

window.addEventListener("load", initMap);

