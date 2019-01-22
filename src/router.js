import Vue from "vue";
import Router from "vue-router";
import Movie from "./views/Movie.vue";
import City from "./views/City.vue";

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
      component: Movie
    },
    {
      path: "/city",
      name: "City",
      component: City
    },
    {
      path: "/cinema",
      name: "Cinema",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Cinema.vue")
    }
  ]
});
