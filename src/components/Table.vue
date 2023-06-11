<script setup lang="ts">
import Search from './Search.vue';
import ClientService from '@/services/Client.service';
import type { Header, Item, ServerOptions } from "vue3-easy-data-table";
import { computed, ref, watch } from 'vue';
import type { Ref } from 'vue';
import type { IFilters } from '@/models/filter';

// $ref dataTable
const dataTable = ref();

//Search ref
const searchValue = ref<string>();

// index related
const currentPageFirstIndex = computed(() => dataTable.value?.currentPageFirstIndex);
const currentPageLastIndex = computed(() => dataTable.value?.currentPageLastIndex);
const clientItemsLength = computed(() => dataTable.value?.clientItemsLength);

// pagination related
const isFirstPage = computed(() => dataTable.value?.isFirstPage);
const isLastPage = computed(() => dataTable.value?.isLastPage);

const nextPage = () => {
    dataTable.value.nextPage();
};
const prevPage = () => {
    dataTable.value.prevPage();
};


//data
const headers: Header[] = [
    { text: "", value: "location", width: 40 },
    { text: "Persona No.", value: "personNumber", width: 110},
    { text: "Tipo Domicilio", value: "type", width: 140},
    { text: "Calle", value: "street"},
    { text: "Número", value: "number"},
    { text: "Sector", value: "sector"},
    { text: "Provincia", value: "province"},
    { text: "Estado", value: "state"},
];

const items: Ref<Item[]> = ref<Item[]>([]);

const loading = ref(false);
const tableItemsLength = ref(0);
const serverOptions = ref<ServerOptions>({
    page: 1,
    rowsPerPage: 10
});

//custom sorting 
const customSorting = (header: Header) => {

    if(isSortAsc(header)){
        serverOptions.value = {...serverOptions.value,
            sortBy: undefined,
            sortType: undefined
        }
    }else if(isSortDesc(header)){
        serverOptions.value = {...serverOptions.value,
            sortBy: header.value,
            sortType: 'asc'
        }
    }else{
        serverOptions.value = {...serverOptions.value,
            sortBy: header.value,
            sortType: 'desc'
        }
    }
}
const isSortAsc = (header: Header) => {
    const isCurrentTypeAsc:boolean = serverOptions.value.sortType == 'asc';
    const isTheSameHeader:boolean = serverOptions.value.sortBy == header.value;

    return isTheSameHeader && isCurrentTypeAsc;
}

const isSortDesc = (header: Header) => {
    const isCurrentTypeDesc:boolean = serverOptions.value.sortType == 'desc';
    const isTheSameHeader:boolean = serverOptions.value.sortBy == header.value;

    return isTheSameHeader && isCurrentTypeDesc;
}

const loadTableData = async () => {
    loading.value = true;
    
    const filters: IFilters = {
        page: serverOptions.value.page,
        limit: serverOptions.value.rowsPerPage
    }
    if(searchValue.value && searchValue.value.length > 0){
        filters.query = searchValue.value;
    }
    if(serverOptions.value.sortBy && serverOptions.value.sortType) {
        filters.sort = Array.isArray(serverOptions.value.sortBy) ? serverOptions.value.sortBy : [serverOptions.value.sortBy];
        filters.order = Array.isArray(serverOptions.value.sortType) ? serverOptions.value.sortType : [serverOptions.value.sortType];
    }

    const data = await ClientService.getClientsByFilters(filters);
    items.value = data.clients;
    tableItemsLength.value = data.count;
    loading.value = false;
}

// initial load
loadTableData();

//check for every filter changes
watch(serverOptions, (value) => {loadTableData();}, {deep: true});
watch(searchValue, (value) => {loadTableData();});

</script>

<template>
    <section class="table-section">

        <div class="table-header">
            <div class="table-header-search">
                <Search 
                :modelValue="searchValue"
                @update:modelValue="searchValue = $event" />
            </div>
            <button class="table-header-add">
                <v-icon name="bi-plus" scale="1.2" fill="#FFFFFF"></v-icon>
                <span>Nuevo Domicilio</span>
            </button>
        </div>

        <div class="table-container">
            <EasyDataTable
            ref="dataTable"
            table-class-name="table"
            :headers="headers"
            :items="items"
            :loading="loading"
            v-model:server-options="serverOptions"
            :server-items-length="tableItemsLength"
            alternating
            hide-footer
            >
                <template #header="header">
                    <div class="custom-header" 
                    @click="customSorting(header)">
                        <span class="custom-header-text">{{ header.text }}</span>

                        <v-icon v-if="isSortAsc(header)" class="sort-icon"
                        name="bi-chevron-up" scale="1" fill="#FFFFFF"></v-icon>
                        <v-icon v-if="isSortDesc(header)" class="sort-icon"
                        name="bi-chevron-down" scale="1" fill="#FFFFFF"></v-icon>
                    </div>
                </template>
                <template #header-location="header">
                    <v-icon name="bi-three-dots" scale="1.2" fill="#FFFFFF"></v-icon>
                </template>
                <template #item-location="item">
                    <v-icon name="co-location-pin" scale="1.2" color="#273F70"></v-icon>
                </template>

            </EasyDataTable>

            <div class="custom-table-footer">

                <div class="custom-table-footer-index">
                    <span>{{currentPageFirstIndex}} - {{currentPageLastIndex}} de {{clientItemsLength}}</span>
                </div>

                <div class="custom-table-footer-pagination">
                    <button class="pagination-btn" @click="prevPage" :disabled="isFirstPage">
                        <v-icon name="bi-chevron-left" scale="0.8" fill="#273F70"></v-icon>
                    </button>
                    <button class="pagination-btn" @click="nextPage" :disabled="isLastPage">
                        <v-icon name="bi-chevron-right" scale="0.8" fill="#273F70"></v-icon>
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>