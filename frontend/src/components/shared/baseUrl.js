import isProd from "./ProdDetect";

let baseUrl = '';
if (isProd()) {
    baseUrl = 'http://news-management.vritat.com:8000';
} else {
    baseUrl = 'http://localhost:8000';
}

export default baseUrl;