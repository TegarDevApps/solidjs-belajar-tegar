import { createSignal, For } from "solid-js";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";

type Priority = "low" | "medium" | "high";

type Todo = {
  id: number;
  title: string;
  description: string;
  priority: Priority;
  due_date: string | null;
  is_completed: boolean;
};

const initialTodos: Todo[] = [
  {
    id: 1,
    title: "Complete project documentation",
    description: "Write comprehensive documentation for the new project",
    priority: "high",
    due_date: "2024-12-31 17:00:00",
    is_completed: false,
  },
  {
    id: 2,
    title: "Review code changes",
    description: "Review pull requests from team members",
    priority: "medium",
    due_date: "2024-12-25 12:00:00",
    is_completed: false,
  },
  {
    id: 3,
    title: "Setup development environment",
    description: "Configure local development environment for new project",
    priority: "low",
    due_date: null,
    is_completed: false,
  },
  {
    id: 4,
    title: "Team meeting preparation",
    description: "Prepare agenda and materials for weekly team meeting",
    priority: "medium",
    due_date: "2024-12-24 09:00:00",
    is_completed: false,
  },
];

const Todolist = () => {
  const [todos, setTodos] = createSignal<Todo[]>(initialTodos);
  const [isAddModalOpen, setAddModalOpen] = createSignal(false);
  const [isEditModalOpen, setEditModalOpen] = createSignal(false);
  const [editTodoId, setEditTodoId] = createSignal<number | null>(null);

  // Form states for add
  const [newTitle, setNewTitle] = createSignal("");
  const [newDescription, setNewDescription] = createSignal("");
  const [newPriority, setNewPriority] = createSignal<Priority>("medium");
  const [newDueDate, setNewDueDate] = createSignal("");

  // Form states for edit
  const [editTitle, setEditTitle] = createSignal("");
  const [editDescription, setEditDescription] = createSignal("");
  const [editPriority, setEditPriority] = createSignal<Priority>("medium");
  const [editDueDate, setEditDueDate] = createSignal("");

  // Count todos by priority
  const totalPriority = (level: Priority) =>
    todos().filter((t) => t.priority === level).length;

  // Add todo
  const addTodo = () => {
    if (!newTitle().trim()) {
      alert("Title is required");
      return;
    }
    const newTodo: Todo = {
      id: Date.now(),
      title: newTitle(),
      description: newDescription(),
      priority: newPriority(),
      due_date: newDueDate() ? newDueDate() + " 00:00:00" : null,
      is_completed: false,
    };
    setTodos([newTodo, ...todos()]);
    setAddModalOpen(false);
    // Reset form
    setNewTitle("");
    setNewDescription("");
    setNewPriority("medium");
    setNewDueDate("");
  };

  // Delete todo
  const deleteTodo = (id: number) => {
    if (confirm("Are you sure want to delete this todo?")) {
      setTodos(todos().filter((t) => t.id !== id));
    }
  };

  // Open edit modal and set form values
  const openEditModal = (todo: Todo) => {
    setEditTodoId(todo.id);
    setEditTitle(todo.title);
    setEditDescription(todo.description);
    setEditPriority(todo.priority);
    setEditDueDate(todo.due_date ? todo.due_date.split(" ")[0] : "");
    setEditModalOpen(true);
  };

  // Save edited todo
  const saveEditTodo = () => {
    if (!editTitle().trim()) {
      alert("Title is required");
      return;
    }
    setTodos(
      todos().map((t) =>
        t.id === editTodoId()
          ? {
              ...t,
              title: editTitle(),
              description: editDescription(),
              priority: editPriority(),
              due_date: editDueDate() ? editDueDate() + " 00:00:00" : null,
            }
          : t
      )
    );
    setEditModalOpen(false);
  };

  // Toggle todo completion
  const toggleComplete = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, is_completed: !todo.is_completed } : todo
      )
    );
  };

  return (
    <div class="flex h-screen bg-gray-50">
      <Sidebar />
      <div class="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main class="flex-1 overflow-y-auto p-5">
          <div class="max-w-7xl mx-auto">
            <div class="mb-6">
              <h1 class="text-3xl font-semibold text-gray-800">Todolist</h1>
            </div>

            <div class="flex space-x-4 mb-6">
              <div class="flex-1 bg-red-100 text-red-700 p-4 rounded shadow">
                <h2 class="text-lg font-semibold">High Priority</h2>
                <p class="text-2xl">{totalPriority("high")}</p>
              </div>
              <div class="flex-1 bg-yellow-100 text-yellow-700 p-4 rounded shadow">
                <h2 class="text-lg font-semibold">Medium Priority</h2>
                <p class="text-2xl">{totalPriority("medium")}</p>
              </div>
              <div class="flex-1 bg-green-100 text-green-700 p-4 rounded shadow">
                <h2 class="text-lg font-semibold">Low Priority</h2>
                <p class="text-2xl">{totalPriority("low")}</p>
              </div>
            </div>

            <button
              onClick={() => setAddModalOpen(true)}
              class="mb-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
            >
              + Add Todolist
            </button>

            {/* Add Modal */}
            <div
              id="addTodoModal"
              tabindex="-1"
              class={`fixed top-0 left-0 right-0 z-50 ${
                isAddModalOpen() ? "flex" : "hidden"
              } justify-center items-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full bg-black/50`}
            >
              <div class="relative w-full max-w-md h-full md:h-auto">
                <div class="relative bg-dark rounded-lg shadow dark:bg-white">
                  <div class="flex items-start justify-between p-4 rounded-t">
                    <h3 class="text-xl font-semibold text-white dark:text-gray-900">
                      Add New Todolist
                    </h3>
                    <button
                      onClick={() => setAddModalOpen(false)}
                      type="button"
                      class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                    >
                      <svg
                        class="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 
                            1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 
                            1.414L10 11.414l-4.293 4.293a1 1 0 
                            01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 
                            010-1.414z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </div>

                  <div class="p-6 space-y-4">
                    <div>
                      <label class="block mb-1 font-medium">Title</label>
                      <input
                        type="text"
                        class="w-full border border-gray-300 rounded px-3 py-2"
                        value={newTitle()}
                        onInput={(e) => setNewTitle(e.currentTarget.value)}
                      />
                    </div>
                    <div>
                      <label class="block mb-1 font-medium">Description</label>
                      <textarea
                        class="w-full border border-gray-300 rounded px-3 py-2"
                        value={newDescription()}
                        onInput={(e) => setNewDescription(e.currentTarget.value)}
                      />
                    </div>
                    <div>
                      <label class="block mb-1 font-medium">Priority</label>
                      <select
                        class="w-full border border-gray-300 rounded px-3 py-2"
                        value={newPriority()}
                        onChange={(e) =>
                          setNewPriority(e.currentTarget.value as Priority)
                        }
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                    <div>
                      <label class="block mb-1 font-medium">Due Date</label>
                      <input
                        type="date"
                        class="w-full border border-gray-300 rounded px-3 py-2"
                        value={newDueDate()}
                        onInput={(e) => setNewDueDate(e.currentTarget.value)}
                      />
                    </div>
                  </div>
                  <div class="flex items-center p-6 space-x-2 rounded-b">
                    <button
                      type="button"
                      onClick={addTodo}
                      class="bg-blue-600 text-white font-medium px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      onClick={() => setAddModalOpen(false)}
                      class="bg-gray-300 text-gray-700 font-medium px-4 py-2 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Edit Modal */}
            <div
              id="editTodoModal"
              tabindex="-1"
              class={`fixed top-0 left-0 right-0 z-50 ${
                isEditModalOpen() ? "flex" : "hidden"
              } justify-center items-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full bg-black/50`}
            >
              <div class="relative w-full max-w-md h-full md:h-auto">
                <div class="relative bg-dark rounded-lg shadow dark:bg-white">
                  <div class="flex items-start justify-between p-4 rounded-t">
                    <h3 class="text-xl font-semibold text-white dark:text-gray-900">
                      Edit Todolist
                    </h3>
                    <button
                      onClick={() => setEditModalOpen(false)}
                      type="button"
                      class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                    >
                      <svg
                        class="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 
                            1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 
                            1.414L10 11.414l-4.293 4.293a1 1 0 
                            01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 
                            010-1.414z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </div>

                  <div class="p-6 space-y-4">
                    <div>
                      <label class="block mb-1 font-medium">Title</label>
                      <input
                        type="text"
                        class="w-full border border-gray-300 rounded px-3 py-2"
                        value={editTitle()}
                        onInput={(e) => setEditTitle(e.currentTarget.value)}
                      />
                    </div>
                    <div>
                      <label class="block mb-1 font-medium">Description</label>
                      <textarea
                        class="w-full border border-gray-300 rounded px-3 py-2"
                        value={editDescription()}
                        onInput={(e) => setEditDescription(e.currentTarget.value)}
                      />
                    </div>
                    <div>
                      <label class="block mb-1 font-medium">Priority</label>
                      <select
                        class="w-full border border-gray-300 rounded px-3 py-2"
                        value={editPriority()}
                        onChange={(e) =>
                          setEditPriority(e.currentTarget.value as Priority)
                        }
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                    <div>
                      <label class="block mb-1 font-medium">Due Date</label>
                      <input
                        type="date"
                        class="w-full border border-gray-300 rounded px-3 py-2"
                        value={editDueDate()}
                        onInput={(e) => setEditDueDate(e.currentTarget.value)}
                      />
                    </div>
                  </div>
                  <div class="flex items-center p-6 space-x-2 rounded-b">
                    <button
                      type="button"
                      onClick={saveEditTodo}
                      class="bg-blue-600 text-white font-medium px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditModalOpen(false)}
                      class="bg-gray-300 text-gray-700 font-medium px-4 py-2 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Todolist Table */}
            <table class="w-full text-left border-collapse border border-gray-300">
              <thead>
                <tr class="bg-gray-100">
                  <th class="border border-gray-300 px-4 py-2">Title</th>
                  <th class="border border-gray-300 px-4 py-2">Description</th>
                  <th class="border border-gray-300 px-4 py-2">Priority</th>
                  <th class="border border-gray-300 px-4 py-2">Due Date</th>
                  <th class="border border-gray-300 px-4 py-2">Completed</th>
                  <th class="border border-gray-300 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                <For each={todos()}>
                  {(todo) => (
                    <tr
                      class={`border border-gray-300 ${
                        todo.is_completed ? "line-through text-gray-400" : ""
                      }`}
                    >
                      <td class="border border-gray-300 px-4 py-2">{todo.title}</td>
                      <td class="border border-gray-300 px-4 py-2">{todo.description}</td>
                      <td class="border border-gray-300 px-4 py-2 capitalize">
                        {todo.priority}
                      </td>
                      <td class="border border-gray-300 px-4 py-2">
                        {todo.due_date ? todo.due_date.split(" ")[0] : "-"}
                      </td>
                      <td class="border border-gray-300 px-4 py-2 text-center">
                        <input
                          type="checkbox"
                          checked={todo.is_completed}
                          onChange={() => toggleComplete(todo.id)}
                        />
                      </td>
                      <td class="border border-gray-300 px-4 py-2 space-x-2">
                        <button
                          onClick={() => openEditModal(todo)}
                          class="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteTodo(todo.id)}
                          class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )}
                </For>
              </tbody>
            </table>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Todolist;
