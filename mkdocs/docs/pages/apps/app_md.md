<div id="stations-info"></div>

<script>
const lat = 45.191594;
const lon = 5.701610;
const coursEau = "Drac";

// Fonction générique d'appel API
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        return data.data;
    } catch (e) {
        console.error("Erreur API :", e);
        return [];
    }
}

// Haversine pour tri géographique rapide
function distance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const toRad = x => x * Math.PI / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat/2)**2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon/2)**2;
    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

// Récupération des stations et tri par proximité
async function getClosestStation(apiUrl, lat, lon, key) {
    const stations = await fetchData(apiUrl);
    if (!stations.length) return null;
    stations.forEach(s => s.distance = distance(lat, lon, s.latitude_station ?? s.latitude ?? s.latitude_site, s.longitude_station ?? s.longitude ?? s.longitude_site));
    stations.sort((a, b) => a.distance - b.distance);
    return stations[0];
}

// Main principal
async function init() {
    const debitApi = `https://hubeau.eaufrance.fr/api/v2/hydrometrie/referentiel/stations?libelle_cours_eau=${encodeURIComponent(coursEau)}&size=100`;
    const tempApi = `https://hubeau.eaufrance.fr/api/v2/temperature/referentiel/stations?libelle_cours_eau=${encodeURIComponent(coursEau)}&size=100`;
    const qualApi = `https://hubeau.eaufrance.fr/api/v2/qualite_rivieres/station_pc?nom_cours_eau=${encodeURIComponent(coursEau)}&size=100`;

    const [stationDebit, stationTemp, stationQual] = await Promise.all([
        getClosestStation(debitApi, lat, lon),
        getClosestStation(tempApi, lat, lon),
        getClosestStation(qualApi, lat, lon)
    ]);

    let html = `
    <table border="1">
      <tr style="background:#003366;color:white;"><th>Type</th><th>Station la plus proche (en amont)</th><th>Distance (km)</th></tr>
      <tr><td>Débit</td><td>${stationDebit?.code_station ?? 'Non trouvé'}</td><td>${stationDebit?.distance.toFixed(1) ?? '-'}</td></tr>
      <tr><td>Température</td><td>${stationTemp?.code_station ?? 'Non trouvé'}</td><td>${stationTemp?.distance.toFixed(1) ?? '-'}</td></tr>
      <tr><td>Qualité</td><td>${stationQual?.code_station ?? 'Non trouvé'}</td><td>${stationQual?.distance.toFixed(1) ?? '-'}</td></tr>
    </table>
    `;
    document.getElementById("stations-info").innerHTML = html;
}

init();
</script>
