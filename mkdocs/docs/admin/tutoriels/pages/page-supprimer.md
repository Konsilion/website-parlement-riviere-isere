---
hide:
   - toc
   - navigation
---

![Retour configuration](https://raw.githubusercontent.com/Konsilion/website/master/media/fleche-retour.png){ .md-button .md-button--primary onclick="window.history.back();" style="float:right; height: 40px; padding: 5px; margin: 5px; border-radius: 50px; border: 3px solid grey;"}

# Comment supprimer une page ?

=== "Étape 1"

    [Étape 1 - Déreférencer ma page]({{ katalog_repo }}/edit/master/mkdocs.yml){ .md-button .md-button--secondary style="float:right; margin: 15px 25px;" target="_blank"}

    ## Déreférencer votre page
    
    Pour cela il vous suffit de supprimer la ligne y faisant référence dans la catégorie `nav:`

=== "Étape 2"

    [Étape 2 - Supprimer ma page]({{ katalog_repo }}/blob/master/docs/pages/){ .md-button .md-button--secondary style="float:right; margin: 15px 25px;" target="_blank"}

    ## Supprimer votre page
    
    Pour cela il vous faut avant tout déreférencer la page et ensuite la supprimer.