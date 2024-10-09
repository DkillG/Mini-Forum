import { NextRequest, NextResponse } from 'next/server';
import { createPostController } from '@/modules/forum/useCases/post/createPost';
import { getRecentPostsController } from '@/modules/forum/useCases/post/getRecentPosts';

export const POST = async (req: NextRequest, res: NextResponse) =>
	createPostController.execute(req, res);
export const GET = async (req: NextRequest, res: NextResponse) =>
	getRecentPostsController.execute(req, res);
