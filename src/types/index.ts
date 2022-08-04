export interface Character {
  comics: any;
  description: string;
  events: any;
  id: number;
  modified: string;
  name: string;
  resourceURI: string;
  thumbnail: { extension: string; path: string };
  urls: { type: string; url: string }[];
}

export interface CharactersResponse {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: Character[];
}
