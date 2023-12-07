import axios from "axios";

const READ_TOKEN =
"eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNzNkMDZkZjFkMThjOTRkMWNlN2RlNDY2NTBhMjliMyIsInN1YiI6IjYxMDI3M2EyZGI3MmMwMDA1ZDhjZjU1ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jtA3uWYK6e2hTGp1HJLEOJvqRi66r-xLTYRQnZMW4c4";
const API_URL = "https://api.themoviedb.org/3/";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
		"Content-Type": "application/json",
		"Authorization": `Bearer ${READ_TOKEN}`,
	},
});