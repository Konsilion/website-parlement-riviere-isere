---
title: Admin
hide:
  - toc
  - navigation
version: 0.9
---

<script defer>
    var mdp = prompt("Quels est votre Mot de Passe");
    if (mdp != AdminMdp){ alert("Mot de passe incorrect."); document.body.innerHTML = "Erreur dans le mot de passe. Recharger la page pour ressayer.";}
    var LocalVersion = "{{ version }}";
</script>

<div id="UpdateAlert" style="display: none;">
    <b style="color:red;">Une mise à jour est disponible</b> : Afin de mettre à jour votre plateforme et de bénificier des dernières mise à jour, vous pouvez suivre ce <a href="./tutoriels/admin/admin-update" target="_self">tutoriel</a>.
    <hr>
</div>

![Repertoire GitHub](https://raw.githubusercontent.com/Konsilion/website/master/media/logo-github.png){ .md-button .md-button--primary onclick="window.open('{{ katalog_repo }}','_blank');" style="float:right; height: 40px; padding: 5px; margin: 5px; border-radius: 50px; border: 3px solid grey;"}

![Accueil du site](https://raw.githubusercontent.com/Konsilion/website/master/media/fleche-retour.png){ .md-button .md-button--primary  onclick="window.open('{{ katalog_site }}','_self');"  style="float:right; height: 40px; padding: 5px; margin: 5px; border-radius: 50px; border: 3px solid grey;"}


# Panneau de configuration

=== "Administration"

    <div class="ksln-grid">
        <div class="ksln-cards">
            <h3><b>Paramétrer votre plateforme</b></h3>
            Vos premiers pas ici ? Appropriez vous votre site Web en modifiant les paramètres généraux.
            <hr>
            <a class="md-button md-button--secondary" href="{{ katalog_site }}/admin/tutoriels/admin/admin-parametrer">Lien</a>
        </div>
        <div class="ksln-cards">
            <h3><b>Gérer les contributions</b></h3>
            Accedez à la liste des contributions en attente faites sur votre site.
            <hr>
            <a class="md-button md-button--secondary" href="{{ katalog_repo }}/pulls" target="_blank">Lien</a>
        </div>
        <div class="ksln-cards">
            <h3><b>Gérer les droits d'administration</b></h3>
            Définissez la modération par les droits d'accès, de lecture et d'écriture de votre plateforme.
            <hr>
            <a class="md-button md-button--secondary" href="{{ katalog_site }}/admin/tutoriels/admin/admin-droits">Lien</a>
        </div>
        <div class="ksln-cards">
            <h3><b>Associer un nom de domaine</b></h3>
            Relier ce site web à l'un de vos domaines ou sous-domaines (ex: konsilion.fr).
            <hr>
            <a class="md-button md-button--secondary" href="{{ katalog_site }}/admin/tutoriels/admin/admin-domaine">Lien</a>
        </div>
        <div class="ksln-cards">
            <h3><b>Système de commentaires</b></h3>
            Donner la possibilité aux utilisateurs de commenter une page.
            <hr>
            <a class="md-button md-button--secondary" href="{{ katalog_site }}/admin/tutoriels/pages/page-commenter">Lien</a>
        </div>
    </div>

=== "Espaces de stockages"

    <p></p>


    [Accéder à votre médiathèque]({{ katalog_site }}/katalog/klouds/home){ .md-button .md-button--primary style="float: right; margin: 10px;"}

    Retrouvez la liste des différents espaces de stockage enregistrés servant au partage de vos ressources et fichiers divers.

    <hr>

    <div class="ksln-grid">
        <div class="ksln-cards">
            <h3><b>Déposer un fichier</b></h3>
            <img src="https://cdn-icons-png.flaticon.com/512/9121/9121674.png" style="margin: 5px; max-width: 75px; width: 100%; float: right; opacity:0.4;">
            <a class="md-button md-button--secondary" href="{{ katalog_repo }}/upload/master/media" target="_blank">Lien</a>
            <br>
            <br>
        </div>
        <div class="ksln-cards">
            <h3><b>Vos dépôts express</b></h3>
            <img src="https://cdn-icons-png.flaticon.com/512/3603/3603249.png" style="margin: 5px; max-width: 75px; width: 100%; float: right; opacity:0.4;">
            <a class="md-button md-button--secondary" href="{{ katalog_repo }}/tree/master/media" target="_blank">Lien</a>
            <br>
            <br>
        </div>
    </div>


=== "Pages Web"

    <div class="ksln-grid">
        <div class="ksln-cards">
            <h3><b>Créer une page</b></h3>
            De l'article de blog à une page contact, créer et diffuser le contenu Web que vous souhaitez, sans compétence particulière.
            <hr>
            <a class="md-button md-button--secondary" href="{{ katalog_site }}/admin/tutoriels/pages/page-creer">Lien</a>
        </div>
        <div class="ksln-cards">
            <h3><b>Modifier une page</b></h3>
            Modifier une page Web existante en toute simplicité.
            <hr>
            <a class="md-button md-button--secondary" href="{{ katalog_site }}/admin/tutoriels/pages/page-modifier">Lien</a>
        </div>
        <div class="ksln-cards">
            <h3><b>Supprimer une page</b></h3>
            Supprimer ou de-référencer une page Web. 
            <hr>
            <a class="md-button md-button--secondary" href="{{ katalog_site }}/admin/tutoriels/pages/page-supprimer">Lien</a>
        </div>
    </div>


=== "Catalogues Web"

    <div class="ksln-grid">
        <div class="ksln-cards">
            <h3><b>Créer un catalogue</b></h3>
            Présenter vos données, ressources et autres intérêts dans un catalogue Web (de multiples disposition existes, les découvrir).
            <hr>
            <a class="md-button md-button--secondary" href="{{ katalog_site }}/admin/tutoriels/katalogs/catalogue-creer">Lien</a>
        </div>
        <div class="ksln-cards">
            <h3><b>Paramètrer un catalogue</b></h3>
            Modifier une catalogue Web existant en toute simplicité.
            <hr>
            <a class="md-button md-button--secondary" href="{{ katalog_site }}/admin/tutoriels/katalogs/catalogue-modifier">Lien</a>
        </div>
        <div class="ksln-cards">
            <h3><b>Supprimer un catalogue</b></h3>
            Supprimer ou de-référencer un catalogue Web.
            <hr>
            <a class="md-button md-button--secondary" href="{{ katalog_site }}/admin/tutoriels/katalogs/catalogue-supprimer">Lien</a>
        </div>
    </div>


<script src="https://konsilion.github.io/katalog-setup/js/admin.js"></script>