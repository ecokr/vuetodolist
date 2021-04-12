<template>
  <div
    v-on:click.prevent.stop
    style="
      max-width: 350px;
      width: 100%;
      padding: 20px;
      display: flex;
      flex-flow: column;
      margin: 4px;
      border: 1px solid #999;
      background: #151516;
    "
    v-if="$store.state.selectedTodo"
  >
    <div style="margin-bottom: 16px">
      <div
        style="
          margin-right: 4px;
          font-weight: bold;
          text-align: left;
          display: flex;
          justify-content: space-between;
        "
      >
        EndDate
        <div
          class="xbtn"
          v-on:click="removeEndDate"
          style="
            width: 24px;
            height: 24px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
          "
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
      <datepicker
        :format="`yyyy-MM-dd`"
        v-on:click.prevent.stop
        v-model="$store.state.selectedTodo.endDate"
        @closed="updateEndDate($store.state.selectedTodo.endDate)"
      ></datepicker>
    </div>
    <div>
      <div
        style="
          margin-right: 4px;
          font-weight: bold;
          text-align: left;
          display: flex;
          justify-content: space-between;
        "
      >
        Memo
        <div
          class="xbtn"
          v-on:click="removeMemo"
          style="
            width: 24px;
            height: 24px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
          "
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
      <textarea
        placeholder="plz insert Memo"
        v-autogrow
        v-on:keyup.enter="updateMemo($store.state.selectedTodo.memo)"
        v-model="$store.state.selectedTodo.memo"
        style="max-height: 300px; width: 100%"
        v-on:blur="updateMemo($store.state.selectedTodo.memo)"
      />
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import moment from "moment";
import Datepicker from "vuejs-datepicker";
import { TextareaAutogrowDirective } from "vue-textarea-autogrow-directive";

export default {
  name: "todo-edit",
  props : ['id'],
  data: () => {
    return {
      todo: {},
      stars: [1, 2, 3, 4, 5],
    }
  },
  mounted (){
    this.todo =  this.$store.state.todos.find(todo => todo.id === this.id);
  },
  methods: {
    removeMemo() {
      this.$store.state.selectedTodo.memo = "";
      this.updateMemo(this.$store.state.selectedTodo);
    },
    removeEndDate() {
      this.$store.state.selectedTodo.endDate = null;
      this.updateEndDate(this.$store.state.selectedTodo.endDate);
    },
    ...mapActions([
      "updateMemo",
      "updateEndDate",
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
  directives: {
    autogrow: TextareaAutogrowDirective,
  },
  components: {
    Datepicker,
  },
};
</script>