import { IPokemon, INamedApiResourceList, IPokemonSpecies, IEvolutionChain } from 'pokeapi-typescript'
import { get, set } from 'idb-keyval';

const BASE_URL = "https://pokeapi.co/api/v2";

interface Pagination {
  offset?: number
  limit?: number
}


type APIResource = IPokemon | INamedApiResourceList<IPokemon> | IPokemonSpecies | IEvolutionChain;

const buildPagination = (pagination?: Pagination): string => {
  if (!pagination) {
    return '';
  }
  const { limit = 20, offset = 0 } = pagination;
  return `?limit=${limit}&offset=${offset}`;
}

async function GET(uri: string, pagination?: Pagination): Promise<APIResource> {
  const headers = new Headers();
  headers.append('accept', 'application/json');
  headers.append('content-type', 'application/json');

  let queryString = '';

  if (pagination) {
    queryString = buildPagination(pagination);
  }

  const resource = `${uri}${queryString}`;

  const cachedResponse = await get(resource);

  if (cachedResponse) {
    return cachedResponse;
  }

  const response = await fetch(`${BASE_URL}/${resource}`, { headers });
  const data = await response.json();

  await set(resource, data);

  return data;
}

export async function getPokemonByIdOrName(identifier: string | number): Promise<IPokemon> {
  const URI = `pokemon/${identifier}`;
  const data = await GET(URI) as IPokemon;
  return data;
}

export async function getPokemonResourceList(pagination?: Pagination): Promise<INamedApiResourceList<IPokemon>> {
  const URI = `pokemon`;
  const data = await GET(URI, pagination) as INamedApiResourceList<IPokemon>;
  return data;
}

export async function getPokemonSpecies(identifier: string | number): Promise<IPokemonSpecies> {
  const URI = `pokemon-species/${identifier}`;
  const data = await GET(URI) as IPokemonSpecies;
  return data;
}

export async function getEvolutionChain(identifier: string | number): Promise<IEvolutionChain> {
  const URI = `evolution-chain/${identifier}`;
  const data = await GET(URI) as IEvolutionChain;
  return data;
}

export async function getPokemon(pagination?: Pagination): Promise<IPokemon[]> {
  const { results } = await getPokemonResourceList(pagination) as INamedApiResourceList<IPokemon>;
  const requests = results.map(({name}) => getPokemonByIdOrName(name));
  return Promise.all(requests);
}
