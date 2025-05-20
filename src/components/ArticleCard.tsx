type Author = {
  name: string;
  avatar: string;
  postedOn: string;
};

type ArticleCardProps = {
  title: string;
  category: string;
  readTime: string;
  author: Author;
  excerpt: string;
  image: string;
};

const ArticleCard = (props: ArticleCardProps) => {
  return (
    <div class="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-300">
      <div class="relative">
        <img
          src={props.image}
          alt={props.title}
          class="w-full h-48 object-cover"
          onError={(e) => {
            e.currentTarget.src = "/assets/images/dummy.jpg";
          }}
        />
        <div class="absolute top-4 left-4">
          <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white text-gray-800">
            {props.category}
          </span>
        </div>
      </div>
      <div class="p-5">
        <div class="flex items-center text-sm text-gray-500 mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {props.readTime}
        </div>
        <h3 class="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{props.title}</h3>
        <p class="text-gray-600 text-sm mb-4 line-clamp-2">{props.excerpt}</p>
        <div class="flex items-center mt-4">
          <img
            class="h-8 w-8 rounded-full object-cover"
            src={props.author.avatar}
            alt={props.author.name}
            onError={(e) => {
              e.currentTarget.src = "/assets/images/dummy.jpg";
            }}
          />
          <div class="ml-3">
            <p class="text-sm font-medium text-gray-900">{props.author.name}</p>
            <p class="text-xs text-gray-500">{props.author.postedOn}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;