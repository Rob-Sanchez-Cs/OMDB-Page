//Remove previous results, show loading state, search for media based on current search and filter
function searchMedia() {
    const resultListHtml = document.querySelector('.results__list');
    resultListHtml.innerHTML = '';
    document.body.classList += ' show-loading';
    document.body.classList += ' hide-no-results';
    showMedia();
}

function getSearchValue() {
    return document.querySelector('.search__bar--input').value;
}

function getMediaFilter() {
    const mediaFilter = document.querySelector('#media-filter').value;

    if (mediaFilter === 'all')
        return ''

    else
        return `&type=${mediaFilter}`
}

function getReleaseFilter() {
    //Slice is needed for media that has a range in release field. For example, 2005-2014
    return document.querySelector('#yearFilter').value.slice(0, 4);
}

async function showMedia() {
    //Get filter and search values
    const search = getSearchValue();
    const mediaFilter = getMediaFilter();
    const releaseYear = getReleaseFilter();

    const movies = await fetch(`https://www.omdbapi.com/?apikey=725681c5&s=${search}${mediaFilter}`);
    const moviesData = await movies.json();

    const resultListHtml = document.querySelector('.results__list');

    //Search was successful, show results
    if (moviesData.Response === 'True') {

        let filteredMovies = filterMovies(moviesData.Search, releaseYear);
        const moviesHtml = filteredMovies.map((media) => getMediaHtml(media));
        document.body.classList.remove('show-loading');
        resultListHtml.innerHTML = moviesHtml.slice(0, 6).join('');
    }

    //Search found nothing, show no-results image 
    else {

        document.body.classList.remove('show-loading');
        document.body.classList.remove('hide-no-results');

    }
}

//If year filter is given, filter. Otherwise, return original list
function filterMovies(movies, releaseYear) {
    if (releaseYear) {
        return movies.filter((movie) => movie.Year >= releaseYear);
    }

    return movies;
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

function openMenu() {
    document.body.classList += ' show-burger-menu';
}

function closeMenu() {
    document.body.classList.remove('show-burger-menu');
}

function capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1,);
}