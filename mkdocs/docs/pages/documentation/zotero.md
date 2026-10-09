---
hide:
  - toc
  - navigation
---

<!-- zotero-embed v2 : l'iframe est redimensionnée par postMessage depuis la
     vitrine (?mode=integre). Une seule barre de défilement (celle de la page),
     pas de fond imposé par la vitrine (transparent) : aucune bande blanche. -->
<div class="zotero-embed">
  <iframe
    id="zotero-vitrine"
    src="https://konsilion.github.io/zotero-parlement-riviere-isere/?mode=integre"
    title="Bibliothèque Zotero du Parlement de la rivière Isère"
    loading="lazy"></iframe>
</div>

<noscript>
  <p style="padding: 1rem 1.25rem;">
    L'affichage de la bibliothèque nécessite JavaScript.
    <a href="https://konsilion.github.io/zotero-parlement-riviere-isere/">Ouvrir la bibliothèque dans un onglet dédié.</a>
  </p>
</noscript>

<script>
(function () {
  var IFRAME_ID = "zotero-vitrine";
  var ALLOWED_ORIGIN = "https://konsilion.github.io";
  var MIN_HEIGHT = 600;

  var iframe = document.getElementById(IFRAME_ID);
  if (!iframe) return;

  // Hauteur provisoire le temps du premier message de la vitrine
  iframe.style.height = "1600px";

  window.addEventListener("message", function (event) {
    if (event.origin !== ALLOWED_ORIGIN) return;
    var data = event.data;
    if (!data || data.type !== "zotero-vitrine:height") return;
    if (typeof data.height !== "number" || !isFinite(data.height) || data.height <= 0) return;
    // +2 px de marge d'arrondi, minimum pour éviter tout défilement interne résiduel
    iframe.style.height = Math.max(MIN_HEIGHT, Math.ceil(data.height) + 2) + "px";
  });
})();
</script>

<style>
  h1 { display: none !important; }
  .md-content { padding: 0 !important; }
  article { margin: 0 !important; padding: 0 !important; }
  .md-main__inner { margin-top: 0; }
  .md-grid {
    margin-left: auto;
    margin-right: auto;
    max-width: 100%;
  }

  .zotero-embed {
    width: 100%;
  }
  .zotero-embed iframe {
    display: block;
    width: 100%;
    border: 0;
    /* Pas de hauteur CSS ici : pilotée par postMessage (voir script plus haut) */
  }
</style>
