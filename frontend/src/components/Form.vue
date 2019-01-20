<template>
  <div class="input-form">
    <input name="user" type="text" v-model="username" />
    <input name="pass" type="password" v-model="password" />
    <button v-on:click="getTranscript()"></button>
    <p>{{ username }}</p>
    <p>{{ password }}</p>
    <p>{{ transcript }}</p>
  </div>
</template>

<script>
import { APIService } from "../APIService";

const API_URL = "http://localhost:3000";
const apiService = new APIService();

export default {
  name: "Form",
  data: function() {
    return {
      transcript: [],
      currAction: "/getTranscript",
      username: "",
      password: ""
    };
  },
  methods: {
    getTranscript() {
      apiService
        .getTranscript({
          username: this.username,
          password: this.password
        })
        .then(data => {
          this.transcript = data;
          console.log(data);
        });
    }
  },
  props: {
    msg: String
  }
};
</script>
