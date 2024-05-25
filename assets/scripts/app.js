const addMovieModal = document.getElementById('add-modal');
const addMovieButton = document.querySelector('header button');
const backdrop = document.getElementById('backdrop')

const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive');
const successAddMovieButton = cancelAddMovieButton.nextElementSibling;

const userInputs = addMovieModal.getElementsByTagName('input');
const entryTextSection = document.getElementById('entry-text');

const deleteMovieModal = document.getElementById('delete-modal');

const movies = [];
let movieID = 0;

const updateUI = () => {
    entryTextSection.style.display = movies.length === 0 ? 'block' : 'none';
}

const toggleBackdrop = () => {
    backdrop.classList.toggle('visible');
}

const deleteMovie = (id) => {
    for (const movie of movies) {
        if (movie.movieID === id) {
            const removeIndex = movies.indexOf(movie)
            const listRoot = document.getElementById('movie-list');
            listRoot.removeChild(listRoot.children[removeIndex]);
            movies.splice(removeIndex, 1);
            break;
        }
    }
}

const deleteMovieHandler = (id) => {
    deleteMovieModal.classList.add('visible');
    toggleBackdrop();
    let btnPassive = document.querySelector('#delete-modal .btn--passive');
    let btnActive = document.querySelector('.modal__actions .btn--danger');

    btnPassive.replaceWith(btnPassive.cloneNode(true));
    btnPassive = document.querySelector('#delete-modal .btn--passive');

    btnActive.replaceWith(btnActive.cloneNode(true));
    btnActive = document.querySelector('.modal__actions .btn--danger');

    btnPassive.addEventListener('click', () => {
        deleteMovieModal.classList.remove('visible');
        if (backdrop.classList.contains('visible')) {
            toggleBackdrop();
        }
    });
    btnActive.addEventListener('click', () => {
        deleteMovieModal.classList.remove('visible');
        if (backdrop.classList.contains('visible')) {
            toggleBackdrop();
        }
        deleteMovie(id);
        updateUI();
    });
}

const renderNewMovieElement = (movieID, title, imgURL, rating) => {
    const newMovieElement = document.createElement('li');
    newMovieElement.className = 'movie-element';
    newMovieElement.innerHTML = `
        <div class="movie-element__image">
            <img src="${imgURL}" alt="${title}">
        </div>
        <div class="movie-element__info">
            <h2>${title}</h2>
            <p>${rating}/5 stars<p>
        </div>
    `;
    const listRoot = document.getElementById('movie-list');
    listRoot.append(newMovieElement);
    newMovieElement.addEventListener('click', () => {
        const id = movieID;
        deleteMovieHandler(movieID);
    });
}

const toggleMovieModalHandler = () => {
    toggleBackdrop();
    addMovieModal.classList.toggle('visible');
    clearMovieInput();
}

const backdropClick = () => {
    if (addMovieModal.classList.contains('visible')) {
        addMovieModal.classList.remove('visible');
    } else if (deleteMovieModal.classList.contains('visible')) {
        deleteMovieModal.classList.remove('visible');
    }
    toggleBackdrop();
}

const clearMovieInput = () => {
    for (const usrInput of userInputs) {
        usrInput.value = '';
    }
}

const addMovieHandler = () => {
    const titleValue = userInputs[0].value;
    const imageUrlValue = userInputs[1].value;
    const ratingValue = userInputs[2].value;
    const nonValidAlert = () => {
        alert('Please enter valid values (rating between 1 and 5).');
    }

    switch ('') {
        case (titleValue.trim() || 
              imageUrlValue.trim() || 
              ratingValue.trim()):
              nonValidAlert();
              return clearMovieInput();
    }
    if (+ratingValue < 1 || +ratingValue > 5) {
        nonValidAlert();
        return clearMovieInput();
    }

    const newMovie = {
        movieID: movieID,
        title: titleValue,
        image: imageUrlValue,
        rating: ratingValue
    };

    movies.push(newMovie);
    toggleMovieModalHandler();
    renderNewMovieElement(movieID, titleValue, imageUrlValue, ratingValue);
    updateUI();
    movieID++;
}

addMovieButton.addEventListener('click', toggleMovieModalHandler);
backdrop.addEventListener('click', backdropClick);
cancelAddMovieButton.addEventListener('click', toggleMovieModalHandler);
successAddMovieButton.addEventListener('click', addMovieHandler);
