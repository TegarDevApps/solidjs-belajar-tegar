import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";

const Todolist = () => {
  return (
    <div class="flex h-screen bg-gray-50">
      <Sidebar />
      <div class="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main class="flex-1 overflow-y-auto p-5">
          <div class="max-w-7xl mx-auto">
            <div class="mb-8">
              <h1 class="text-3xl font-semibold text-gray-800">Todolist</h1>
              <p class="text-gray-600 mt-2">
                Here is the information about your activity and mental condition. How to relieve stress? How to be patient? You will find everything here!
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Todolist;