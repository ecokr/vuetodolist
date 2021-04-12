<template>
  <div
    style="
      max-width: 1000px;
      width: 100%;
      margin: 0 auto;
      padding: 0 30px;
      min-height: calc(100vh - 60px);
    "
    v-on:click.prevent="closeDetail"
  >
  <todo-header></todo-header>
    <div class="todo-list-container" style="display: flex">
      <div
        class="todo-list-box" 
        style="display: flex; flex-flow: column; width: 100%"
      >
        <div
          class="todos"
          v-show="
            ($store.state.filter === 'all'
              ? true
              : $store.state.filter === 'completed'
              ? todo.completed === true
              : !!!todo.completed) && todo.title.toUpperCase().indexOf($store.state.search.toUpperCase()) > -1
          "
          v-bind:class="{
            selected: $store.state.selectedTodo ? $store.state.selectedTodo.id === todo.id : false,
            completed: todo.completed,
          }"
          style="margin: 4px 0; cursor: pointer"
          v-for="todo in $store.state.todos"
          v-bind:key="todo.id"
          v-on:click.stop="selectTodo(todo)"
        >
          <todo-item v-on:click.prevent.stop :todoItem="todo"></todo-item>
        </div>
      </div>
          <todo-edit v-show="detailShow" v-if="selectedTodo"></todo-edit>

    </div>
  </div>
</template>

<script>
// import _ from "lodash";
import moment from "moment";
import todoItem from './TodoItem'
import todoEdit from './TodoEdit'
import todoHeader from './TodoHeader'

export default {
  name: "ToDo",
  data: () => {
    return {
      todoItems: [],
      selectedTodo : {},
      
      date: "",
      detailShow: false,
    };
  },
  mounted() {
    this.fetch();
    
  },
  methods: {
    fetch(){
      this.$store.dispatch('fetchTodo');
    },
    selectTodo(todo) {
      if (this.selectedTodo && this.selectedTodo.id === todo.id) {
        this.closeDetail();
      } else {
        this.openDetail(todo);
      }
    },
    openDetail(todo) {
      this.$store.state.selectedTodo = todo;
      this.selectedTodo = todo;
      this.detailShow = true;
    },
    closeDetail() {
      this.detailShow = false;
      this.selectedTodo = null;
    },
    
  },
  components: {
    todoItem,
    todoEdit,
    todoHeader
  },
  filters: {
    moment: function (date) {
      if (date) {
        return moment(date).format("YY-MM-DD");
      } else {
        return "";
      }
    },
  },
}
</script>
<style>
.important-btn:hover,
.xbtn:hover {
  border-radius: 4px;
  background-color: rgba(120, 120, 120, 0.3);
}
.vdp-datepicker > div {
  display: flex;
  justify-content: center;
  flex-flow: column;
  color : #111
}
.todos {
  background: #151516;
}
.todos .title-box {
  color: #fff;
}
.todos.completed .title-box {
  text-decoration: line-through;
}
.todos.completed {
}
.todos.selected,
.todos:hover {
  background: #ef278e;
}
.todos .title-box {
  pointer-events: none;
  user-select: none;
}
.todos.selected .title-box {
  pointer-events: unset;
  user-select: text;
}
.header-text-btn {
  cursor: pointer;
}
.header-text-btn.active {
  font-weight: 700;
}
input::placeholder{
  color : #999;
  font-size: 14px;
}
</style>
