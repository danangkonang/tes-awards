<template>
  <div class="w-screen h-screen flex flex-col items-center justify-center">
    <svg fill="rgb(253 224 71 /1)" :width="96" :height="96" viewBox="0 0 24 24">
      <path :d="mdiStar"></path>
    </svg>
    <div class="text-center p-5">Enter your email address to sign in and continue</div>
    <form @submit.prevent="doLogin">
      <input
        v-model="state.email"
        type="text"
        @keyup="changeInput($event)"
        class="w-72 h-10 px-2 rounded-md border-2 focus:outline-none focus:ring transition duration-200 text-sm text-dr"
        :class="[
          state.errors.email
            ? 'border-red-400 focus:ring-red-200'
            : 'ring-yellow-400 focus:ring-yellow-200',
        ]"
        placeholder="Email Address" />
      <div class="text-sm text-red-600 mb-5">
        {{ state.errors.email_msg }}
      </div>

      <button
        type="submit"
        class="bg-gray-900 text-white py-2 rounded w-72">
        Sign In
      </button>
    </form>
  </div>
</template>
<script setup>
import { mdiStar } from '@mdi/js';
import { reactive } from 'vue';

const state = reactive({
  email: 'user1@email.com',
  isError: false,
  message: '',
  errors: {
    email: false,
    email_msg: '',
  },
});

const changeInput = (e) => {
  const { value } = e.target;
  state.email = value;
  state.errors.email = false;
  state.errors.email_msg = '';
};

const doLogin = async () => {
  try {
    let req = await fetch('http://localhost:9000/api/v1/user/login', {
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        email: state.email
      })
    })
    let res = await req.json();
    console.log(res.message);
    if (res.status === 200) {
      localStorage.setItem('isLoged', true)
      window.location = '/'
    } else {
      state.errors.email = true;
      state.errors.email_msg = res.message;
    }
  } catch (err) {
    console.log(err);
  }
}
</script>
