//Un array que contiene objetos
// const posts = [
//     {
//         "userId": 1,
//         "id": 1,
//         "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
//         "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
//     },
//     {
//         "userId": 1,
//         "id": 2,
//         "title": "qui est esse",
//         "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
//     },
//     {
//         "userId": 1,
//         "id": 3,
//         "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
//         "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
//     },
// ];


//Uso de callback, es una función que se pasa como argumento a otra función
// const findPostById = (id, callback) => {
//     const post = posts.find(item => item.id === id);

//     if (post){
//         //En el callback como nomenclatura siempre se envía primero el error "null" y después la respuesta satisfactoria
//         callback(null, post);
//     } else {
//         callback("no se encontró el post con id " + id);
//     };

//     // callback(post);
// };

//Ejecuto la función findPostById para llamar el id correspondiente
// findPostById (1, (error, post) => {
//     if (error){
//         return console.log(error);
//     };
//     console.log(post);
// });


//Errores si no existe el id
// findPostById (4, (post) => {
//     console.log(post);
// });

//En caso de que exista el error retorno el error y si existe el post retorno el post
// findPostById (4, (error, post) => {
//     if (error){
//         return console.log(error);
//     };
//     console.log(post);
// });

//la función return permite eliminar los {} y reducir el comando
// findPostById (4, (err, post) => {
//     if (err) return console.log(err);
//     console.log(post);
// });


//Callbacks anidados, pasa cuando quiero llamar a un callback dentro de otro
// findPostById (1, (err, post) => {

//     if (err) return console.log(err);
//     console.log(post);

//     findPostById(2, (err, post) =>{

//         if (err) return console.log(err);
//         console.log(post);

//         findPostById (3, (err, post) => {

//             if (err) return console.log(err);
//             console.log(post);

//             findPostById (4, (err, post) => {

//                 if (err) return console.log(err);
//                 console.log(post);
//             });
//         });
//     });
// });


//Las promesas se usan para no hacer lo anterior, y deben cumplirse. Son más organizadas
// const findPostById = (id) => {
//     const post = posts.find(item => item.id === id);

//     //Vamos a retornar una nueva promesa con la respuesta satisfactoria "resolve" o con el error "reject", que son parámetros inventados
//     return new Promise((resolve, reject) => {
//         if (post){
//             resolve(post);
//         } else {
//             reject("No se encontró el id " + id);
//         };
//     });
// };

//El then() llama la respuesta satisfactoria de la promesa
// findPostById(1).then()

//Para mayor entendimiento se ubica asi
// findPostById(4)
//     .then((post) => console.log(post))
//     .catch((e) => console.log(e));


// //Lo veremos en formas mas directas como:
// const findPostById = id => new Promise((resolve, reject) => {
//     const post = posts.find(item => item.id === id);
//     if (post){
//         resolve(post);
//     } else {
//         reject("No se encontró el id " + id);
//     };
// });

// // findPostById(1)
// //     .then((post) => console.log(post))
// //     .catch((e) => console.log(e));

// //Promesas anidadas
// findPostById(1)
//     .then((post) => {
//         console.log(post);
//         return findPostById(2)
//     })
//     .then((post) => {
//         console.log(post);
//         return findPostById(3)
//     })
//     .then((post) => {
//         console.log(post);
//         return findPostById(4)
//     })
//     .catch((e) => console.log(e));





// //Simular tiempo de carga de la base de datos
// const findPostById = id => new Promise((resolve, reject) => {

//     //Función que simula el tiempo de carga, 2000 = 2 segundos, y pasamos la función dentro del setTimeout
//     setTimeout(() => {
//         const post = posts.find(item => item.id === id);
//         if (post){
//             resolve(post);
//         } else {
//             reject("No se encontró el id " + id);
//         };
//     }, 2000);

// });

// // findPostById(1)
// //     .then((post) => console.log(post))
// //     .catch((e) => console.log(e));

// //Este código aparece al instante y no se detiene para que se cumpla la promesa, o sea no se ejecuta en cadena
// // console.log("fin del código")


// //Async y Await, el async puede trabajar sólo pero await requiere que haya un async. El async es una función de flecha. Async y Await funcionan únicamente con promesas para validar si se cumple y mostrar el resultado
// const buscar = async (id) => {

//     //El try catch permite solucionar errores cuando no se cumple la promesa, y se pueden combinar con "finally" para ejecutar un función adicional
//     try {
//         // const post = await findPostById(id)
//         // console.log(post);

//         //Forma incorrecta: Esto no es recomendable hacerlo porque el await valida cada variable por 2 segundos duplicando el tiempo de espera
//         // const postUno = await findPostById(1)
//         // const postDos = await findPostById(2)
//         // console.log(postUno.title, postDos.title);}

//         //Forma correcta, hacer un array con las promesas y esto se hace con Promise.all que recibe como array las promesas que se quieran ejecutar, y asi cumplidos los 2 segundos muestra todas las respuestas al tiempo, sin embargo si una de las respuestas es un error puede no mostrar nada OJO con esto
//         const resPosts = await Promise.all([
//             findPostById(1),
//             findPostById(2)
//         ]);

//         console.log(resPosts[0].title, resPosts[1].title);

//     } catch (reject) {
//         console.log(reject);
//     } finally {
//         console.log("Se ejecuta si o si");
//     }
// };

// // buscar(1);
// // buscar(2);
// // buscar(3);
// // buscar(4);

// //Para visualizar postUno y postDos o resPosts[0].title y resPosts[1].title
// buscar();

// console.log("fin del código")







//Introducción a fetch API, el primer argumento obligatorio de fetch es que debe tener una ruta de acceso (URL)

//Con el /1 traemos el primer objeto y asi sucesivamente
// const url = "https://jsonplaceholder.typicode.com/posts/1"

//Si hay un error en la url
// const url = "https://jsonplaceholder.typicode.com/postssssss/1"

//Hacer la URL dinámica
// const url = "https://jsonplaceholder.typicode.com/posts/"


//Llamar la promesa
// fetch(url).then(res => console.log(res));
//Se recibe la respuesta en .json y se debe formatear
// fetch(url)
//     .then(res => res.json())
//     .then(data => console.log(data))
//     .catch(e => console.log(e))
//     .finally(() => console.log("Finalizó"));


// const findPostById = async (id) => {
//     try {
//         //El + id hace dinámico el fetch
//         const res = await fetch(url + id);
//         //Ahora si es necesario que primero llame la url y despues la formatee a .json
//         const post = await res.json();

//         console.log(post);
//     } catch (error) {
//         console.log(error);
//     };
// };

// findPostById(50);


//APIs es cuando queremos conectar (comunicar) dos recursos o dispositivos a través de lenguaje de programación de manera sencilla
//APIs del navegador y APIs de terceros (el DOM es una API del navegador)
//API REST es un estándar o forma de trabajar, si la API cumple con la metodlogía REST se dice que es Restful


