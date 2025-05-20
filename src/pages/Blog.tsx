import { createSignal } from "solid-js";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import ArticleCard from "../components/ArticleCard";
import CategoryCard from "../components/CategoryCard";
import Pagination from "../components/Pagination";

const Blog = () => {
  const [articles, setArticles] = createSignal([
    {
      id: 1,
      title: "5 Simple Keys to Helping Your Partner Feel Heard",
      category: "Relationships",
      readTime: "20 mins read",
      author: {
        name: "Dr. Ben Affleck",
        avatar: "/assets/images/dummy.jpg",
        postedOn: "Apr 23, 2025",
      },
      excerpt: "Your relationship partner needs to feel understood. Being a better listener is the secret to deeper connection.",
      image: "/assets/images/dummy.jpg",
    },
    {
      id: 2,
      title: "Why We Feel Post-Pandemic Burnout and Exhaustion",
      category: "Burnout",
      readTime: "15 mins read",
      author: {
        name: "Dr. Nick Wildman",
        avatar: "/assets/images/dummy.jpg",
        postedOn: "Apr 21, 2025",
      },
      excerpt: "Do less. Take a walk. Look up at trees. Soak in the silence. The energy bandwidth the body and mind need to recover.",
      image: "/assets/images/dummy.jpg",
    },
    {
      id: 3,
      title: "Is Emotion Regulation the Key to Addiction Prevention?",
      category: "Emotions",
      readTime: "18 mins read",
      author: {
        name: "Dr. Sarah Legend",
        avatar: "/assets/images/dummy.jpg",
        postedOn: "Apr 20, 2025",
      },
      excerpt: "Your relationship partner needs to feel understood. Being a better listener is the secret to deeper connection.",
      image: "/assets/images/dummy.jpg",
    },
    {
      id: 4,
      title: "When You're Exhausted, Try These 3 Uplifting Thoughts",
      category: "Stress",
      readTime: "12 mins read",
      author: {
        name: "Dr. Evan Peters",
        avatar: "/assets/images/dummy.jpg",
        postedOn: "Apr 19, 2025",
      },
      excerpt: "How to change your perspective on yourself and your problems.",
      image: "/assets/images/dummy.jpg",
    },
    {
      id: 5,
      title: "Edible Flowers That Are Good for the Body and Brain",
      category: "Health",
      readTime: "10 mins read",
      author: {
        name: "Dr. Sam Cooper",
        avatar: "/assets/images/dummy.jpg",
        postedOn: "Apr 18, 2025",
      },
      excerpt: "Edible flowers taste great, look beautiful on your plate, and are packed with nutrients.",
      image: "/assets/images/dummy.jpg",
    },
    {
      id: 6,
      title: "Exercise More by Making It Easier—Yes, Easier",
      category: "Health",
      readTime: "15 mins read",
      author: {
        name: "Dr. Kelly Adams",
        avatar: "/assets/images/dummy.jpg",
        postedOn: "Apr 17, 2025",
      },
      excerpt: "How you start to create a program of regular exercise with no excuses? Maybe you are setting unrealistic goals.",
      image: "/assets/images/dummy.jpg",
    },
  ]);

  const [categories, setCategories] = createSignal([
    {
      id: 1,
      name: "Sleep",
      count: 25,
      image: "/assets/images/dummy.jpg",
    },
    {
      id: 2,
      name: "Stress",
      count: 19,
      image: "/assets/images/dummy.jpg",
    },
    {
      id: 3,
      name: "Mindfulness",
      count: 28,
      image: "/assets/images/dummy.jpg",
    },
  ]);

  const [currentPage, setCurrentPage] = createSignal(2);
  const totalPages = 30;

  return (
    <div class="flex h-screen bg-gray-50">
      <Sidebar />
      <div class="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main class="flex-1 overflow-y-auto p-5">
          <div class="max-w-7xl mx-auto">
            <div class="mb-8">
              <h1 class="text-3xl font-semibold text-gray-800">Blog</h1>
              <p class="text-gray-600 mt-2">
                Here is the information about your activity and mental condition. How to relieve stress? How to be patient? You will find everything here!
              </p>
            </div>

            {/* Top Categories */}
            <div class="mb-8">
              <div class="flex justify-between items-center mb-4">
                <div class="flex items-center">
                  <h2 class="text-xl font-semibold text-gray-800">Top categories</h2>
                  <span class="ml-2 bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs">10</span>
                </div>
                <button class="text-blue-500 flex items-center text-sm">
                  See all
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                {categories().map((category) => (
                  <CategoryCard
                    name={category.name}
                    count={category.count}
                    image={category.image}
                  />
                ))}
              </div>
            </div>

            {/* Articles */}
            <div class="mb-8">
              <div class="flex justify-between items-center mb-4">
                <div class="flex items-center">
                  <h2 class="text-xl font-semibold text-gray-800">Articles</h2>
                  <span class="ml-2 bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs">286</span>
                </div>
                <div class="flex items-center space-x-2">
                  <div class="relative">
                    <button class="flex items-center text-sm text-gray-600 border border-gray-300 rounded-md px-3 py-1.5">
                      Sort by
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                  <button class="flex items-center justify-center h-8 w-8 bg-gray-100 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </button>
                </div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles().map((article) => (
                  <ArticleCard
                    title={article.title}
                    category={article.category}
                    readTime={article.readTime}
                    author={article.author}
                    excerpt={article.excerpt}
                    image={article.image}
                  />
                ))}
              </div>
            </div>

            {/* Pagination */}
            <Pagination 
              currentPage={currentPage()} 
              totalPages={totalPages} 
              onPageChange={setCurrentPage} 
            />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Blog;