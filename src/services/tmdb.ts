import axios from "axios";
import { TMDB_BEARER_TOKEN } from "react-native-dotenv";

const BASE = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

export const posterUrl = (path: string | null) =>
  path ? `${IMAGE_BASE}${path}` : null;

export const tmdb = axios.create({
  baseURL: BASE,
  headers: {
    Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
    "Content-Type": "application/json;charset=utf-8",
  },
  params: { language: "en-US" },
});

export const fetchPopular = (page = 1) =>
  tmdb.get("/movie/popular", { params: { page } }).then((r) => r.data);

export const searchMovies = (query: string, page = 1) =>
  tmdb.get("/search/movie", { params: { query, page } }).then((r) => r.data);

export const fetchMovieDetails = (movieId: number) =>
  tmdb
    .get(`/movie/${movieId}`, { params: { append_to_response: "credits" } })
    .then((r) => r.data);
