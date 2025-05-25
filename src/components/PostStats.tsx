import { createResource } from "solid-js";
import { Show, Suspense } from "solid-js";
import { Skeleton } from "@hope-ui/solid";
import PostChart from "./PostChart";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

interface UserPostStat {
  id: number;
  name: string;
  username: string;
  postCount: number;
}

const PostStats = () => {
  const fetchPosts = async (): Promise<Post[]> => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      if (!response.ok) throw new Error('Failed to fetch posts');
      return await response.json();
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  };

  const fetchUsers = async (): Promise<User[]> => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) throw new Error('Failed to fetch users');
      return await response.json();
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  };

  const [posts] = createResource(fetchPosts);
  const [users] = createResource(fetchUsers);

  const userPostStats = (): UserPostStat[] => {
    const postsData = posts();
    const usersData = users();
    if (!postsData || !usersData) return [];

    const stats = usersData.map((user: User): UserPostStat => ({
      id: user.id,
      name: user.name,
      username: user.username,
      postCount: postsData.filter((post: Post) => post.userId === user.id).length
    }));

    return stats.sort((a, b) => b.postCount - a.postCount);
  };

  return (
    <Suspense fallback={<Skeleton height="500px" />}>
      <Show when={posts() && users()}>
        <PostChart data={userPostStats()} />
      </Show>
    </Suspense>
  );
};

export default PostStats;