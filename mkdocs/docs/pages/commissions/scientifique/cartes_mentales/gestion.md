---
hide:
  - toc
---

<div class="parent-container">
  <div class="iframe-container">
    <iframe src="https://embed.kumu.io/b3d59a64f47bc07d82f594c808a8a6b3?scroll=1" frameborder="0"></iframe>
  </div>  
</div>


<style> 
  h1 { display: none !important; } 
  .md-content { padding: 0 !important; } 
  article { margin: 0 !important; padding: 0 !important; } 

  .parent-container {
    position: relative; /* Pour que l'iframe-container se positionne par rapport à ce div */
    width: 100%; /* ou une largeur spécifique */
    height: 100vh; /* ou une hauteur spécifique si besoin */
  }
  
  /* Style pour la container */
  .iframe-container { 
    position: absolute;
    left: 0;
    width: 100%;
    height: calc(100% - 105px); /* Ajustement de la hauteur en fonction du top */
  } 
  
  /* Media query pour écrans larges */
  @media (min-width: 1220px) { 
    .iframe-container { 
      height: calc(100% - 155px); /* Ajustement correspondant */
    }
  }

  /* Style pour l'iframe */
  .iframe-container iframe { 
    width: 100%; 
    height: 100%; 
    border: none; 
  }
</style>
