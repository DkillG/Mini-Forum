import { CreatePost } from './CreatePost';
import { postRepo } from '@/modules/forum/repos';
import { CreatePostController } from './CreatePostController';

const createPost = new CreatePost(postRepo);
const createPostController = new CreatePostController(createPost);

export { createPost, createPostController };
