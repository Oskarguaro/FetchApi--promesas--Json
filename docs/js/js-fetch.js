//Fetch vive en el navegador
//Ajax JavaScript asíncrono + XML (XML es viejito ahora se usa JSON), antes de AJAX existía XMLHttpRequest

//Fetch API nos sirve para hacer peticiones HTTP

//HTTP es el nombre del protocolo por medio del cual hacemos una petición de datos y recursos
//PATH es la dirección de la cual queremos obtener los recursos o datos
//HTTP trabaja con diversos métodos para realizar la petición (GET, POST, PUT, PATCH, DELETE)
//JSON es la forma estándar de transferencia de los recursos, su estructura es muy parecida a un objeto literal o expersión literal


//Lista UICN cocodrilo llanero
// fetch("http://apiv3.iucnredlist.org/api/v3/threats/species/name/Crocodylus%20intermedius?token=9bb4facb6d23f48efbf424bb05c0c1ef1cf6f468393bc745d42179ac4aca5fee")
//     .then((res) => res.json())
//     .then(data => console.log(data.result[0].title));









//Inicio del ejercicio

const cards = document.getElementById("card-dinamicas");
const templateCard = document.getElementById("templateCard");
const fragment = document.createDocumentFragment();


document.addEventListener("DOMContentLoaded", () => {
    fetchData();
});

//Esperar que cargue el DOM para hacer lo del template
const fetchData = async () => {
    // console.log("Esperando el DOM");
    try {
        loadingData(true);

        //Siempre que se usa fetch serán dos await
        const res = await fetch("https://gist.githubusercontent.com/davidcp22/d1967026b327ce66af7371725cea4c8a/raw/6fc6ca5f1eb5d9f0118b948362bc1d844f424c6b/animales.json")
        const data = await res.json();
        // console.log(data);

        pintarCards(data);

    } catch (error) {
        console.log(error);
    } finally {
        loadingData(false);
    }
};

const pintarCards = data => {
    // console.log(data);
    data.forEach(mascota => {

        console.log(mascota);

        const clone = templateCard.content.cloneNode(true);
        clone.querySelector("h5").textContent = mascota.Nombre;
        clone.querySelector("p").textContent = mascota.Tipo;
        clone.querySelector("img").setAttribute("src", mascota.Imagen);

        //Guardamos en el fragment para evitar el reflow
        fragment.appendChild(clone);
    });

    cards.appendChild(fragment);
};

const loadingData = estado => {
    const loading = document.getElementById("loading");
    if (estado) {
        loading.classList.remove("d-none");
    } else {
        loading.classList.add("d-none");
    }
};

