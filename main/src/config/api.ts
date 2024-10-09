const isProduction = process.env.NODE_ENV === 'production';

const devApiConfig = {
	baseUrl: 'http://localhost:3000/api'
};

const prodApiConfig = {
	baseUrl: 'https://mini-forum.vercel.app/api'
};

const apiConfig = isProduction ? prodApiConfig : devApiConfig;

export { apiConfig };
