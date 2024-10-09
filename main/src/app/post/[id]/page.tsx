
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import Layer from "@/components/utils/Layer";
import { PostDTO } from "@/modules/forum/dtos/postDTO";
import { postService } from "@/modules/forum/services";

const Post = async ({ params: { id } }: { params: { id: string } }) => {

	const posts: PostDTO[] = [];
	const rawPosts = await postService.getRecentPosts(id);

	if (rawPosts.isRight()) posts.push(...rawPosts.value.getValue);
	else return redirect('/404');

	const post = posts[0];

	return <Layer>
		<div className="flex flex-col gap-y-8">
			<Link href={'/'} className="underline underline-offset-2">
				Back to posts
			</Link>
			<div className="container">
				<div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-8">
					<div className="flex p-4">
						<div className="flex flex-col items-center mr-4">
							<button className="text-gray-400 hover:text-blue-500 focus:outline-none">
								<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
								</svg>
							</button>
							<span className="font-bold text-gray-700 dark:text-gray-300 my-2">15.2k</span>
							<button className="text-gray-400 hover:text-red-500 focus:outline-none">
								<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
								</svg>
							</button>
						</div>
						<div className="flex-grow">
							<h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{post.title}</h1>
							<div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
								<span>Publicado por u/usuario123</span>
								<span>•</span>
								<span>hace 5 horas</span>
							</div>
						</div>
					</div>
					<div className="px-4 pb-4">
						<p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
							{post.text}
						</p>
					</div>
					<div className="flex justify-between px-4 py-2 border-t border-gray-200 dark:border-gray-700">
						<button className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none">
							<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
							</svg>
							<span>256 comentarios</span>
						</button>
						<button className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none">
							<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
							</svg>
							<span>Compartir</span>
						</button>
					</div>
				</div>
				<div className="space-y-4">
					<h2 className="text-xl font-bold text-gray-900 dark:text-white">Comentarios</h2>
					{[1, 2, 3].map((comment) => (
						<div key={comment} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
							<div className="flex items-center space-x-4 mb-2">
								<div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 overflow-hidden">
									<Image src={`https://i.pravatar.cc/150?img=${comment}`} alt="Avatar" width={150} height={150} className="w-full h-full object-cover" />
								</div>
								<div>
									<p className="font-semibold text-gray-900 dark:text-white">usuario_comentario{comment}</p>
									<p className="text-sm text-gray-500 dark:text-gray-400">hace {comment} hora(s)</p>
								</div>
							</div>
							<p className="text-gray-700 dark:text-gray-300 mb-2">
								Este es el contenido del comentario {comment}. Los usuarios pueden discutir sobre el post aquí.
							</p>
							<div className="flex items-center space-x-2">
								<button className="text-gray-400 hover:text-blue-500 focus:outline-none">
									<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
									</svg>
								</button>
								<span className="text-gray-600 dark:text-gray-400">42</span>
								<button className="text-gray-400 hover:text-red-500 focus:outline-none">
									<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
									</svg>
								</button>
								<button className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none">
									Responder
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	</Layer>


};

export default Post;
