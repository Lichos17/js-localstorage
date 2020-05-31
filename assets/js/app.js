//Variables
const listaTweets = document.getElementById("lista-tweets");

//Event listeners

eventListeners();

function eventListeners(){
    document.querySelector('#formulario').addEventListener('submit', agregarTweet);

    listaTweets.addEventListener('click', borrarTweet);

    //contenido cargado
    document.addEventListener('DOMContentLoaded', localStorageListo);

    document.querySelector('#eliminar').addEventListener('submit', eliminarTweets);
}


//Funciones

function agregarTweet(e){
    e.preventDefault();
    //leer el valor del textarea
    const tweet = document.getElementById("tweet").value;
    //crear boton de eliminar
    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'borrar-tweet';
    botonBorrar.innerText = 'X';




    //CRear elemento y añadirle el contenido a la lista
    const li = document.createElement('li');
    li.innerText = tweet;
    //añade el boton borrar al tweet
    li.appendChild(botonBorrar);
    //añade el tweet a la lista
    listaTweets.appendChild(li);

    //añadir al Local Storage
    agregarTweetLocalStorage(tweet);

    document.getElementById('formulario').reset();
}
//Elimina el tweet del DOM
function borrarTweet(e){
    e.preventDefault();

    if(e.target.className === 'borrar-tweet'){
        e.target.parentElement.remove();
        borrarTweetLocalStorage(e.target.parentElement.innerText);
    }
}


//Mostrar datos de localstorage en la lista
function localStorageListo(){
    let tweets;

    tweets = obtenetTweetsLocalStorage();

    tweets.forEach(function(tweet){
                //crear boton de eliminar
        const botonBorrar = document.createElement('a');
        botonBorrar.classList = 'borrar-tweet';
        botonBorrar.innerText = 'X';




        //CRear elemento y añadirle el contenido a la lista
        const li = document.createElement('li');
        li.innerText = tweet;
        //añade el boton borrar al tweet
        li.appendChild(botonBorrar);
        //añade el tweet a la lista
        listaTweets.appendChild(li);   
    })
}

//Agrega tweet a local storage
function agregarTweetLocalStorage(tweet){
    let tweets;
    tweets = obtenetTweetsLocalStorage();
    //añadir el nuevo tweet
    tweets.push(tweet);
    //convertir el arreglo a string para local storage
    localStorage.setItem('tweets', JSON.stringify(tweets));

}

//Comprobar que haya elementos en localstorage
function obtenetTweetsLocalStorage(){
    let tweets;
    //revisamos los valores del local storage
    if(localStorage.getItem('tweets') === null){
        tweets = [];
    } else{
        tweets = JSON.parse(localStorage.getItem('tweets'));
    }
    return tweets;
}

function borrarTweetLocalStorage(tweet){
    let tweets, tweetBorrar;
    tweets = obtenetTweetsLocalStorage();

    tweetBorrar = tweet.substring(0,tweet.length -1);

    tweets.forEach(function(tweet, index){
        if(tweetBorrar === tweet){
            tweets.splice(index, 1)
        }
    });
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

function eliminarTweets(){
    localStorage.clear();
    window.location.reload(false);
}