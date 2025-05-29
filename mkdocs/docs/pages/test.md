---
hide: 
    -toc
    -navigation
---


<script>
  async function afficherDebit() {
    const codeStation = 'W141001001'; // Remplacez par le code de votre station
    const url = 'https://corsproxy.io/?https://hubeau.eaufrance.fr/api/v1/hydrometrie/observations_tr?code_station=W141001001&grandeur_hydro=Q&size=1';

    try {
      const response = await fetch(url);
      const data = await response.json();
      const observation = data.data[0];
      const debit = observation.resultat_obs;
      const date = observation.date_obs;

      document.getElementById('debit-isere').textContent = `Débit de l'Isère : ${debit} l/s (mesuré le ${new Date(date).toLocaleString()})`;
    } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
    }
  }

  document.addEventListener('DOMContentLoaded', afficherDebit);
</script>

<p id="debit-isere">Chargement du débit en cours...</p>


