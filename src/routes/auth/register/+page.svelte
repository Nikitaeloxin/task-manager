<script lang="ts">
    let email = '';
    let password = '';
  
    async function register() {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (data.success) {
      window.location.href = '/auth/login'; 
    } else {
      alert(data.error);
    }
  }
  </script>
  
  <h1 class="uppercase text-center font-bold mb-[20px]">Task manager</h1>
  <div class="flex flex-col items-center gap-[10px]">
	<input bind:value={email} placeholder="Email" />
	<input bind:value={password} type="password" placeholder="Password" />
	<button class="btn w-[210px]" onclick={register}>Register</button>
	<button class="btn w-[210px]" onclick={() => window.location.href = '/auth/login'}>Return to logging</button>
  </div>
  