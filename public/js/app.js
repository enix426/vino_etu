// var reponse = fetch("api/bouteilles");
// var reponseJson = reponse.then(function(res){
//     return res.json();
// });

//  let tableauNomBouteilles = ["code_saq" ,"created_at" ,"description" ,"format" ,"id" 
// ,"image" ,"image_url" ,"nom" ,"pays" ,"prix_saq" ,"type_id" ,"updated_at" ,"url_saq"] 

// function afficheLesBouteilles(bouteilles){
//     console.log(bouteilles);
    
//     let pageAcceuil = document.querySelector("#pageAcceuil>h1");
//         for(let i=0; i<bouteilles.length;i++){
//         let eUl = document.createElement("ul");
//             for(let j=0;j<tableauNomBouteilles.length;j++){
//             let eLi = document.createElement("li");
//             let eTexte = document.createTextNode(bouteilles[i][tableauNomBouteilles[j]]);
//             pageAcceuil.appendChild(eUl).appendChild(eLi).appendChild(eTexte) 
//         }
//     }
// };

// reponseJson.then(afficheLesBouteilles);


var reponse = fetch("api/saq");
var reponseJson = reponse.then(function(res){
    return res.json();
});

 let tableauSaq = ["desc","img","nom","prix","url"]; 
 let tableauSaqDesc = ["code_SAQ","format","pays","texte","type"]


function afficheSaq(saq){
    //console.log(saq[0]);

    let pageAcceuil = document.querySelector("#pageAcceuil");
    for(let i=0; i<saq.length;i++){
    let eUl = document.createElement("ul");
        for(let j=0;j<tableauSaq.length;j++){
            if(tableauSaq[j] === "desc"){
                for(let k=0;k<tableauSaqDesc.length; k++){
                    let eLi = document.createElement("li");
                    let eTexteDesc = document.createTextNode(saq[i].desc[tableauSaqDesc[k]]);
                    eLi.appendChild(eTexteDesc);
                    eUl.appendChild(eLi)
                    
                } 
            }

        let eLi = document.createElement("li");

        let eTexte = document.createTextNode(saq[i][tableauSaq[j]]);
        eLi.appendChild(eTexte);

         eUl.appendChild(eLi)  
         pageAcceuil.appendChild(eUl)

    }

}


};

reponseJson.then(afficheSaq);
 




