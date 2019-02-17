import Vue from "vue";
import Router from "vue-router";
import Movie from "@/views/Movie.vue";
import City from "@/views/City.vue";
import Search from "@/views/Search.vue";
import MovieDetailAndCinemas from "@/views/MovieDetailAndCinemas";
import Login from "@/views/Login";
import Mine from "@/views/Mine";
import Shows from "@/views/Shows";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/movie"
    },
    {
      path: "/movie",
      name: "Movie",
      component: Movie,
      meta: {
        showMainNav: true
      }
    },
    {
      path: "/city",
      name: "City",
      component: City
    },
    {
      path: "/search",
      name: "Search",
      component: Search
    },
    {
      path: "/movieDetailAndCinemas/:id",
      name: "MovieDetailAndCinemas",
      component: MovieDetailAndCinemas
    },
    {
      path: "/shows/:id",
      name: "Shows",
      component: Shows
    },
    {
      path: "/cinema",
      name: "Cinema",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "@/views/Cinema.vue"),
      meta: {
        showMainNav: true
      }
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/mine",
      name: "mine",
      component: Mine,
      meta: {
        showMainNav: true
      }
    }
  ]
});
