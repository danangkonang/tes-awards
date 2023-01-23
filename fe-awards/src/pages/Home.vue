<template>
  <nav class="flex fixed w-full items-center justify-between px-6 h-16 bg-white text-gray-700 border-b border-gray-200 z-10">
    <div class="flex flex-row items-center w-full justify-between">
      <button class="mr-2" aria-label="Open Menu" @click="drawer">
        <svg
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
          class="w-8 h-8">
          <path d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
      <div class="font-bold text-2xl">Awards</div>
      <button aria-label="Open Menu" @click="setFilter">
        <svg fill="currentColor" :width="32" :height="32" viewBox="0 0 24 24">
          <path :d="mdiFilterVariant"></path>
        </svg>
      </button>
    </div>
    <transition
      enter-class="opacity-0"
      enter-active-class="ease-out transition-medium"
      enter-to-class="opacity-100"
      leave-class="opacity-100"
      leave-active-class="ease-out transition-medium"
      leave-to-class="opacity-0">
      <div
        @keydown.esc="state.isOpen = false"
        v-show="state.isOpen"
        class="z-10 fixed inset-0 transition-opacity">
        <div
          @click="state.isOpen = false"
          class="absolute inset-0 bg-black opacity-50"
          tabindex="0">
        </div>
      </div>
    </transition>
    <aside
      class="transform top-0 left-0 w-64 bg-white fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30"
      :class="state.isOpen ? 'translate-x-0' : '-translate-x-full'">
      <span
        @click="state.isOpen = false"
        class="flex flex-col w-full p-4">
        <svg fill="rgba(202 138 4 / 1)" :width="60" :height="60" viewBox="0 0 24 24">
          <path :d="mdiStar"></path>
        </svg>
        <span class="font-bold">Awards Menu</span>
      </span>
      <span
        @click="state.isOpen = false"
        class="flex items-center p-4 hover:bg-yellow-600 hover:text-white">
        <span>Home</span>
      </span>
      <span
        @click="state.isOpen = false"
        class="flex items-center p-4 hover:bg-yellow-600 hover:text-white">
        <span>Cards</span>
      </span>
      <span
        @click="state.isOpen = false"
        class="flex items-center p-4 hover:bg-yellow-600 hover:text-white">
        <span>Profile</span>
      </span>
      <span
        @click="doLogout"
        class="flex items-center p-4 hover:bg-yellow-600 hover:text-white">
        <span>Logout</span>
      </span>
    </aside>
    <aside
      class="transform top-0 left-0 w-screen bg-white fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30"
      :class="state.filter ? 'translate-x-0' : '-translate-x-full'">
      <div class="flex flex-row p-5 items-center justify-between">
        <div class="font-bold text-lg">
          Filter
        </div>
        <div
        class="w-12 cursor-pointer flex items-center justify-center"
        @click="setFilter">
        <svg fill="currentColor" :width="24" :height="24" viewBox="0 0 24 24">
          <path :d="mdiClose"></path>
        </svg>
      </div>
      </div>
      <div class="p-5">
        <div v-for="(n, i) in state.history" :key="i" class="mb-5">
          <span class="border border-blue-600 p-2 rounded">
            <span class="text-blue-600">{{ n.string }}</span>
            <button @click="clearOneHistory(n.string)" class="bg-blue-600 text-white rounded-full m-1 p-1">
              <svg fill="currentColor" :width="12" :height="12" viewBox="0 0 24 24">
                <path :d="mdiClose"></path>
              </svg>
            </button>
          </span>
        </div>
        <button v-if="state.history.length > 1" @click="clearAllHistory" class="border border-blue-600 rounded py-1 px-2 text-blue-600">Clear All Filter</button>
      </div>
      <div class="p-5">
        <span class="font-bold">poin Needed</span>
        <div class="relative">
          <span class="absolute left-0">10.000</span>
          <span class="absolute right-0">500.000</span>
          <input class="w-full pt-10" type="range" v-model="state.poin" min="10000" max="500000">
        </div>
        <div class="font-bold">Awards Type</div>
        <div class="mb-5" v-for="(item, i) in state.types" :key="i">
          <label class="container-checkbox cursor-pointer">
            <input type="checkbox" v-model="item.selected" />
            <span class="checkmark"></span>
            {{ item.name }}
          </label>
        </div>
      </div>
      <div class="absolute w-full bottom-0 p-5">
        <button @click="FilterFetchAwwords" class="bg-blue-600 p-2 w-full text-white rounded">Filter</button>
      </div>
    </aside>
  </nav>
  <div class="pt-20 px-5">
    <div class="mb-5" v-for="(i, n) in state.awards" :key="n">
      <div class="bg-gray-300 relative h-48 md:h-64 lg:h-96 rounded">
        <img :src="i.awards_image" :alt="i.awards_name" class="w-full h-full" />
        <div
          :class="[
            i.award_type === 'vouchers' ? 'bg-blue-500'
            : i.award_type === 'products' ? 'bg-orange-600' : 'bg-purple-600'
          ]"
          class="absolute right-2 top-2 p-1 rounded text-white text-sm">{{ i.award_type }}</div>
        <div class="absolute bottom-2 left-2">{{ i.poin }}</div>
      </div>
      <div class="font-bold">{{ i.awards_name }}</div>
    </div>
    <div v-if="state.loading" class="text-center mb-10">Loading....</div>
    <div v-if="state.last_page" class="text-center mb-10">Ups No More Data</div>
  </div>
</template>

<script setup>
import { mdiStar, mdiFilterVariant, mdiArrowLeft, mdiClose } from '@mdi/js';
import { onBeforeMount, onMounted, reactive, ref } from 'vue';
const state = reactive({
  isOpen: false,
  filter: false,
  history: [],
  current_page: 1,
  poin: 500000,
  per_page: 5,
  last_page: false,
  awards: [],
  loading: false,
  types: [
    {
      name: 'Vouchers',
      selected: false
    },
    {
      name: 'Products',
      selected: false
    },
    {
      name: 'Giftcard',
      selected: false
    }
  ]
});

const drawer = () => {
  state.isOpen = !state.isOpen;
};

const setFilter = () => {
  state.filter = !state.filter;
};

const doLogout = () => {
  localStorage.clear()
  window.location = '/login'
};

const clearOneHistory = (n) => {
  let filters = localStorage.getItem('filters') || JSON.stringify({})
  let objFilter = JSON.parse(filters);
  delete objFilter[n]
  localStorage.setItem('filters', JSON.stringify(objFilter));
  fetchHistoryFilter();
}

const clearAllHistory = () => {
  localStorage.clear();
  fetchHistoryFilter();
};

const FilterFetchAwwords = () => {
  const list = ['vouchers', 'products', 'giftcard'];
  const tp = state.types.filter((f) => f.selected && list.includes(f.name.toLowerCase())).map((g) => g.name.toLowerCase());
  let filters = localStorage.getItem('filters') || JSON.stringify({})
  let objFilter = JSON.parse(filters)
  objFilter[`Poin: ${10000}-${state.poin}`] = {
    string: `Poin: ${10000}-${state.poin}`,
    value: state.poin
  }
  objFilter[`Type: ${tp.toString()}`] = {
    string: `Type: ${tp.toString()}`,
    value: tp,
  }
  localStorage.setItem('filters', JSON.stringify(objFilter));
  state.awards = [];
  state.filter = !state.filter;
  fetchAwwords();
  fetchHistoryFilter();
}

const fetchAwwords = async () => {
  const list = ['vouchers', 'products', 'giftcard'];
  const tp = state.types.filter((f) => f.selected && list.includes(f.name.toLowerCase())).map((g) => g.name.toLowerCase());
  try {
    let req = await fetch(`http://localhost:9000/api/v1/awards?types=${tp.toString()}&poin=${state.poin}&per_page=${state.per_page}&current_page=${state.current_page}`, {
      headers: {
        'content-type': 'application/json'
      },
      method: 'GET',
    })
    let res = await req.json();
    state.awards = state.awards.concat(res.data);
    if (res.data.length < state.per_page) {
      state.last_page = true;
    }
    state.loading = false;
  } catch (err) {
    console.log(err);
  }
};

function nextFetchAwwords() {
  window.onscroll = () => {
    let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
    if (bottomOfWindow && !state.last_page) {
      state.current_page = state.current_page + 1;
      state.loading = true;
      fetchAwwords();
    }
  }
};

function fetchHistoryFilter(params) {
  let filters = localStorage.getItem('filters') || JSON.stringify({});
  let objFilter = JSON.parse(filters);
  const fil = Object.values(objFilter);
  state.history = fil;
}

onMounted(() => {
  nextFetchAwwords();
});

onBeforeMount(() => {
  fetchAwwords();
  fetchHistoryFilter();
});

</script>
