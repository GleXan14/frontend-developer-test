
<script setup lang="ts">
const props = defineProps<{
    modelValue:string,
}>()

const emit = defineEmits<{
    (event: 'update:modelValue', payload: string): void;
}>();
</script>

<template>
    <span>Buscar:</span>
    <div class="search-container">
        <v-icon name="bi-search" scale="0.8" fill="#273F70"></v-icon>
        <input 
        class="search-input"
        placeholder="Escribe lo que deseas buscar…"
        v-model="props.modelValue"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"    
        >
    </div>
</template>