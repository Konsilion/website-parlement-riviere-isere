---
hide:
  - toc
---

# Suivi Physicochimique – Isère et affluents

Ce tableau présente les dernières mesures physico-chimique sur les principaux cours d'eau de l'Isère (Isère, Drac, Romanche, L'eau d'Olle).

<div id="stations-pc"></div>

<script>
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

// Récupère les stations physicochimique pour un cours d’eau donné
async function getStationsByRiver(riverName) {
    const url = `https://hubeau.eaufrance.fr/api/v2/qualite_rivieres/station_pc?libelle_cours_eau=${encodeURIComponent(riverName)}&size=100`;
    return await fetchData(url);
}




    
// Affiche les données dans un tableau HTML
function renderTable(stations) {
    if (!stations || stations.length === 0) {
        document.getElementById("stations-pc").innerHTML = "<p>Aucune station trouvée.</p>";
        return;
    }

    let tableHTML = `
        <table border="1">
            <tr style="background-color: #0b4387; color: white;">
                <th>Cours d’eau</th>
                <th>Libellé de la station</th>
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
    document.getElementById("stations-pc").innerHTML = tableHTML;
}

// Fonction principale
async function init() {
    let allStations = [];

    for (const coursEau of coursEauList) {
        const stations = await getStationsByRiver(coursEau);

        // Pour chaque station, récupérer le débit et ajouter le nom du cours d’eau
        const stationsAvecDebit = await Promise.all(
            stations.map(async (station) => {
                // const debit = await getDebitStation(station.code_station);
                return {
                    ...station,
                    cours_eau: coursEau
                };
            })
        );

        allStations.push(...stationsAvecDebit);
    }

    renderTable(allStations);
}

// Liste des cours d'eau à interroger
const coursEauList = ["Isère", "Drac", "Romanche", "L'eau d'Olle"];

// Lancer au chargement
init();
    
</script>
