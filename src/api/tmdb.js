import axios from "axios";

const accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NDBhYWJjZTBmMDY1OTUwOGU0NDE5OGM4YWUyNjYzOCIsIm5iZiI6MTc2NDExODE1NS40NTI5OTk4LCJzdWIiOiI2OTI2NGU4YmFmYTY3NmQzYzUyNDhiMmEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.UlaFURhKHip-dupiQ74woKaTWk01c8YOw-JskZgV3ro";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
});

export async function getPopular(page = 1) {
  const res = await api.get(`/movie/popular?page=${page}`);
  return res.data;
}

export async function searchMovies(query, page = 1) {
  const res = await api.get(
    `/search/movie?query=${encodeURIComponent(query)}&page=${page}`
  );
  return res.data;
}

export async function getGenres() {
  const res = await api.get(`/genre/movie/list`);
  return res.data.genres;
}

export async function getMovieDetails(id) {
  const res = await api.get(`/movie/${id}`);
  return res.data;

}
