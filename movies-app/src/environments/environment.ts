import { LocalizedString } from "@angular/compiler";

export const environment = {
    type: "development",
    apiURL: 'https://api.themoviedb.org/3/',
    apiToken: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMGE1YmIzMGIzOWZlYTkyOWI2ZDExOGMwZjIwYTRlNCIsInN1YiI6IjY1OTdkY2QwZDdhNzBhMTJmZjY5Y2JmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nr05uS7Jl-APd0eZBDNKgyXdfgPZnQzRaPi9kq-jiI8',
    sortBy: 'popularity.desc',
    backend:{
        signupURL:"http://localhost:8080/user/signup",
        loginURL: "http://localhost:8080/user/login",
        logoutURL: "http://localhost:8080/user/logout",
        refreshURL:"http://localhost:8080/user/refresh",
        movieURl: "http://localhost:8082/movie/",
        pageURL: "http://localhost:8082/movies"

    }
};
