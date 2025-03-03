<script lang="ts">
  import Task from "../components/Task.svelte";
  import type { TaskType } from "../types/todo";

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/auth/login";
  }

  async function fetchTasks() {
    const response = await fetch("/api/tasks");
    tasks = await response.json();
  }

  async function createTask() {
    if (!newTask.title || !newTask.description) {
      alert("Please fill in all the fields.");
      return;
    }
    await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });
    newTask = { title: "", description: "", priority: "low", status: "new" };
    fetchTasks();
  }

  async function removeTask(id: number) {
    await fetch("/api/tasks", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchTasks();
  }

  async function updateTask(task: TaskType) {
    await fetch("/api/tasks", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    fetchTasks();
  }

  let tasks: TaskType[] = $state([]);
  let reversedTasks = $state<TaskType[]>([]);
  let newTask: Omit<TaskType, "id"> = $state({
    title: "",
    description: "",
    priority: "low",
    status: "new",
  });

  $inspect(tasks);

  $effect(() => {
    fetchTasks();
  });

  $effect(() => {
    reversedTasks = tasks.slice().reverse();
  });
</script>

<div class="flex flex-col py-2">
  <button class="btn ml-auto" onclick={logout}>Logout</button>
  <div class="flex flex-col items-center gap-[10px]">
    <h1 class="uppercase text-center font-bold">Task manager</h1>
    <div class="flex gap-[10px]">
      <input
        bind:value={newTask.title}
        placeholder="Title"
        class="round-border"
      />
      <input
        bind:value={newTask.description}
        placeholder="Description"
        class="round-border"
      />
      <select bind:value={newTask.priority} class="round-border">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button class="btn" onclick={createTask}>Add</button>
    </div>

    <ul>
      {#each reversedTasks as task}
        <li class="mb-[10px]">
          <Task
            {task}
            removeTask={() => removeTask(task.id)}
            updateTask={(updatedTask) => updateTask(updatedTask)}
          />
        </li>
      {/each}
    </ul>
  </div>
</div>
