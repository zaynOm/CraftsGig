let BASE_URL;
if (import.meta.env.PROD) {
  BASE_URL = import.meta.env.VITE_API_URL;
}
if (import.meta.env.DEV) {
  BASE_URL = import.meta.env.VITE_API_URL;
}

export default BASE_URL;
