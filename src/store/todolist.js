import Vue from "vue";
import Vuex from "vuex";
import JsonaAxios from "../jsonserver/axios"
import _ from "lodash";

Vue.use(Vuex);

export const store = new Vuex.Store({
  // counter라는 state 속성을 추가
  state: {
    todos: [],
    filter: 'all',
    sort: { type: 'completed', order: 'asc' },
    selectedTodo: {},
    search: '',
  },
  mutations: {
    FETCH_TODOS(state, todos) {
      state.todos = _.orderBy(todos, state.sort.type, state.sort.order);
    },
    UPDATE_FILTER(state, filter) {
      state.filter = filter;
    },
    UPDATE_SORT(state, sort) {
      state.sort = sort;
    },
    UPDATE_SEARCH(state, search) {
      state.search = search;
    },
    SELECTED_TODO(state, todo) {
      state.selectedTodo = todo;
    }
  },
  actions: {
    async fetchTodo({ commit }) {
      const todos = await JsonaAxios.getTodos();
      commit('FETCH_TODOS', todos)
    },
    async createTodo({ commit }, title) {
      console.log(title)
      await JsonaAxios.addTodo({
        id: `todo-${Date.now()}`,
        title,
        endDate: "",
        memo: "",
        completed: false,
        important: 1,
      })
      const todos = await JsonaAxios.getTodos();
      commit('FETCH_TODOS', todos);
    },
    async removeTodo({ commit }, id) {
      await JsonaAxios.deleteTodo(id);
      const todos = await JsonaAxios.getTodos();
      commit('FETCH_TODOS', todos);
    },
    async updateTitle({ commit, state }, title) {
      console.log(state.selectedTodo)
      await JsonaAxios.updateTodo({
        ...state.selectedTodo,
        title
      })
      commit('SELECTED_TODO', state.selectedTodo);
    },
    async updateEndDate({ commit, state }, endDate) {
      await JsonaAxios.updateTodo({
        ...state.selectedTodo,
        endDate
      })
      commit('SELECTED_TODO', state.selectedTodo);
    },
    async updateMemo({ commit, state }, memo) {
      await JsonaAxios.updateTodo({
        ...state.selectedTodo,
        memo
      })
      commit('SELECTED_TODO', state.selectedTodo);
    },
    async updateImportant({ commit, state }, todo) {
      await JsonaAxios.updateTodo({
        ...todo
      })
      commit('SELECTED_TODO', state.selectedTodo);
    },
    async checkedToggle({ commit, state }, id) {
      const todo = state.todos.find(todo => todo.id === id);
      await JsonaAxios.updateTodo({
        ...todo,
        completed: !todo.completed
      })

      const todos = await JsonaAxios.getTodos();
      commit('FETCH_TODOS', todos);
    },
    updateFilter({ commit }, filter) {
      commit('UPDATE_FILTER', filter);
    },
    updateSearch({ commit }, search) {
      commit('UPDATE_SEARCH', search);
    },
    updateSort({ commit, state }, sort) {
      commit('UPDATE_SORT', sort);
      state.todos = _.orderBy(state.todos, sort.type, sort.order);
    }
  }
});
