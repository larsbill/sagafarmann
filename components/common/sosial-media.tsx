import { SosialMediaPost } from "@/types/sosialmedia";
import { use } from "react";


type SosialMediaProps = {
  posts: Promise<SosialMediaPost[]>;
};

export default function SosialMedia({ posts }: SosialMediaProps) {
  const allPosts = use(posts);

  return (
    <div>
      {allPosts.map((post) => (
        <div key={post.id} className="mb-6">
          <a href={post.url} target="_blank" rel="noopener noreferrer" className="text-xl font-bold text-blue-600 hover:underline">
            {post.title}
          </a>
          <p className="mt-2 text-gray-700">{post.description}</p>
        </div>
      ))}
    </div>
  );
}