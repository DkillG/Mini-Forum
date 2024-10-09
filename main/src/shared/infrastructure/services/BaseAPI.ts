/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiConfig } from '@/config/api';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export abstract class BaseAPI {
	protected baseUrl: string;
	private axiosInstance: AxiosInstance;

	constructor() {
		this.baseUrl = apiConfig.baseUrl;
		this.axiosInstance = axios.create({
			baseURL: this.baseUrl
		});
	}

	protected get(url: string, config?: AxiosRequestConfig<any> | undefined) {
		return this.axiosInstance.get(url, config);
	}

	protected post(
		url: string,
		data?: any,
		config?: AxiosRequestConfig<any> | undefined
	) {
		return this.axiosInstance.post(url, data, config);
	}
}
