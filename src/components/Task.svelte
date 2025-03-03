<script lang="ts">
  import type { TaskType } from "../types/todo";

  let {
    task,
    removeTask,
    updateTask,
    ...props
  }: {
    task: TaskType;
    removeTask: () => void;
    updateTask: (updatedTask: TaskType) => void;
  } = $props();

  let isEditing = $state(false);

  let editableTask = $state({ ...task });

  const toggleEdit = () => {
    isEditing = !isEditing;
    editableTask = { ...task };
  };

  const saveTask = () => {
    if (!editableTask.title || !editableTask.description) {
      alert("Please fill in all the fields.");
      return;
    }
    updateTask(editableTask);
    isEditing = false;
  };
</script>

<div class="round-border min-w-[300px]">
  <h1 class="border-b w-full font-bold mb-[10px]">Task</h1>
  <div class="flex flex-col gap-[5px]">
    {#if isEditing}
      <!-- EDIT -->
      <dev class="flex gap-[10px]">
        <label for="edit-title" class="block">Title:</label>
        <input
          id="edit-title"
          type="text"
          bind:value={editableTask.title}
          class="round-border ml-auto w-full"
        />
      </dev>

      <dev class="flex gap-[10px]">
      <label for="edit-description" class="block">Description:</label>
      <textarea
        id="edit-description"
        bind:value={editableTask.description}
        class="round-border ml-auto w-full"
      ></textarea>
      </dev>

      <dev class="flex gap-[10px]">
      <label for="edit-priority" class="block">Priority:</label>
      <select
        id="edit-priority"
        bind:value={editableTask.priority}
        class="round-border ml-auto w-full"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      </dev>

      <dev class="flex gap-[10px]">
      <label for="edit-status" class="block">Status:</label>
      <select
        id="edit-status"
        bind:value={editableTask.status}
        class="round-border ml-auto w-full"
      >
        <option value="new">New</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      </dev>

      <button class="btn" onclick={saveTask}>Save</button>
      <button class="btn" onclick={toggleEdit}>Cancel</button>
    {:else}
      <!-- VIEW -->
      <dev class="flex gap-[10px]">
        <label for="title" class="block">Title:</label>
        <p id="title">{task.title}</p>
      </dev>

      <dev class="flex gap-[10px]">
        <label for="description" class="block">Description:</label>
        <p id="description">{task.description}</p>
      </dev>

      <dev class="flex gap-[10px]">
        <label for="priority" class="block">Priority:</label>
        <p id="priority">{task.priority}</p>
      </dev>

      <dev class="flex gap-[10px]">
        <label for="status" class="block">Status:</label>
        <p id="status">{task.status}</p>
      </dev>

      <button class="btn w-full " onclick={toggleEdit}>Edit</button>
    {/if}
  </div>
  <button class="btn mt-[10px] w-full" onclick={() => removeTask()}>Remove</button>
</div>
