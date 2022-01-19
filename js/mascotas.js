const templateCard = document.getElementById("templateCard");
const cardAnimales = document.getElementById("card-animales");

const fragment = document.createDocumentFragment();



// const data = fetch("Base datos animales domesticos.json").then(res => res.json()).then(dato => dato.forEach(mascota => console.log(mascota.Nombre)))

// document.addEventListener("DOMContentLoaded", () => {
//     fetchData();
// });

const fetchData = async () => {
    // console.log("hola");
    try {
        
        const res = await fetch("./data.json");
        // const res = await fetch("https://gist.githubusercontent.com/davidcp22/d1967026b327ce66af7371725cea4c8a/raw/6fc6ca5f1eb5d9f0118b948362bc1d844f424c6b/animales.json");
        const data = await res.json();
        console.log(data);
        
        pintarCards(data)

    } catch (error) {
        console.log(error);
    }
    
};

fetchData();


const pintarCards = (data) => {
    data.forEach(mascota =>{

        // console.log(mascota);
        const clone = templateCard.content.cloneNode(true);
        clone.querySelector("img").setAttribute("src", mascota.Imagen);
        clone.querySelector("h4").textContent = mascota.Nombre;
        clone.querySelector("h5").textContent = mascota.Tipo;
        clone.querySelector(".raza").textContent = `Raza: ${mascota.Raza}`;
        clone.querySelector(".edad").textContent = `Edad: ${mascota.Edad} años`;
        clone.querySelector(".color").textContent = `Color: ${mascota.Color}`;
        clone.querySelector(".comida").textContent =`Comida: ${mascota.Comida}`;
        clone.querySelector(".habitad").textContent = `Habitad: ${mascota.Habitad}`;
        clone.querySelector(".detalles").textContent = `Observaciones: ${mascota.Observaciones}`;



        fragment.appendChild(clone);

    })

    cardAnimales.appendChild(fragment);

};



