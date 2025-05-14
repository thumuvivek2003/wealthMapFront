
// Store API keys in a central location
let mapboxToken: string | null = localStorage.getItem('mapbox_token');

export const getMapboxToken = (): string | null => {
  return mapboxToken;
};

export const setMapboxToken = (token: string): void => {
  mapboxToken = token;
  localStorage.setItem('mapbox_token', token);
};
