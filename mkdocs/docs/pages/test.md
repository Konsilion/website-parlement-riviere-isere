# Titre de votre page

Voici le débit actuel de l'Isère :

<p id="debit-isere">Chargement du débit en cours...</p>

<script>
  async function afficherDebit() {
    const codeStation = 'W141001001';
    const url = `https://hubeau.eaufrance.fr/api/v2/hydrometrie/observations_tr?code_entite=${codeStation}&grandeur_hydro=Q&size=1`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.data && data.data.length > 0) {
        const observation = data.data[0];
        const debit = observation.resultat_obs;
        const date = observation.date_obs;
        document.getElementById('debit-isere').textContent = `Débit de l'Isère : ${debit} m³/s (mesuré le ${new Date(date).toLocaleString()})`;
      } else {
        throw new Error('No data available');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
      document.getElementById('debit-isere').textContent = 'Erreur lors du chargement des données.';
    }
  }
  
  document.addEventListener('DOMContentLoaded', afficherDebit);
</script>
