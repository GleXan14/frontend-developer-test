import './assets/styles/index.scss';

import { createApp } from 'vue';
import App from './App.vue';

import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';

import { OhVueIcon, addIcons } from "oh-vue-icons";
import { PrUser, BiChevronDown, BiChevronUp, BiThreeDots, BiPlus, BiSearch,
BiChevronLeft, BiChevronRight, CoLocationPin, HiPencil, RiCloseFill } from 'oh-vue-icons/icons'

addIcons(PrUser, BiChevronDown, BiChevronUp, BiThreeDots, BiPlus, BiSearch, 
    BiChevronLeft, BiChevronRight, CoLocationPin, HiPencil, RiCloseFill);


const app = createApp(App);

app.component('EasyDataTable', Vue3EasyDataTable);
app.component("v-icon", OhVueIcon);

app.mount('#app')
