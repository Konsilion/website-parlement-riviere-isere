---
hide:
   - toc
   - navigation
---

![Retour configuration](https://raw.githubusercontent.com/Konsilion/website/master/media/fleche-retour.png){ .md-button .md-button--primary onclick="window.history.back();" style="float:right; height: 40px; padding: 5px; margin: 5px; border-radius: 50px; border: 3px solid grey;"}

# Comment créer et éditer un catalogue Web ?

=== "Étape 1"

    [Télécharger le modèle]({{ katalog_repo }}/new/master/docs/pages){ .md-button .md-button--secondary style="float:right; margin: 15px 25px;" target="_blank"}

    ## Télécharger le dossier modèle

=== "Étape 2"

    ## Faites glisser les fichiers de ce dossier
    
    <input class="kslt-btn-index" id="KatalogName" placeholder="Nom de votre catalogue ?">
    
    <a class="md-button md-button--secondary" href="javascript:CreateKatalog();" style=""> Déposer les fichiers</a>
    
    
=== "Étape 3"

    [Référencer mon catalogue]({{ katalog_repo }}/new/master/docs/pages){ .md-button .md-button--secondary style="float:right; margin: 15px 25px;" target="_blank"}

    ## Référencer votre catalogue
    
    Dans le répertoire du projet, vous trouverez un fichier mkdocs.yml qui contient les paramètres de votre projet. Ouvrez ce fichier en cliquant sur le bouton et modifiez-le pour définir l'arborescence de vos pages.

<script>
function CreateKatalog() {

    var name = document.getElementById("KatalogName").value;
    
    if(name != ""){
        window.open("{{katalog_repo}}/upload/master/docs/katalog/" + name);
    } else {
        alert("Renseigner le nom de votre nouveau Catalogue Web.");
    }
};
</script>