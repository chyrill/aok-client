<template>
    <div>
        <p><span v-if="days < 10">0</span>{{days}} : <span v-if="hours < 10">0</span>{{hours}} : <span v-if="minutes < 10">0</span> {{minutes}} : <span v-if="seconds < 10">0</span>{{seconds}}</p>
    </div>
</template>



<script>
/* eslint-disable */

export default {
  props: {
    dateEnd: {
      type: String,
      coerce: str => Math.trunc(new Date(str).getTime() / 1000)
    }
  },
  data: () => ({
    now: Math.trunc(new Date().getTime() / 1000)
  }),
  computed: {
    seconds() {
      return (this.dateData - this.now) % 60;
    },
    minutes() {
      return Math.trunc((this.dateData - this.now) / 60) % 60;
    },
    hours() {
      return Math.trunc((this.dateData - this.now) / (60 * 60)) % 24;
    },
    days() {
      return Math.trunc((this.dateData - this.now) / (60 * 60 * 24));
    },
    dateData() {
      return Math.trunc(new Date(this.dateEnd).getTime() / 1000)
    }
  },
  mounted() {
    window.setInterval(() => {
      this.now = Math.trunc(new Date().getTime() / 1000);
    }, 1000);
  }
};
</script>

