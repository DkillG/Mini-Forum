/* eslint-disable @typescript-eslint/no-explicit-any */

import { PostDTO } from '../dtos/postDTO';
import { Result } from '@/shared/core/Result';
import { left, right } from '@/shared/core/Either';
import { BaseAPI } from '@/shared/infrastructure/services/BaseAPI';
import { APIResponse } from '@/shared/infrastructure/services/APIResponse';

export interface IPostService {
	getRecentPosts(slugId?: string, offset?: number): Promise<APIResponse<PostDTO[]>>;
	createPost(title: string, text: string): Promise<APIResponse<void>>;
}

export class PostService extends BaseAPI implements IPostService {
	constructor() {
		super();
	}

	public async getRecentPosts(
    slugId?: string,
		offset?: number,
	): Promise<APIResponse<PostDTO[]>> {
		try {
			const response = await this.get('/post', { params: { slugId, offset } });
			const data: PostDTO[] = response.data.posts;

			return right(Result.ok<PostDTO[]>(data));
		} catch (error: any) {
			return left(
				error.response ? error.response.data.message : 'Connection failed'
			);
		}
	}

	public async createPost(
		title: string,
		text: string
	): Promise<APIResponse<void>> {
		try {
			await this.post('/post', { title, text });
			return right(Result.ok<void>());
		} catch (error: any) {
			return left(error.response ? error.response : 'Connection failed');
		}
	}
}
