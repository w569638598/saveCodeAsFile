<template>
  <el-button type="primary">选择</el-button>
  <div id="main"></div>
  <div class="demo">
    <FullCalendar class="demo-app-calendar" :options="calendarOptions">
      <template v-slot:eventContent="arg">
        <b>{{ arg.timeText }}</b>
        <i>{{ arg.event.title }}</i>
      </template>
    </FullCalendar>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { option } from "@/option";
import FullCalendar from "@fullcalendar/vue3";

// import dayGridPlugin from '@fullcalendar/daygrid'
// import interactionPlugin from '@fullcalendar/interaction'
// import timeGridPlugin from '@fullcalendar/timegrid'
// import { INITIAL_EVENTS } from './event-utils'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
export default {
  name: "App",
  components: {
    FullCalendar
  },
  data() {
    return {
      calendarOptions: {
        plugins: [
          // dayGridPlugin,
          // timeGridPlugin,
          // interactionPlugin, // needed for dateClick
resourceTimelinePlugin
        ],
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "resourceTimelineYear",
          
        },
        scrollTime: '08:00',
    aspectRatio: 1.5,
        editable: true,
    resourceAreaHeaderContent: 'Rooms',
        initialView: "resourceTimelineYear",
        events: 'https://fullcalendar.io/demo-events.json?single-day&for-resource-timeline',
        // initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
        // editable: true,
        // selectable: true,
        // selectMirror: true,
        // dayMaxEvents: true,
        // weekends: true,
        // select: this.handleDateSelect,
        // eventClick: this.handleEventClick,
        // eventsSet: this.handleEvents,
        resources: 'https://fullcalendar.io/demo-resources.json?with-nesting&with-colors'
        /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:
        */
      },
    };
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("main"));
    // 绘制图表
    myChart.setOption(option);
  },
  methods: {
    handleDateSelect(a){
      console.log(a)
    },
    handleEventClick(a){
      console.log(a.view.getCurrentData())
    },
    handleEvents(a){
      console.log(a)
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#main {
  width: 30%;
  height: 500px;
}
</style>
