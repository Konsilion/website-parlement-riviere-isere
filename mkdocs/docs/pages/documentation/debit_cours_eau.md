---
hide:
    - toc
---

# Suivi des débits de l'Isère

Voici un outil pour trouver les stations de mesure de débit les plus proches de vous sur l'Isère.

<input type="text" id="codePostal" placeholder="Entrez un code postal" style="border: 1px solid #CCC; text-align: center;">
<button class="md-button md-button--primary" onclick="afficherStationsProches()">Afficher les stations proches</button>
<div id="stations-proches"></div>

<script>
// Fonction pour récupérer les stations sur l'Isère
async function getStations() {
    const url = 'https://hubeau.eaufrance.fr/api/v2/hydrometrie/referentiel/stations?code_entite=W&libelle_cours_eau=Isère&size=100';
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
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
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        if (data.data && data.data.length > 0) {
            return data.data[0].resultat_obs / 1000; // Conversion en m³/s
        }
        return null;
    } catch (error) {
        console.error('Erreur lors de la récupération du débit :', error);
        return null;
    }
}

// Fonction pour obtenir les coordonnées à partir d'un code postal
async function getCoordinatesFromPostalCode(postalCode) {
    const url = `https://nominatim.openstreetmap.org/search?postalcode=${postalCode}&country=France&format=json`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
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

    const stationsProchesElement = document.getElementById('stations-proches');

    const stations = await getStations();

    if (stations.length === 0) {
        stationsProchesElement.innerHTML += '<p>Aucune station trouvée.</p>';
        return;
    }

    // Calculer les distances et les débits
    const stationsAvecDistances = await Promise.all(stations.map(async (station) => {
        if (station.latitude_station && station.longitude_station) {
            const distance = calculateDistance(
                coordinates.latitude,
                coordinates.longitude,
                parseFloat(station.latitude_station),
                parseFloat(station.longitude_station)
            );
            const debit = await getDebitStation(station.code_station);
            return { ...station, distance, debit };
        }
        return null;
    }));

    // Filtrer les stations sans coordonnées
    const stationsValides = stationsAvecDistances.filter(station => station !== null);

    if (stationsValides.length === 0) {
        stationsProchesElement.innerHTML += '<p>Aucune station valide trouvée.</p>';
        return;
    }

    // Trouver la station la plus proche
    const stationLaPlusProche = stationsValides.reduce((min, station) =>
        station.distance < min.distance ? station : min
    );

    // Afficher les stations dans un tableau
    let tableHTML = `
        <table border="1">
            <tr style="background-color: #0b4387; color: white;">
                <th>Libellé de la station</th>
                <th>Débit (m³/s)</th>
                <th>Lien vers fiche station</th>
            </tr>
    `;

    for (let station of stationsValides) {
        const isClosest = station.code_station === stationLaPlusProche.code_station;
        const style = isClosest ? 'style="font-weight: bold !important; color: blue;"' : '';
        const debit = station.debit !== null ? station.debit : '<i>Non disponible</i>';
        const url = `https://www.hydro.eaufrance.fr/stationhydro/${station.code_station}/fiche`;
        const lien = `<a href="${url}" target="_blank">${station.code_station}</a>`;
        tableHTML += `
            <tr ${style}>
                <td>${station.libelle_station}</td>
                <td>${debit}</td>
                <td>${lien}</td>
            </tr>
        `;
    }

    tableHTML += `</table>`;
    stationsProchesElement.innerHTML += tableHTML;

}
</script>
