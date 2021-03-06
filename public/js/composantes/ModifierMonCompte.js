function importeModifierMonCompte() {
    let userId = document.getElementById("idUtilisateur").value;
    let userRole = JSON.parse(document.getElementById("role").value);
    console.log(userRole[0].name);

    let user = new User();
    user.show(userId).then(dataU => {

        let eemail;
        eemail = dataU.email
        document.getElementById('email').value = eemail;
        document.getElementById('emailHidden').value = eemail;
    });

    let cell = new Cellier;
    cell.show(userId).then(dataC => {
        let cellier;
        cellier = dataC.nom
        document.getElementById('cellier').value = cellier;
    });


    document.getElementById("modifierBtn").addEventListener("click", function () {

        let eemail = document.getElementById("email").value;
        let mdp = document.getElementById("mdp").value;
        let f = document.userF;

        let msgErrE;
        //Regex Email
        msgErrE = "";
        e = f.email.value.trim();
        if (e === "") {
            msgErrE = "Email Obligatoire";
        } else {

            if (!/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(e)) {
                msgErrE = !/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(e) ?
                    "Email non valide" :
                    ""
            }
        }
        f.email.value = e;
        if (msgErrE !== "") erreur = true;
        document.getElementById("e.email").innerHTML = msgErrE;


        //Regex Mot de passe
        let msgErrM = "";
        m = f.mdp.value.trim();
        if (m === "") {
            msgErrM = "Mot de passe Obligatoire";
        } else {

            if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(m)) {
                msgErrM = !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(m) ?
                    "8 caractères minimum et au moins un nombre numérique et une lettre" :
                    ""
            }
        }
        f.mdp.value = m;
        if (msgErrM !== "") erreur = true;
        document.getElementById("e.mdp").innerHTML = msgErrM;

        let role = 2;
        if (userRole[0].name == "administrateur") role = 1;

        // information pour le serveur
        let userInfo = {
            email: eemail,
            password: mdp,
            role: role
        }

        if (msgErrE == "" && msgErrM == "") {
            user.update(userId, userInfo).then(data => {
                //ajouter success
                document.getElementById("b.modifierBtn").innerHTML = "Modification effectué";
                //refresh la page
                setTimeout(function () {
                    location.reload();
                }, 900);
            });
        }
    });

    document.getElementById("modifierCellierBtn").addEventListener("click", function () {

        let f = document.userC;
        let cellier = document.getElementById("cellier").value;

        // Regex Nom cellier
        let msgErrC = "";
        c = f.cellier.value.trim();
        if (c === "") {
            msgErrC = "Cellier Obligatoire";
        } else {

            if (!/^[a-zA-Z0-9_.-]*$/.test(c)) {
                msgErrC = !/^[a-zA-Z0-9_.-]*$/.test(c) ?
                    "Format autorisé a-zA-Z0-9_.- " :
                    ""
            }
        }
        f.cellier.value = c;
        if (msgErrC !== "") erreur = true;
        document.getElementById("e.cellier").innerHTML = msgErrC;

        let userCellier = {
            nom: cellier
        }

        if (msgErrC == "") {
            cell.update(userId, userCellier).then(data => {
                document.getElementById("b.modifierCellierBtn").innerHTML = "Modification effectué";
                //refresh la page
                setTimeout(function () {
                    location.reload();
                }, 900);
            });
        }
    });


    document.getElementById("supprimerBtn").addEventListener("click", function () {

        let f = document.suprimerF;

        let eemailHidden = document.getElementById("emailHidden").value;
        let inputEmail = document.getElementById("suprimer").value;


        if (inputEmail == eemailHidden) {
            //supression utilisateur userId
            user.destroy(userId).then(data => {
            })
            //supression cellier de l'utilisateur
            cell.destroy(userId).then(data => {
                document.getElementById("b.supprimerBtn").innerHTML = "Suppression effectué";
                //refresh la page
                setTimeout(function () {
                    location.reload();
                    window.location.href = "/"
                }, 900);
            })
        }
    });
}