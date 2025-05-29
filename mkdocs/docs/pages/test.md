---
hide: 
    -toc
    -navigation
---


<script>
  async function afficherDebit() {
    const codeStation = 'W141001001'; // Remplacez par le code de votre station
    const url = `https://hubeau.eaufrance.fr/api/v1/hydrometrie/observations_tr?code_station=${codeStation}&grandeur_hydro=Q&size=1`;

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
















<details>
  <summary><strong>Prise de notes - Comité d'organisation</strong></summary>
  <iframe 
    src="https://aquarepere.banquedesterritoires.fr/territoire/86031cfd-65d5-4321-8be3-4c7048d3f80f/EPTB%20Is%C3%A8re" 
    width="100%" 
    height="1350" 
    style="border: none;">
  </iframe>
</details>












<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Quick Sigma.js Example</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/sigma.js/2.4.0/sigma.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/graphology/0.25.4/graphology.umd.min.js"></script>
  </head>
  <body style="background: transparent">
    <div id="container" style="width: 800px; height: 600px; background: white"></div>
    <script>
      // Create a graphology graph
      const graph = new graphology.Graph();
      graph.addNode("1", { label: "Node 1", x: 0, y: 0, size: 10, color: "blue" });
      graph.addNode("2", { label: "Node 2", x: 1, y: 1, size: 20, color: "red" });
      graph.addEdge("1", "2", { size: 5, color: "purple" });
      // Instantiate sigma.js and render the graph
      const sigmaInstance = new Sigma(graph, document.getElementById("container"));
    </script>
  </body>
</html>
