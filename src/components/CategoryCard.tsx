type CategoryCardProps = {
  name: string;
  count: number;
  image: string;
};

const CategoryCard = (props: CategoryCardProps) => {
  return (
    <div class="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-300">
      <div class="flex items-center p-4">
        <div class="flex-shrink-0">
          <img
            class="h-12 w-12 rounded-full object-cover"
            src={props.image}
            alt={props.name}
            onError={(e) => {
              e.currentTarget.src = "/assets/images/dummy.jpg";
            }}
          />
        </div>
        <div class="ml-4">
          <h3 class="text-lg font-medium text-gray-900">{props.name}</h3>
          <div class="flex items-center text-sm text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            {props.count} articles
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;