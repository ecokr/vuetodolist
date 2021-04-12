<template>
  <div>
    <div style="display: flex; flex-flow: row wrap">
      <div style="display: flex;margin: 8px;">
        <div style="margin-right: 4px; font-weight: bold">SORT</div>
        <div v-for="sort in sortList" v-bind:key="sort.type">
          <div
            class="header-text-btn"
            v-bind:class="{ active: $store.state.sort.type === sort.type }"
            v-on:click="updateSort({ type: sort.type, order: sort.order })"
            style="margin: 0 5px"
          >
            {{ sort.label }}
          </div>
        </div>
      </div>
      <div style="flex: 1"></div>
      <div style="display: flex;margin: 8px;">
        <div style="margin-right: 4px; font-weight: bold">FILTER</div>
        <div v-for="item in filters" v-bind:key="item.type">
          <div
            class="header-text-btn"
            v-on:click="filterSelect(item.type)"
            style="margin: 0 5px"
            v-bind:class="{ active: $store.state.filter === item.type }"
          >
            {{ item.label }}
          </div>
        </div>
      </div>
    </div>
    <div style="display: flex; flex-flow: row wrap">
      <div style="display: flex; justify-content: flex-start;margin: 8px;">
        <input
          type="text"
          v-on:keyup.enter="addListItem"
          v-model="insertItem"
          placeholder="Enter your task here"
          style="margin-right: 8px"
        />
        <svg
          style="cursor: pointer"
          v-on:click="addListItem"
          height="24"
          viewBox="0 0 32 32"
          width="24"
          fill="#fff"
        >
          <path
            d="M27,3V29a1,1,0,0,1-1,1H6a1,1,0,0,1-1-1V27H7v1H25V4H7V7H5V3A1,1,0,0,1,6,2H26A1,1,0,0,1,27,3ZM12.29,20.29l1.42,1.42,5-5a1,1,0,0,0,0-1.42l-5-5-1.42,1.42L15.59,15H5v2H15.59Z"
            id="login_account_enter_door"
          />
        </svg>
      </div>

      <div style="flex: 1"></div>
      <div style="display: flex; justify-content: flex-start;margin: 8px;">
        <input
          type="text"
          v-on:keyup="searchUpdate"
          v-model="searchText"
          placeholder="Enter search keyword"
          style="margin-right: 8px"
        />
        <svg style="cursor: pointer" v-on:click="searchUpdate" xmlns="http://www.w3.org/2000/svg" fill="none" height="24" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24"><circle cx="10.5" cy="10.5" r="7.5"/><line x1="21" x2="15.8" y1="21" y2="15.8"/></svg>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  name: "todo-header",
  data: () => {
    return {
      filter: "all",
      insertItem: "",
      searchText: "",
      sortType: "completed",
      filters: [
        { label: "전체", type: "all" },
        { label: "완료", type: "completed" },
        { label: "미완료", type: "yet" },
      ],
      sortList: [
        { label: "완료 여부", type: "completed", order: "asc" },
        { label: "등록 순", type: "id", order: "desc" },
        { label: "종료일", type: "endDate", order: "asc" },
        { label: "중요도", type: "important", order: "desc" },
      ],
    };
  },
  methods: {
    addListItem() {
      if (this.insertItem.trim()) {
        this.createTodo(this.insertItem);
        this.insertItem = "";
      }
    },
    searchUpdate() {
      this.$store.dispatch("updateSearch", this.searchText);
    },
    filterSelect(type) {
      this.$store.dispatch("updateFilter", type);
      this.filter = type;
    },
    ...mapActions(["updateFilter", "updateSort", "createTodo"]),
  },
};
</script>
<style>
</style>