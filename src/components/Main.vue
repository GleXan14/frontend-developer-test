
<script setup lang="ts">
import Table from './Table.vue'
</script>

<template>
    <main>
        <div class="main-container">
            <h2>Consulta Cliente Domicilio</h2>
            <hr>
            <Suspense>
                <Table />
    
                <!-- loading state via #fallback slot -->
                <template #fallback>
                    Loading...
                </template>
            </Suspense>
        </div>
    </main>
</template>