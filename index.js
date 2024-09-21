async function main() {
    showMovies();
}

function searchMedia(event) {
    showMedia(event.target.value);
}


/* 

<div class="media">
                        <figure class="media__poster--wrapper">
                            <img class="media__poster" src="https://m.media-amazon.com/images/M/MV5BNzlkNzVjMDMtOTdhZC00MGE1LTkxODctMzFmMjkwZmMxZjFhXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg" alt="">
                        </figure>
                        <h2 class="media__title">The Fast and the Furious</h2>
                        <p class="media__type">Media Type: movie</p>
                        <p class="media__year">Released: 2001</p>
                    </div>
                    
*/
async function showMedia(search) {
    document.body.classList += ' hide-no-results'
    //show loading state



    const movies = await fetch(`https://www.omdbapi.com/?apikey=725681c5&s=${search}`);
    const moviesData = await movies.json();
    const resultListHtml = document.querySelector('.results__list')

    //Search was successful, show results
    if (moviesData.Response === 'True') {
        //remove loading state

        const moviesHtml = moviesData.Search.map((media) => getMediaHtml(media))
        
        resultListHtml.innerHTML = moviesHtml.slice(0,6).join('');
    }

    //Search found nothing, show no-results image 
    else {
        //remove loading state and show no-results

        resultListHtml.innerHTML = '';
        document.body.classList.remove('hide-no-results');
    }
}

function getMediaHtml(media) {
    return `<div class="media">
                <figure class="media__poster--wrapper">
                    <img class="media__poster" src="${media.Poster}" alt="">
                </figure>
                <h2 class="media__title">${media.Title}</h2>
                <p class="media__type">Media Type: ${capitalizeFirstLetter(media.Type)}</p>
                <p class="media__year">Released: ${media.Year}</p>
            </div>`
}

function capitalizeFirstLetter(string){
    return string[0].toUpperCase() + string.slice(1,);
}