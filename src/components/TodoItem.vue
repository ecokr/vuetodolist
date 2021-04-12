<template>
  <div>
    
    <div
      style="
        width: 100%;
        display: flex;
        justify-content: space-around;
        height: 30px;
        margin: 5px 0;
        align-items: center;
        padding-right: 8px;
      "
    >
      <input
        style="height: 20px; width: 20px; margin: 0 8px; cursor: pointer"
        :checked="todo.completed"
        type="checkbox"
        v-on:click.stop="checkedToggle(todo.id)"
      />
      <div style="flex: 1; display: flex; justify-content: flex-start">
        <input
          type="text"
          class="title-box"
          style="
            text-align: left;
            font-weight: bold;
            background: transparent;
            border: none;
            width: 100%;
            margin-right: 8px;
          "
          v-on:click.prevent.stop
          v-on:keyup.enter="
            () => {
              updateTitle(todo.title);
              $event.target.blur();
            }
          "
          v-on:blur="updateTitle(todo.title)"
          v-model="todo.title"
        />
      </div>
      <div style="display: flex; margin-right: 8px">
        <div
          class="important-btn"
          v-on:click.stop.prevent="(e) => importantChange(todo, e)"
          style="height: 20px; width: 20px; cursor: pointer"
          v-for="star in stars"
          v-bind:key="star"
          :data-star="star"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            style="pointer-events: none"
          >
            <path
              v-if="todo.important >= star"
              fill="#f1c40f"
              d="M12.9,2.6l2.3,5c0.1,0.3,0.4,0.5,0.7,0.6l5.2,0.8C22,9,22.3,10,21.7,10.6l-3.8,3.9c-0.2,0.2-0.3,0.6-0.3,0.9   l0.9,5.4c0.1,0.8-0.7,1.5-1.4,1.1l-4.7-2.6c-0.3-0.2-0.6-0.2-0.9,0l-4.7,2.6c-0.7,0.4-1.6-0.2-1.4-1.1l0.9-5.4   c0.1-0.3-0.1-0.7-0.3-0.9l-3.8-3.9C1.7,10,2,9,2.8,8.9l5.2-0.8c0.3,0,0.6-0.3,0.7-0.6l2.3-5C11.5,1.8,12.5,1.8,12.9,2.6z"
              id="yelloStar"
            />
            <path
              v-if="todo.important < star"
              fill="#333333"
              d="M12.9,2.6l2.3,5c0.1,0.3,0.4,0.5,0.7,0.6l5.2,0.8C22,9,22.3,10,21.7,10.6l-3.8,3.9c-0.2,0.2-0.3,0.6-0.3,0.9   l0.9,5.4c0.1,0.8-0.7,1.5-1.4,1.1l-4.7-2.6c-0.3-0.2-0.6-0.2-0.9,0l-4.7,2.6c-0.7,0.4-1.6-0.2-1.4-1.1l0.9-5.4   c0.1-0.3-0.1-0.7-0.3-0.9l-3.8-3.9C1.7,10,2,9,2.8,8.9l5.2-0.8c0.3,0,0.6-0.3,0.7-0.6l2.3-5C11.5,1.8,12.5,1.8,12.9,2.6z"
              id="star"
            />
          </svg>
        </div>
      </div>
      <div
        class="xbtn"
        style="
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        "
        v-on:click.prevent.stop="deleteTodoItem(todo.id)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          height="16"
          stroke="#fff"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
          width="16"
        >
          <line x1="18" x2="6" y1="6" y2="18"></line>
          <line x1="6" x2="18" y1="6" y2="18"></line>
        </svg>
      </div>
    </div>
    <div
      style="
        display: flex;
        padding: 4px 36px;
        font-size: 14px;
        align-items: center;
      "
    >
      <div
        v-if="todo.memo"
        style="margin-right: 8px; display: flex; align-items: center"
      >
        <svg
          height="20"
          id="Layer_1"
          version="1.1"
          viewBox="0 0 512 512"
          width="20"
          xml:space="preserve"
          stroke="#fff"
          fill="#fff"
        >
          <path
            d="M449.441,393.818V178.852c0-31.555-27.967-57.236-62.365-57.236H369.99v-3.434c0-31.566-27.967-57.236-62.365-57.236  h-23.034H152.586h-27.661c-34.388,0-62.365,25.67-62.365,57.236v214.965c0,31.555,27.978,57.236,62.365,57.236h17.084v3.435  c0,31.565,27.978,57.235,62.366,57.235h27.661h132.005h11.867h11.167C421.474,451.053,449.441,425.384,449.441,393.818z   M364.041,432.318H232.036h-27.661c-23.177,0-41.956-17.237-41.956-38.5v-3.435v-18.736V178.852c0-21.263,18.779-38.5,41.956-38.5  h27.661h117.545h14.46h5.949h17.085c23.177,0,41.956,17.237,41.956,38.5v214.966c0,21.263-18.779,38.5-41.956,38.5h-11.167H364.041z  "
          />
          <path
            d="M197.397,214.935h162.334c4.484,0,8.115-3.632,8.115-8.116s-3.631-8.115-8.115-8.115H197.397  c-4.484,0-8.116,3.631-8.116,8.115S192.913,214.935,197.397,214.935z"
          />
          <path
            d="M223.046,261.967c0,4.484,3.642,8.115,8.126,8.115h152.119c4.484,0,8.126-3.631,8.126-8.115s-3.642-8.127-8.126-8.127  H231.172C226.688,253.84,223.046,257.482,223.046,261.967z"
          />
          <path
            d="M348.083,317.102c0-4.484-3.632-8.116-8.116-8.116h-142.57c-4.484,0-8.116,3.632-8.116,8.116s3.631,8.126,8.116,8.126  h142.57C344.451,325.228,348.083,321.587,348.083,317.102z"
          />
          <path
            d="M391.417,372.249c0-4.484-3.642-8.115-8.126-8.115H249.689c-4.484,0-8.116,3.631-8.116,8.115s3.631,8.116,8.116,8.116  h133.602C387.776,380.365,391.417,376.733,391.417,372.249z"
          />
        </svg>
      </div>
      <div v-if="todo.endDate" style="display: flex; align-items: center">
        <svg
          style="margin-right: 4px"
          height="16"
          id="Layer_1"
          version="1.1"
          viewBox="0 0 48 48"
          width="16"
          stroke="#fff"
          fill="#fff"
        >
          <path
            clip-rule="evenodd"
            d="M43.102,14.113c-0.331-0.579-0.684-1.143-1.064-1.688  C43.208,11.727,44,10.462,44,9c0-2.209-1.791-4-4-4c-1.462,0-2.727,0.792-3.425,1.963c-0.545-0.381-1.108-0.733-1.688-1.064  C35.939,4.167,37.826,3,40,3c3.313,0,6,2.687,6,6C46,11.174,44.832,13.061,43.102,14.113z M44,25c0,5.171-1.979,9.868-5.2,13.419  l4.915,4.915c0.381,0.381,0.381,0.999,0,1.381c-0.382,0.381-1,0.381-1.381,0L37.419,39.8C33.868,43.021,29.171,45,24,45  s-9.868-1.979-13.418-5.2l-4.916,4.915c-0.381,0.381-1,0.381-1.381,0c-0.381-0.382-0.381-1,0-1.381L9.2,38.419  C5.979,34.868,4,30.171,4,25C4,13.954,12.954,5,24,5S44,13.954,44,25z M24,7C14.059,7,6,15.059,6,25c0,9.941,8.059,18,18,18  s18-8.059,18-18C42,15.059,33.941,7,24,7z M25,28.858V38c0,0.553-0.447,1-1,1s-1-0.447-1-1v-9.142c-1.723-0.446-3-1.997-3-3.858  c0-0.749,0.219-1.441,0.578-2.041l-4.293-4.292c-0.381-0.381-0.381-1,0-1.381c0.382-0.381,1-0.381,1.381,0l4.293,4.292  C22.559,21.219,23.251,21,24,21c2.209,0,4,1.791,4,4C28,26.861,26.723,28.412,25,28.858z M24,23c-1.104,0-2,0.896-2,2s0.896,2,2,2  s2-0.896,2-2S25.104,23,24,23z M8,5C5.791,5,4,6.791,4,9c0,1.462,0.793,2.727,1.963,3.425c-0.381,0.545-0.733,1.109-1.064,1.688  C3.168,13.061,2,11.174,2,9c0-3.313,2.687-6,6-6c2.174,0,4.061,1.167,5.113,2.899c-0.58,0.331-1.144,0.683-1.688,1.064  C10.727,5.792,9.461,5,8,5z"
            fill-rule="evenodd"
          />
        </svg>
        <div>{{ todo.endDate | moment }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import moment from "moment";

export default {
  name: "todo-item",
  props : ['todoItem'],
  data: () => {
    return {
      todo: {},
      stars: [1, 2, 3, 4, 5],
    }
  },
  mounted (){
    this.todo = this.todoItem;
  },
  methods: {
    importantChange(todo, e) {
      todo.important = e.target.dataset.star
      e.target.dataset && this.updateImportant(todo);
      
    },
    deleteTodoItem(id) {
      this.removeTodo(id);
    },
    ...mapActions([
      "updateTitle",
      "checkedToggle",
      "updateImportant",
      "removeTodo",
    ]),
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
};
</script>
