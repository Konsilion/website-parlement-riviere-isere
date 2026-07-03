---
title: Accueil
hide:
  - toc
  - navigation
---

# Parlement de la rivière Isère

<div class="hero-section">
  <div class="hero-overlay"></div>
  <div class="hero-content">
    <h1 class="hero-title">Parlement de la rivière Isère</h1>
    <p class="hero-subtitle">Écouter la rivière et ses affluents</p>
    <div class="hero-scroll">
      <span>Découvrir</span>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
    </div>
  </div>
</div>

<div class="hero-spacer"></div>

---

# À l'écoute de la rivière

Le **Parlement de la rivière Isère** entend donner une voix à la rivière :

- participation citoyenne,
- droits de la nature,
- démarche fluvio-sensible,
- et appropriation des enjeux.

[En savoir plus ➜](pages/le_parlement/index.md){ .md-button .md-button--primary style="float: right; margin: 0 0 50px 55px;"}

[Nous contacter](pages/contact.md){ .md-button .md-button--secondary style="float: right; margin: 10px 0 10px 0;"}

[Compte Rendu 1ère Session ➜](pages/sessions/premiere_session.md){ .md-button .md-button--secondary style="text-align: center; float: right; margin: 20px 0 50px 0px; border-radius: 50px !important"}

<hr>

<br><br><br>

![](https://raw.githubusercontent.com/Konsilion/website-parlement-riviere-isere/refs/heads/master/mkdocs/media/PRI%20-%20deambulation_page.jpg){style="width: 48%; min-width: 550px; float: left; margin: 20px 0 20px 0px; "}
![](https://raw.githubusercontent.com/Konsilion/website-parlement-riviere-isere/refs/heads/master/mkdocs/media/PRI%20-%203eme%20session%20-%20V2.jpg){style="width: 48%; min-width: 550px; float: right; margin: 20px 0 20px 0px; "}

<style>
    .hero-section {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background-image: url('https://raw.githubusercontent.com/Konsilion/website-parlement-riviere-isere/refs/heads/master/mkdocs/media/PRI%20-%20deambulation_page.jpg');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        z-index: 999;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .hero-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to bottom, rgba(11,67,135,0.4) 0%, rgba(11,67,135,0.3) 60%, rgba(255,255,255,0.9) 100%);
    }
    .hero-content {
        position: relative;
        z-index: 1;
        text-align: center;
        color: white;
        padding: 0 20px;
    }
    .hero-title {
        font-size: 3.5em !important;
        color: white !important;
        text-shadow: 0 2px 20px rgba(0,0,0,0.5);
        margin: 0 !important;
        font-weight: 700 !important;
    }
    .hero-subtitle {
        font-size: 1.4em;
        text-shadow: 0 2px 10px rgba(0,0,0,0.5);
        margin: 20px 0 0 0 !important;
        color: white !important;
    }
    .hero-scroll {
        position: absolute;
        bottom: 40px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        color: white;
        animation: bounce 2s infinite;
    }
    .hero-scroll span {
        font-size: 0.9em;
        margin-bottom: 5px;
        text-shadow: 0 1px 5px rgba(0,0,0,0.5);
    }
    @keyframes bounce {
        0%, 100% { transform: translateX(-50%) translateY(0); }
        50% { transform: translateX(-50%) translateY(10px); }
    }
    .hero-spacer {
        height: 100vh;
    }
    @media (max-width: 768px) {
        .hero-title { font-size: 2em !important; }
        .hero-subtitle { font-size: 1em; }
    }
</style>
