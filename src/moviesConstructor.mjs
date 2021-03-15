
class Movie{
    constructor(movieID, name, director, year, genres, star){
        this.movieID = movieID;
        this.name = name;
        this.director = director;
        this.year = year;
        this.genres = genres;
        this.star = star;
    }

}

let allMovies = [
    new Movie(0, "Taxi Driver", "Martin Scorsese", 1976, ["Drama", "Crime"], true),
    new Movie(1, "The Deer Hunter", "Michael Cimino", 1978, ["Drama", "War"], true),
    new Movie(2, "The Wolf of Wall Street", "Martin Scorsese", 2013, ["Crime", "Drama"], false),
    new Movie(3, "12 Angry Men", "Sidney Lumet", 1957, ["Crime", "Drama"], true),
    new Movie(4, "City of God", "Fernando Meirelless", 2002, ["Crime", "Drama"], true),
    new Movie(5, "Psycho", "Alfred Hitchcock", 1960, [ "Horror", "Mystery", "Thriller"], true),
    new Movie(6, "Vertigo", "Alfred Hitchcock", 1958, [ "Romance", "Mystery", "Thriller"], true),
    new Movie(7, "North by Northwest", "Alfred Hitchcock", 1959, [ "Mystery", "Thriller"], false),
    new Movie(8, "Rear Window", "Alfred Hitchcock", 1954, [ "Mystery", "Thriller"], true),
    new Movie(9, "Shadow of a Doubt", "Alfred Hitchcock", 1943, [ "Thriller"], false),
    new Movie(10, "Notorious", "Alfred Hitchcock", 1946, [ "Drama", "Romance"], true),
    new Movie(11, "Strangers on a Train", "Alfred Hitchcock", 1951, [ "Crime", "Thriller"], true),
    new Movie(12, "Dial M for Murder", "Alfred Hitchcock", 1954, ["Crime", "Thriller"], true),
    new Movie(13, "2001: A Space Odyssey", "Stanley Kubrick", 1968, [ "Crime", "Drama","Science Fiction"], true),
    new Movie(14, "A Clockwork Orange", "Stanley Kubrick", 1971, [ "Mystery", "Thriller"], true),
    new Movie(15, "Full Metal Jacket", "Stanley Kubrick", 1987, ["Drama", "War"], true),
    new Movie(16, "Reservoir Dogs", "Quentin Tarantino", 1992, [ "Crime", "Drama", "Thriller"], true),
    new Movie(17, "Jackie Brown", "Quentin Tarantino", 1997, [ "Crime", "Drama", "Thriller"], true),
    new Movie(18, "Goodfellas", "Martin Scorsese", 1990, ["Crime", "Drama"], true),
    new Movie(19, "Raging Bull", "Martin Scorsese", 1980, [ "Drama"], false),
    new Movie(20, "Incendies", "Denis Villeneuve", 2010, [ "Mystery", "Drama", "War"], true),
    new Movie(21, "Enemy", "Denis Villeneuve", 2013, [ "Mystery", "Thriller"], false),
    new Movie(22, "Parasite", "Bong Joon Ho", 2019, [ "Comedy", "Drama", "Thriller"], true),
    new Movie(23, "3-Iron", "Ki-duk Kim", 2004, [ "Crime", "Drama", "Romance"], false),
    new Movie(24, "Casino", "Martin Scorsese", 1995, [ "Crime", "Drama"], true),
    new Movie(25, "Dunkirk", "Christopher Nolan", 2017, [ "Action", "Drama", "History"], false),
    new Movie(26, "Inception", "Christopher Nolan", 2010, [ "Action", "Science Fiction"], false),
    new Movie(27, "1917", "Sam Mendes", 2019, [ "War", "Drama"], false),
    new Movie(28, "Braveheart", "Mel Gibson", 1995, [ "Drama", "History"], true),
    new Movie(29, "12 Years a Slave", "Steve McQueen", 2013, [ "Drama", "History"], false),
    new Movie(30, "The Good, the Bad and the Ugly", "Sergio Leone", 1966, [ "Western"], true),
    new Movie(31, "Red River", "Howard Hawks", 1948, [ "Drama", "Action", "Western"], true),
    new Movie(32, "War Dogs", "Todd Phillips", 2016, [ "Comedy", "Crime"], false),
    new Movie(33, "Anomalisa", "Duke Johnson", 2015, [ "Animation", "Comedy", "Drama"], false),
]

for(let i=0; i<allMovies.length; i++){
    allMovies[i].movieID = i
}

let addMovieItemToTheArray = (arr, obj)=>{
    arr = arr.push(obj)
}

let removeMovieItemFromArr = (arr, movieID)=> {
    for(let i=0; i<arr.length; i++){
        if(arr[i].movieID === movieID){
            arr.splice(i, 1)
        }
    }
}


let returnGenres = (arr, movieID)=> {
    for(let i=0; i<arr.length; i++){
        if(arr[i].movieID === movieID){
            return arr[i].genres
        }
    }
}

let getMovieItemBymovieID = (arr, movieID)=> {
    for(let i =0; i<arr.length; i++){
        if(arr[i].movieID === movieID){
            return arr[i]
        }
    }
}

let editMovieItemInTheArray = (arr, editedObj)=> {
    let oldVersion = getMovieItemBymovieID(arr, editedObj.movieID);
    oldVersion.movieID = editedObj.movieID;
    oldVersion.name = editedObj.name;
    oldVersion.director = editedObj.director;
    oldVersion.year = editedObj.year;
    oldVersion.genres = editedObj.genres;
}


export default Movie;
export {allMovies,
        addMovieItemToTheArray,
        removeMovieItemFromArr, 
        returnGenres, 
        getMovieItemBymovieID, 
        editMovieItemInTheArray}