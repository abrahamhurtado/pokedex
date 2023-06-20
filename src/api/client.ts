import { IPokemon, INamedApiResourceList } from 'pokeapi-typescript'
import { get, set } from 'idb-keyval';

const BASE_URL = "https://pokeapi.co/api/v2";

interface Pagination {
  offset?: number
  limit?: number
}


type APIResource = IPokemon | INamedApiResourceList<IPokemon>

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

  const response = await fetch(`${BASE_URL}/${uri}`, { headers });
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
