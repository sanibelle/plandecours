<script setup lang="ts">
import { ref } from 'vue';
import { VueDraggable, type SortableEvent } from 'vue-draggable-plus';

const list = ref([
  {
    name: 'Jose',
    id: 5,
    children: [
      {
        name: 'Maria',
        id: 6,
        children: [
          {
            name: 'Carlos',
            id: 7,
          },
          {
            name: 'Ana',
            id: 8,
          },
        ],
      },
      {
        name: 'Pedro',
        id: 9,
        children: [
          {
            name: 'Luis',
            id: 10,
          },
          {
            name: 'Luisa',
            id: 11,
          },
        ],
      },
    ],
  },
  {
    name: 'Juan',
    id: 12,
    children: [
      {
        name: 'Sofia',
        id: 13,
        children: [
          {
            name: 'Miguel',
            id: 14,
          },
          {
            name: 'Lucia',
            id: 15,
          },
        ],
      },
      {
        name: 'Diego',
        id: 16,
        children: [
          {
            name: 'Mateo',
            id: 17,
          },
          {
            name: 'Valeria',
            id: 18,
          },
        ],
      },
    ],
  },
]);

const list2 = ref([]);

const onMoveEnd = (evt: SortableEvent) => {
  console.log('onStart', evt.oldIndex);
};
</script>

<template>
  <h1>Mes semaines</h1>
  <section id="building" class="py-20 bg-white flex flex-row items-center">
    <VueDraggable
      v-model="list"
      :animation="150"
      ghostClass="ghost"
      class="container"
      :group="{ name: 'people', pull: 'clone', put: false }"
    >
      <div
        v-for="item in list"
        :key="item.id"
        class="item flex flex-row items-center min-w-[300px] min-h-[500px]"
      >
        {{ item.name }}
        <VueDraggable
          v-model="list"
          :animation="150"
          ghostClass="ghost"
          class="container"
          :group="{ name: 'people', pull: 'clone', put: false }"
        >
          <div v-for="children in item.children" :key="children.id" class="item">
            {{ item.name }}
          </div>
        </VueDraggable>
      </div>
    </VueDraggable>
    <!-- <VueDraggable
      v-model="list2"
      :animation="150"
      ghostClass="ghost"
      class="container"
      @add="onMoveEnd"
      :group="{ name: 'people', pull: false, put: true }"
    >
      <div v-for="item in list2" :key="item.id" class="item">
        {{ item.name }}
      </div>
    </VueDraggable> -->
  </section>
</template>

<style>
.container {
  display: grid;
  gap: 10px;
  border: solid 1px black;
  min-height: 100px;
}
.item {
  width: 200px;
  background-color: red;
  height: 30px;
  line-height: 30px;
  text-align: center;
  cursor: move;
}
</style>
