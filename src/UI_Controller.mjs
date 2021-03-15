
import Movie,  {allMovies, addMovieItemToTheArray, removeMovieItemFromArr, returnGenres, editMovieItemInTheArray, getMovieItemBymovieID} from "./moviesConstructor.mjs";
import getRandomBackgroundColor from './randomColors.mjs';
import setPages, {barBar, displayPage, setTabBars, resetItem} from "./pagination.mjs";

let movieContainer = document.getElementById('movies__Container'),
    addBtn = document.getElementById('add__Button'),
    editBtn = document.getElementById('edit__Button'),
    input__Movie__Name = document.getElementById('input__Movie__Name'),
    input__Director = document.getElementById('input__Director'),
    release__Year = document.getElementById('release__Year'),
    disabled__Body = document.getElementById('disabled__Body'),
    input__Check__List = document.querySelectorAll('input[type=checkbox]'),
    edit__Mode__Title = document.getElementById('adding__Card__Title'),
    help__Bar = document.getElementById('help__Bar'),
    plusMark__Style = document.getElementById('plus__Mark'),
    clearAll__Btn = document.getElementById('clear__All__Button');


let book = [], genresDisplay = [], isGenreMode, isBookMarkMode; 

let getNewMovie = ()=>{
    isGenreMode =barBar.classList.contains('genre-mode');
    let movieName = input__Movie__Name.value,
        director = input__Director.value,
        year = release__Year.value,
        checkedGenres = document.querySelectorAll('input[type=checkbox]:checked~label');

    checkedGenres = Array.from(checkedGenres).map(x=> {
        return x.textContent;
    })
    if(movieName !=="" && director !== "" && year !== "" && !isNaN(parseInt(year))){
            let movieID = (allMovies.length === 0)? 0 : allMovies[allMovies.length-1].movieID +1;
            let newMovie = new Movie(movieID, movieName, director, year, checkedGenres);
            addMovieItemToTheArray(allMovies, newMovie);
            addMovieItem(newMovie);
            formReset(movieName, director, year);
            getRandomBackgroundColor();
            setPagesAndSlidBar(allMovies);
            document.getElementById('bookmark').textContent = 'bookmark_border';
            barBar.dataset.mode = '';
            isGenreMode? resetClearEffect(): null;     
    }
    else input__Movie__Name.focus()
}



let addMovieItem = (movieItemObj, itemDelay=0)=>{
    if(movieItemObj.star === true){
        addMovieItemToTheArray(book, movieItemObj);
    }
    let newMovieItem = document.createElement('div'), movieItemInDOM;
    let v = (movieItemObj.star === true)? 'star':'star_border';
    newMovieItem.innerHTML = `
    <h3 class = "movie-title" data-movie-id = "${movieItemObj.movieID}">${movieItemObj.name}<span>${movieItemObj.year}</span></h3>
    <div class="movie-director">${movieItemObj.director}</div>
         ${addMovieItemGenres(movieItemObj)}
    <div class="sett-icons">
        <i class="material-icons star">${v}</i>
        <i class="material-icons edit">edit</i>
        <i class="material-icons clear">clear</i>
    </div>
    `;
    newMovieItem.classList.add('movie-item');
    newMovieItem.id ="";
    movieContainer.insertAdjacentHTML('afterbegin', newMovieItem.outerHTML);
    movieItemInDOM = document.querySelector(`[data-movie-id='${movieItemObj.movieID}']`);
    movieItemInDOM.parentElement.style.animationDelay = `${itemDelay}ms`;
    addEventListenerToItem(movieItemInDOM.parentElement);
    movieItemInDOM.parentElement.addEventListener('click', (e)=> {
        addSettIconsFun(e, movieItemObj.movieID);
        if(e.target.classList.contains('genres-tag')) {
            barBar.classList.add('genre-mode');
            clearAll__Btn.style.visibility = 'visible';
            getTaggedMovies(e.target.textContent);
        }
    })
}


let addMovieItemGenres = (movieItemObj)=> {
    let ul = document.createElement('ul');
    for(let i=0; i<movieItemObj.genres.length; i++){
        let li = document.createElement('li');
        li.classList.add('genres-tag')
        li.textContent = movieItemObj.genres[i];
        ul.appendChild(li);
    }
    return ul.outerHTML;
}

let getTaggedMovies = genreTag=> {
    let k=0;
    genresDisplay = [];
    if(barBar.dataset.mode !== 'bookmark-mode'){
        allMovies.forEach(x=> {
            resetItem(x.movieID, 'none');
            for(let j =0; j<x.genres.length; j++){
                    if(x.genres[j]===genreTag){
                        genresDisplay[k] = x;
                        k++
                    }
            }
        })
    }
    else {
        book.forEach(x=> {
            resetItem(x.movieID, 'none');
            for(let j =0; j<x.genres.length; j++){
                    if(x.genres[j]===genreTag){
                        genresDisplay[k] = x;
                        k++;
                    }
            }
        })
    }
    setPagesAndSlidBar(genresDisplay)
    currentTagEffect(true, genreTag)
}

let currentTagEffect = (light, genre) => {
    Array.from(document.querySelectorAll('.genres-tag')).forEach(li => {
        li.classList.contains('not-current-tag')? li.classList.remove('not-current-tag'): null;
        if(light) li.textContent !== genre? li.classList.add('not-current-tag'): null;
    })
}
let addEventListenerToItem = (el)=>{

        el.addEventListener('mouseover', ()=>{
            el.lastElementChild.classList.add('sett-icons-after-hover');
        })
        el.addEventListener('mouseout', ()=>{
            el.lastElementChild.classList.remove('sett-icons-after-hover')
        })
}

let addSettIconsFun = (e, i) =>{
        let movie__Item = e.target.parentElement.parentElement;
        isGenreMode = barBar.classList.contains('genre-mode');
        isBookMarkMode = barBar.dataset.mode === "bookmark-mode";
        if(e.target.classList.contains('clear')){
            getRandomBackgroundColor();
            movie__Item.removeAttribute('style');
            movie__Item.classList.add('movie-item-remove-anim');
            movie__Item.addEventListener('animationend', ()=> {
                removeMovieItemFromArr(allMovies, i);
                removeMovieItemFromArr(book, i);
                if(isGenreMode){
                    resetClearEffect();
                    isBookMarkMode? afterRemovingItemTasks(book): afterRemovingItemTasks(allMovies);
                }
                else if(isBookMarkMode){
                    afterRemovingItemTasks(book);
                }
                else{
                    afterRemovingItemTasks(allMovies);
                }
                removeMovieItem(i);
                formReset();
                });
        }

        else if (e.target.classList.contains('star')){
        addFavMovie(e, i, movie__Item);
        }

        else if (e.target.classList.contains('edit')){
            formReset();
            disabledBodyToggle();
            editMovieItem(movie__Item, i);
            movie__Item.id = 'editing__Mode';
            edit__Mode__Title.textContent = 'Edit';
            
        }
}

let afterRemovingItemTasks = (arr)=> {
        if(isGenreMode){
            setPagesAndSlidBar(arr)
            return    
        }
        arr.length%9===0? setPagesAndSlidBar(arr): null;
}


let disabledBodyToggle = ()=> {
    disabled__Body.classList.toggle('editing-mode-background-visible');
}
let removeMovieItem = i => {
    movieContainer.removeChild(document.querySelector(`[data-movie-id='${i}']`).parentElement);
}
let addFavMovie = (ev, i, m)=> {
    let s = getMovieItemBymovieID(allMovies, i);
    if(ev.target.textContent ==="star_border"){
            ev.target.textContent ="star";
            s.star = true;
            addMovieItemToTheArray(book, s);
            plusMark__Style.classList.add('plus-mark-style');
        
    }else if(ev.target.textContent ==="star"){
            ev.target.textContent ="star_border";
            s.star = false;
            removeMovieItemFromArr(book, i);
            if(barBar.dataset.mode === 'bookmark-mode'){
                let c = ()=>{
                    isGenreMode = barBar.classList.contains('genre-mode');
                    m.classList.remove('movie-item-rem-star');
                    m.style.display = 'none';
                    afterRemovingItemTasks(book);
                    if(isGenreMode){
                        resetClearEffect();
                    }
                   m.removeEventListener('animationend', c);
                }
                m.classList.add('movie-item-rem-star');
                m.addEventListener('animationend', c);
 
            }
    }
}
let editMovieItem = ( movie__Item, movieID) => {
    editBtn.style.display = "block";
    addBtn.style.display = "none";
    input__Movie__Name.focus();
    movie__Item.classList.add('movie-item-editing-mode-style');
    input__Movie__Name.value = movie__Item.children[0].childNodes[0].textContent;
    release__Year.value = movie__Item.children[0].childNodes[1].textContent;
    input__Director.value = movie__Item.children[1].textContent;
    let genres = returnGenres(allMovies, movieID);
    input__Check__List.forEach(el=> {
        for(let k=0; k<genres.length; k++){
            if(el.nextElementSibling.textContent === genres[k]){
                el.checked = true;
            }
        }
    });

}

let replaceEditedItem = node => {
        node.classList.remove('movie-item-editing-mode-style');
        addBtn.style.display = "block";
        editBtn.style.display = "none";
        node.children[0].childNodes[0].textContent = input__Movie__Name.value + ' ';
        node.children[0].childNodes[1].textContent = release__Year.value;
        node.children[1].textContent = input__Director.value;
        let movieID = parseInt(node.children[0].dataset.movieId);
        let newGenres = Array.from(document.querySelectorAll('input[type=checkbox]:checked~label')).map((x)=> {return x.textContent});
        let editedObj = new Movie(
            movieID,
            input__Movie__Name.value,
            input__Director.value,
            release__Year.value,
            newGenres)
        editMovieItemInTheArray(allMovies, editedObj);
        node.children[2].innerHTML = addMovieItemGenres(editedObj);
}
let replaceEditedItemComponenet = (editing__Mode__Item) =>{
            replaceEditedItem(editing__Mode__Item);
            formReset();
            editing__Mode__Item.id = "";
            getRandomBackgroundColor();
}


let formReset = ()=> {
    input__Movie__Name.value="" 
    input__Director.value="";
    release__Year.value ="";
    let d = document.querySelectorAll('input[type=checkbox]:checked');
    d.forEach(el =>{
        el.checked= false;
    })
}


let getBookMarks = (t)=> {
    t.textContent = (t.textContent==='bookmark_border')? 'bookmark':'bookmark_border';
    let b = false, i=0;
    t.textContent === 'bookmark'? b = true : b;
    if(b){
        barBar.setAttribute('data-mode', 'bookmark-mode');
        allMovies.forEach(x => {
            resetItem(x.movieID, 'none');
            if(x.star) book[i++] = x;
        });
        setPagesAndSlidBar(book);
    }
    else{
        barBar.dataset.mode = '';
        allMovies.forEach(x => {
            resetItem(x.movieID, 'none');
        });
        setPagesAndSlidBar(allMovies);
    }
}

let setPagesAndSlidBar = (arr)=> {
        setPages(arr);
        setTabBars(arr);
}
let resetClearEffect = ()=> {
    clearAll__Btn.style.visibility = 'hidden';
    barBar.classList.remove('genre-mode');
    currentTagEffect(false);
}







let init = ()=>{
    for(let i=0; i<allMovies.length; i++){
        let itemDelay = ((i/allMovies.length)+1) * 50;
        addMovieItem(allMovies[i], itemDelay)
    }
    setPagesAndSlidBar(allMovies)
    addBtn.addEventListener('click', ()=> {
        getNewMovie()
    })

    editBtn.addEventListener('click', ()=> {
        replaceEditedItemComponenet(document.getElementById('editing__Mode'));
        disabledBodyToggle();
        edit__Mode__Title.textContent = 'Add';
    })
    barBar.addEventListener('click', (ev)=> {
        isBookMarkMode = barBar.dataset.mode === 'bookmark-mode';
        isGenreMode = barBar.classList.contains('genre-mode');
        if(ev.target.classList.contains('inner-bars')){
            if(isGenreMode){
                     displayPage(genresDisplay, ev.target);
            }
            else if(!isBookMarkMode){
                    displayPage(allMovies, ev.target);
            }
            else{
                
                    displayPage(book, ev.target);
            }
        }
    });
    help__Bar.addEventListener('click', (e)=> {
        isGenreMode = barBar.classList.contains('genre-mode');
        if(((e.target.id ==='bookmark_border') || (e.target.id === 'bookmark')) && (allMovies.length !== 0)){
            getBookMarks(e.target);
            getRandomBackgroundColor();
            if(isGenreMode){
                resetClearEffect();
            }
        }
    })
    clearAll__Btn.addEventListener('click', ()=> {
        isBookMarkMode = barBar.dataset.mode === 'bookmark-mode';
        resetClearEffect();
        isBookMarkMode?    setPagesAndSlidBar(book)   :   setPagesAndSlidBar(allMovies);
    })
    plusMark__Style.addEventListener('animationend', ()=> {
        plusMark__Style.classList.remove('plus-mark-style');
    })
}

export default init;