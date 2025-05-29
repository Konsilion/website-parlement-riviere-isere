# Suivi des débits de l'Isère

Voici un outil pour trouver les stations de mesure de débit les plus proches de vous sur l'Isère.

<input type="text" id="codePostal" placeholder="Entrez un code postal">
<button onclick="afficherStationsProches()">Afficher les stations proches</button>
<p id="stations-proches">Les stations proches s'afficheront ici.</p>

<script>
// Fonction pour récupérer les stations sur l'Isère
async function getStations() {
    const url = 'https://hubeau.eaufrance.fr/api/v2/hydrometrie/referentiel/stations?code_entite=W&libelle_cours_eau=Isère&size=100';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des stations :', error);
        return [];
    }
}

// Fonction pour calculer la distance en km entre deux points géographiques
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Rayon de la Terre en km
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// Convertir les degrés en radians
function toRadians(degrees) {
    return degrees * Math.PI / 180;
}

// Fonction pour récupérer le débit d'une station
async function getDebitStation(codeStation) {
    const url = `https://hubeau.eaufrance.fr/api/v2/hydrometrie/observations_tr?code_entite=${codeStation}&grandeur_hydro=Q&size=1`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.data && data.data.length > 0) {
            return data.data[0].resultat_obs / 1000; // Conversion en m³/s
        }
        return 'N/A';
    } catch (error) {
        console.error('Erreur lors de la récupération du débit :', error);
        return 'N/A';
    }
}

// Fonction pour obtenir les coordonnées à partir d'un code postal
async function getCoordinatesFromPostalCode(postalCode) {
    const url = `https://nominatim.openstreetmap.org/search?postalcode=${postalCode}&country=France&format=json`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data && data.length > 0) {
            return {
                latitude: parseFloat(data[0].lat),
                longitude: parseFloat(data[0].lon)
            };
        }
        return null;
    } catch (error) {
        console.error('Erreur lors de la récupération des coordonnées :', error);
        return null;
    }
}

// Fonction principale pour afficher les stations proches
async function afficherStationsProches() {
    const codePostal = document.getElementById('codePostal').value;
    if (!codePostal) {
        alert('Veuillez entrer un code postal.');
        return;
    }

    const coordinates = await getCoordinatesFromPostalCode(codePostal);
    if (!coordinates) {
        alert('Impossible de trouver les coordonnées pour ce code postal.');
        return;
    }

    // Afficher les coordonnées du code postal
    const stationsProchesElement = document.getElementById('stations-proches');
    stationsProchesElement.innerHTML = `<p>Coordonnées pour le code postal ${codePostal} : Latitude ${coordinates.latitude}, Longitude ${coordinates.longitude}</p>`;

    const stations = await getStations();

    // Afficher les résultats intermédiaires des stations
    stationsProchesElement.innerHTML += '<h3>Résultats intermédiaires des stations :</h3>';
    for (const station of stations) {
        if (station.latitude && station.longitude) {
            const distance = calculateDistance(
                coordinates.latitude,
                coordinates.longitude,
                parseFloat(station.latitude),
                parseFloat(station.longitude)
            );
            const debit = await getDebitStation(station.code_station);
            stationsProchesElement.innerHTML += `<p>${station.libelle_station} : Latitude ${station.latitude}, Longitude ${station.longitude}, Distance: ${distance.toFixed(2)} km, Débit: ${debit} m³/s</p>`;
        }
    }
}
</script>
