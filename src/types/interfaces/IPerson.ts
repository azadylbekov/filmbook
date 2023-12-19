export interface IPerson {
  id: number;
  name: string;
  profile_path: string;
  known_for_department: string;
  birthday: string;
  deathday?: string;
  place_of_birth?: string;
  character?: string;
  biography?: string;
}