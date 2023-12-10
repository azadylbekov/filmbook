export interface IGenre {
	id: number,
	name: string,
}

export interface IProductionCompany {
	origin_country: string,
}

export interface IMovie {
	id: number,
	tagline: string;
  vote_average: string;
  genres: IGenre[];
  status: string;
  overview: string;
  homepage: string;
	title: string;
	release_date: string;
	production_companies: IProductionCompany[];
	runtime: string;
	budget: number;
	original_title?: string,
	poster_path?: string
}

export interface IMovies { 
	results: IMovie[]
}


export interface IShow {
	id: number,
	poster_path?: string,
  tagline: string;
  vote_average: string;
  genres: IGenre[];
  status: string;
  overview: string,
  homepage: string,
	name: string,
	first_air_date: string,
	origin_country: [],
	episode_run_time: [],
	number_of_seasons: number,
	number_of_episodes: number,
}

export interface IPerson {
	id: number,
	name: string,
	profile_path: string,
	known_for_department: string,
	birthday: string,
	deathday?: string,
	place_of_birth?: string,
	character?: string,
}