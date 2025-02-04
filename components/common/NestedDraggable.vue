<script setup lang="ts">
import { toRef } from 'vue';
import { defineProps } from 'vue';
import { VueDraggable, type SortableEvent } from 'vue-draggable-plus';

const props = defineProps({
  items: {
    type: Array<any>,
    required: true,
  },
  group: {
    type: Number,
    required: false,
    default: 1,
  },
});

const onMoveEnd = (evt: SortableEvent) => {
  console.log('onMoveEnd', evt.oldIndex, evt.newIndex);
};

const items = toRef(props, 'items');
</script>
<template>
  <VueDraggable
    v-model="items"
    :animation="150"
    ghostClass="ghost"
    :group="`${group}`"
    @end="onMoveEnd"
  >
    <div v-for="item in items" :key="item.id" class="item">
      <div class="flex flex-row">
        <p>{{ item.name }}</p>
        <CommonNestedDraggable
          v-if="item.children && item.children.length"
          :items="item.children"
          :group="props.group + 1"
        />
      </div>
    </div>
  </VueDraggable>
</template>

<style scoped>
.item {
  background-color: red;
  line-height: 30px;
  text-align: center;
  cursor: move;
  border: solid 1px black;
  margin-bottom: 5px;
}
</style>
