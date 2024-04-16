---
hide:
   - toc
   - navigation
---

![Retour configuration](https://raw.githubusercontent.com/Konsilion/website/master/media/fleche-retour.png){ .md-button .md-button--primary onclick="window.history.back();" style="float:right; height: 40px; padding: 5px; margin: 5px; border-radius: 50px; border: 3px solid grey;"}

# Associer un nom de domaine à votre plateforme

[Documentation officielle](https://docs.github.com/fr/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site){ .md-button .md-button--secondary style="float:left; margin: 0px 15px;" target="_blank"}

<br><br>
    

=== "Fichier CNAME"

    Dans votre dossier `docs` vous trouverez un fichier nommé `CNAME`. Il permet de signaler aux serveurs de GitHub hébergeant votre plateforme, où aller quand une requête pour votre nom de domaine `votre-site.fr` est faite. Pour mieux comprendre vous pouvez le voir comme une balise ou encore un mouchard de redirection.
    
    * Cliquer sur le bouton ci-dessous,
    
    * Ecrire votre nom de domaine : `votre-site.fr`,
    
    * Sauvegarder le fichier.

    [Votre fichier CNAME]({{ katalog_repo }}/edit/master/docs/CNAME){ .md-button .md-button--secondary style="float:right; margin: 15px 25px;" target="_blank"}
        
=== "DNS"

    ## Depuis votre interface de nom de domaine
    
    Lorsqu'un utilisateur demande à se rendre sur votre site par l'adresse `https://votre-site.fr`, il émet ce que l'on appelle une requête DNS. Cette dernière est envoyée sur le réseau et est redirigée selon les besoins. 
    
    Ainsi, dans votre tableau de bord 'Enregistrement DNS' de votre nom de nomaine, il faut indiquer où aller, voilà à quoi servent ces valeurs.
    
    * Enregistrer ces valeurs dans vos enregistrements DNS,
    
    * Attendre maximum 24h le temps que les valeurs DNS se propagent.
    
    ![recommandation-admin](https://github.com/Konsilion/website/blob/master/media/DNS_recommandation.png?raw=true)

    

<script type="text/javascript" src="https://konsilion.github.io/katalog-setup/js/functionality/modif-page.js" defer></script> 
