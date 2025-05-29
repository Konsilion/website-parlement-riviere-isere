# Titre de votre page

Voici le débit actuel de l'Isère :

<p id="debit-isere">Chargement du débit en cours...</p>

<script>
  async function afficherDebit() {
    const codeStation = 'W141001001'; // Code de la station
    const url = `http://hubeau.eaufrance.fr/api/v2/hydrometrie/observations_tr?code_entite=${codeStation}&grandeur_hydro=Q&size=1`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const observation = data.data[0];
      const debit = observation.resultat_obs;
      const date = observation.date_obs;

      document.getElementById('debit-isere').textContent = `Débit de l'Isère : ${debit} m³/s (mesuré le ${new Date(date).toLocaleString()})`;
    } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
      document.getElementById('debit-isere').textContent = 'Erreur lors du chargement des données.';
    }
  }

  document.addEventListener('DOMContentLoaded', afficherDebit);
</script>
