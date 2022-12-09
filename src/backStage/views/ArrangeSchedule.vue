<script>
import {
  QCalendarScheduler,
  today,
  addToDate,
  parseTimestamp,
} from '@quasar/quasar-ui-qcalendar/src/index.js';
import '@quasar/quasar-ui-qcalendar/src/QCalendarVariables.sass';
import '@quasar/quasar-ui-qcalendar/src/QCalendarTransitions.sass';
import '@quasar/quasar-ui-qcalendar/src/QCalendarScheduler.sass';
import { defineComponent } from 'vue';
import NavigationBar from '../components/NavigationBar.vue';
export default defineComponent({
  name: '',
  components: {
    NavigationBar,
    QCalendarScheduler,
  },
  data() {
    return {
      shape: false,
      duringWeek: null,
      todayColor: 'todayColor',
      selectedDate: today(),
      nowDate: addToDate(parseTimestamp(today()), { day: 1 }).date,
      hoverable: true,
      focusable: true,
      focusType: [],
      options: ['day', 'weekday', 'date', 'resource'],
      resources: [
        { id: 0, label: '休假人員', height: 50 },
        {
          id: 1,
          label: '上午診001',
          number: '001',
          height: 100,
        },
        {
          id: 2,
          label: '上午診002',
          number: '002',
          title: '8:30-12:30',
          height: 100,
        },
        {
          id: 3,
          label: '上午診OR1',
          number: 'OR1',
          height: 100,
        },
        {
          id: 4,
          label: '下午診001',
          number: '001',
          title: '14:00-17:00',
          height: 100,
        },
        {
          id: 5,
          label: '下午診002',
          number: '002',
          height: 100,
        },
        {
          id: 6,
          label: '下午診OR1',
          number: 'OR1',
          height: 100,
        },
        {
          id: 7,
          label: '晚診001',
          number: '001',
          title: '18:00-20:30',
          height: 100,
        },
        {
          id: 8,
          label: '晚診002',
          number: '002',
          height: 100,
        },
        {
          id: 9,
          label: '晚診OR1',
          number: 'OR1',
          height: 100,
        },
      ],
      restSchedule: {
        4: {
          休假人員: [{ name: 'Sherry', time: '08:00 ~ 12:00' }],
        },
        6: {
          休假人員: [{ name: 'Sherry' }, { name: 'Vue' }],
        },
        9: {
          休假人員: [{ name: 'Sherry' }, { name: 'Vue' }],
        },
        10: {
          休假人員: [{ name: 'Rex' }, { name: 'andy' }],
        },
      },
      singleSchedule: {
        4: {
          上午診001: [
            { name: '李美麗醫師', type: '單筆' },
            { name: '李英雄醫師', type: '單筆' },
          ],
          下午診002: [{ name: '李英雄醫師', type: '單筆' }],
          上午診OR1: [{ name: '李哈哈醫師', type: '單筆' }],
        },
        6: {
          下午診002: [{ name: '李英雄醫師', type: '單筆' }],
        },
        9: {
          晚診001: [{ name: '李哈哈醫師', type: '單筆' }],
        },
        10: {
          下午診001: [{ name: '李哈哈醫師', type: '單筆' }],
          晚診001: [{ name: '李哈哈醫師', type: '單筆' }],
          晚診002: [{ name: '李哈哈醫師', type: '單筆' }],
        },
      },
      weekSchedule: {
        1: {
          下午診001: [{ name: '李哈哈醫師', type: '週期' }],
        },
        6: {
          晚診002: [{ name: '李哈哈醫師', type: '週期' }],
        },
      },
    };
  },
  methods: {
    getRestSchedule(scope) {
      const resource = scope.resource.label;
      const result = this.restSchedule[scope.timestamp.day];
      return result && result[resource];
    },
    getSingleSchedule(scope) {
      // 這裡是決定每一格要放什麼
      const resource = scope.resource.label;
      const result = this.singleSchedule[scope.timestamp.day];
      // 每一個day都會跑一次
      // 已經對好label每一個要進去哪裡
      // console.log("day", scope.timestamp.day, "result=======>", result);
      return result && result[resource];
    },
    getWeekSchedule(scope) {
      // 指定週期資料
      const result = this.weekSchedule[scope.timestamp.weekday];
      const resource = scope.resource.label;
      return result && result[resource];
    },
    getAgenda(day) {
      return this.agenda[parseInt(day.day)];
    },
    onToday() {
      this.$refs.calendar.moveToToday();
    },
    onPrev() {
      this.$refs.calendar.prev();
    },
    onNext() {
      this.$refs.calendar.next();
    },
    onMoved(data) {
      console.log('onMoved', data);
    },
    onChange(data) {
      console.log('onChange', data);
    },
    onWeek(data) {
      const start = data.start.split('-');
      const end = data.end.split('-');
      const startWeekDate = start[1] + '/' + start[2];
      const endWeekDate = end[1] + '/' + end[2];
      const year = start[0];
      const total = startWeekDate + ' ~ ' + endWeekDate + ', ' + year;
      this.duringWeek = total;
      return total;
    },
    onClickDate(data) {
      console.log('onClickDate', data);
    },
    onClickDayResource(data) {
      console.log('onClickDayResource', data);
    },
    onClickResource(data) {
      console.log('onClickResource', data);
    },
    onClickHeadResources(data) {
      console.log('onClickHeadResources', data);
    },
    onClickHeadDay(data) {
      console.log('onClickHeadDay', data);
    },
    whichWeek(week) {
      switch (week) {
        case 0:
          return '日';
        case 1:
          return '一';
        case 2:
          return '二';
        case 3:
          return '三';
        case 4:
          return '四';
        case 5:
          return '五';
        case 6:
          return '六';
      }
    },
  },
});
</script>

<template>
  <div class="calendar">
    <div
      class="subcontent myCalendar"
      style="display: flex; justify-content: center; flex-direction: column"
    >
      <div class="row justify-center">
        <div
          style="
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
            position: relative;
            width: fit-content;
            padding: 0;
          "
        >
          <div class="myCalendar__header">
            <div class="edit__container">
              <q-btn color="blue-grey-2" text-color="black">
                編輯模式
                <q-toggle size="sm" v-model="shape" val="sm" />
              </q-btn>

              <q-btn outline color="purple-5" text-color="black">
                新增週期排班
              </q-btn>
            </div>
            <div class="filter__container">
              <div class="during_week">
                <p style="font-size: 30px">
                  {{ duringWeek }}
                </p>
              </div>
              <div class="filter-group">
                <div class="total-number">
                  <select name="" id="">
                    <option value="">1</option>
                  </select>
                </div>
                <div class="total-room">
                  <select name="" id="">
                    <option value="">1</option>
                  </select>
                </div>
                <div class="total-doctor">
                  <select name="" id="">
                    <option value="">1</option>
                  </select>
                </div>
                <div class="total-staff">
                  <select name="" id="">
                    <option value="">1</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="download__container">
              <div class="myNavigation">
                <navigation-bar
                  @today="onToday"
                  @prev="onPrev"
                  @next="onNext"
                />
              </div>
              <q-btn style="background-color: #dcb5ff">快速發佈</q-btn>
              <q-btn outline color="white" text-color="black">
                下載 excel 檔
              </q-btn>
            </div>
          </div>
          <div class="resources-container__cross cross-am">
            <p>上</p>
            <p>午</p>
            <p>診</p>
            <div class="cross__time">
              <p>8:30</p>
              <p>~</p>
              <p>12:30</p>
            </div>
          </div>
          <div class="resources-container__cross cross-pm">
            <p>下</p>
            <p>午</p>
            <p>診</p>
            <div class="cross__time">
              <p>14:30</p>
              <p>~</p>
              <p>18:30</p>
            </div>
          </div>
          <div class="resources-container__cross cross-ng">
            <p>晚</p>
            <p></p>
            <p>診</p>
            <div class="cross__time">
              <p>19:00</p>
              <p>~</p>
              <p>21:30</p>
            </div>
          </div>
          <q-calendar-scheduler
            ref="calendar"
            locale="zh-HANT"
            v-model="selectedDate"
            v-model:model-resources="resources"
            view="week"
            :now="nowDate"
            :hoverable="hoverable"
            :focusable="focusable"
            :focus-type="focusType"
            animated
            bordered
            style="width: 100%"
            cell-width="120px"
            @change="onWeek"
            @moved="onMoved"
            @click-date="onClickDate"
            @click-day-resource="onClickDayResource"
            @click-resource="onClickResource"
            @click-head-resources="onClickHeadResources"
            @click-head-day="onClickHeadDay"
          >
            <!-- <template #head-day-event>
                <div>hello</div>
              </template> -->
            <template #head-day="{ scope }">
              <div
                style="
                  font-size: 13px;
                  display: flex;
                  flex-direction: row;
                  justify-content: space-between;
                "
              >
                <input type="checkbox" />
                <span>星期{{ whichWeek(scope.timestamp.weekday) }} </span>
                <span
                  :class="
                    selectedDate === scope.timestamp.date ? 'todayColor' : ''
                  "
                  >{{ scope.timestamp.day }}</span
                >
                <button
                  style="font-size: 10px; margin: 0; border: 1px gray solid"
                >
                  貼上
                </button>
              </div>
            </template>
            <template #head-resources>
              <div style="width: 100%">
                <span>診間/診次</span>
              </div>
            </template>
            <template #resource-label="{ scope: { resource } }">
              <div
                class="resources-container"
                v-if="resource.label === '休假人員'"
              >
                {{ resource.label }}
              </div>
              <template v-for="item in resources">
                <div
                  class="resources-container"
                  v-if="resource.label === item.label"
                >
                  <div></div>
                  <p class="resources-container__label">{{ item.number }}</p>
                </div>
              </template>
            </template>
            <!-- <template #resource-days="{ scope }">
                <p>22</p>
              </template> -->
            <template #day="{ scope }">
              <template v-for="r in getRestSchedule(scope)" :key="r.name">
                <div style="background-color: yellow">
                  {{ r.name }}
                </div>
              </template>
              <template
                v-for="s in getSingleSchedule(scope)"
                :key="s.name + s.time"
              >
                <div style="background-color: pink">
                  <span>{{ s.name }}</span>
                  <span> {{ s.time }}</span>
                  <p>{{ s.type }}</p>
                </div>
              </template>
              <template
                v-for="w in getWeekSchedule(scope)"
                :key="w.name + w.time"
              >
                <div style="background-color: goldenrod">
                  <span>{{ w.name }}</span>
                  <p>{{ w.type }}</p>
                </div>
              </template>
            </template>
          </q-calendar-scheduler>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.myCalendar {
  --calendar-border: #bebebeff 1.5px solid;

  &__header {
    display: flex;
    justify-content: space-between;

    flex-direction: row;
    width: 100%;

    .edit__container {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
    }

    .filter__container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .filter-group {
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 10px;
      }
    }

    .download__container {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      .myNavigation {
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
    }
  }
}

.myCalendar .q-calendar-scheduler__resource--row {
  .q-calendar-scheduler__resource--days {
    &:first-child {
      max-height: 50px;
    }
    &:not(:first-child) {
      max-height: 100px;
    }
  }
  .q-calendar-scheduler__day.q-past-day,
  .q-calendar-scheduler__day.q-current-day {
    overflow: scroll;
  }

  &:nth-child(3) {
    background-color: rgb(236, 235, 235);
    .q-calendar-scheduler__resource.q-calendar__sticky.q-calendar__hoverable {
      background-color: rgb(236, 235, 235);
    }
  }
  &:nth-child(4) {
    background-color: rgb(236, 235, 235);
    .q-calendar-scheduler__resource.q-calendar__sticky.q-calendar__hoverable {
      background-color: rgb(236, 235, 235);
    }
  }
  &:nth-child(5) {
    background-color: rgb(236, 235, 235);
    .q-calendar-scheduler__resource.q-calendar__sticky.q-calendar__hoverable {
      background-color: rgb(236, 235, 235);
    }
  }
  &:nth-child(9) {
    background-color: rgb(236, 235, 235);
    .q-calendar-scheduler__resource.q-calendar__sticky.q-calendar__hoverable {
      background-color: rgb(236, 235, 235);
    }
  }
  &:nth-child(10) {
    background-color: rgb(236, 235, 235);
    .q-calendar-scheduler__resource.q-calendar__sticky.q-calendar__hoverable {
      background-color: rgb(236, 235, 235);
    }
  }
  &:nth-child(11) {
    background-color: rgb(236, 235, 235);
    .q-calendar-scheduler__resource.q-calendar__sticky.q-calendar__hoverable {
      background-color: rgb(236, 235, 235);
    }
  }
}

@mixin cross($top, $height, $bgGray) {
  position: absolute;
  top: $top;
  left: 0;
  height: $height;
  z-index: 2;
  width: 60px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  font-size: 14px;
  font-weight: bold;
  background-color: $bgGray;
  border-right: 1.5px solid rgb(197, 195, 195);
  border-left: 1.5px solid rgb(197, 195, 195);
}

.todayColor {
  color: orange;
}
.resources-container {
  position: relative;
  display: grid;
  grid-template-columns: 55px 40px;

  &__cross {
    .cross__time {
      text-align: center;
      font-size: 12px;
      font-weight: 400;
    }

    &.cross-am {
      @include cross(234px, 303px, rgb(236, 235, 235));
    }

    &.cross-pm {
      @include cross(539px, 303px, white);
    }

    &.cross-ng {
      @include cross(843px, 303px, rgb(236, 235, 235));
    }
  }

  &__label {
    text-align: center;

    margin: 0;
  }
}
</style>
