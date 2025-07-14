---
hide:
  - toc
---

# Suivi des débits – Isère et affluents

Ce tableau présente les dernières mesures de débit sur les principaux cours d'eau de l'Isère (Isère, Drac, Romanche, L'eau d'Olle).

<div id="stations-debits"></div>

<script>
// Liste des cours d'eau à interroger
const coursEauList = ["Isère", "Drac", "Romanche", "L'eau d'Olle"];

// Fonction générique pour appeler l'API
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Erreur HTTP ${response.status}`);
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        return [];
    }
}

// Récupère les stations pour un cours d’eau donné
async function getStationsByRiver(riverName) {
    const url = `https://hubeau.eaufrance.fr/api/v2/hydrometrie/referentiel/stations?libelle_cours_eau=${encodeURIComponent(riverName)}&size=100`;
    return await fetchData(url);
}

// Récupère le débit (observation la plus récente) d'une station
async function getDebitStation(codeStation) {
    const url = `https://hubeau.eaufrance.fr/api/v2/hydrometrie/observations_tr?code_entite=${codeStation}&grandeur_hydro=Q&size=1`;
    const data = await fetchData(url);
    if (data && data.length > 0) {
        return data[0].resultat_obs / 1000; // L'unité est L/s → conversion en m³/s
    }
    return null;
}

// Affiche les données dans un tableau HTML
function renderTable(stations) {
    if (!stations || stations.length === 0) {
        document.getElementById("stations-debits").innerHTML = "<p>Aucune station trouvée.</p>";
        return;
    }

    let tableHTML = `
        <table border="1">
            <tr style="background-color: #0b4387; color: white;">
                <th>Cours d’eau</th>
                <th>Libellé de la station</th>
                <th>Débit (m³/s)</th>
                <th>Fiche station</th>
            </tr>
    `;

    for (const station of stations) {
        const debit = station.debit !== null ? station.debit.toFixed(2) : "<i>Non disponible</i>";
        const url = `https://www.hydro.eaufrance.fr/stationhydro/${station.code_station}/fiche`;
        tableHTML += `
            <tr>
                <td>${station.cours_eau}</td>
                <td>${station.libelle_station}</td>
                <td>${debit}</td>
                <td><a href="${url}" target="_blank">${station.code_station}</a></td>
            </tr>
        `;
    }

    tableHTML += `</table>`;
    document.getElementById("stations-debits").innerHTML = tableHTML;
}

// Fonction principale
async function init() {
    let allStations = [];

    for (const coursEau of coursEauList) {
        const stations = await getStationsByRiver(coursEau);

        // Pour chaque station, récupérer le débit et ajouter le nom du cours d’eau
        const stationsAvecDebit = await Promise.all(
            stations.map(async (station) => {
                const debit = await getDebitStation(station.code_station);
                return {
                    ...station,
                    debit,
                    cours_eau: coursEau
                };
            })
        );

        allStations.push(...stationsAvecDebit);
    }

    renderTable(allStations);
}

// Lancer au chargement
init();
</script>
