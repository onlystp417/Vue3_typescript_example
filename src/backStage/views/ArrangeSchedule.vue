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
      isEdit: false,
      duringWeek: null,
      todayColor: 'todayColor',
      selectedDate: today(),
      nowDate: addToDate(parseTimestamp(today()), { day: 1 }).date,
      hoverable: true,
      focusable: true,
      focusType: [],
      calendarHeaderHeight: 120 + 10,
      cellHeight: 100,
      options: ['day', 'weekday', 'date', 'resource'],
      room: ['001', '002', 'OR1', 'OR4', 'OR5'],
      label: ['上午診', '下午診', '晚診'],
      labelInit: null,
      resources: null,
      restSchedule: {
        4: {
          休假人員: [{ name: 'Sherry', startTime: '08:00', endTime: '12:00' }],
        },
        6: {
          休假人員: [
            { name: 'Sherry', startTime: '08:00', endTime: '12:00' },
            { name: 'Vue', startTime: '08:00', endTime: '12:00' },
            { name: 'Vue', startTime: '08:00', endTime: '12:00' },
            { name: 'Vue', startTime: '08:00', endTime: '12:00' },
            { name: 'Vue', startTime: '08:00', endTime: '12:00' },
          ],
        },
        9: {
          休假人員: [
            { name: 'Sherry', startTime: '08:00', endTime: '12:00' },
            { name: 'Vue', startTime: '08:00', endTime: '12:00' },
          ],
        },
        10: {
          休假人員: [
            { name: 'Rex', startTime: '08:00', endTime: '12:00' },
            { name: 'andy', startTime: '08:00', endTime: '12:00' },
          ],
        },
      },
      singleSchedule: {
        4: {
          上午診001: [
            {
              name: '李美麗',
              startTime: '8:30',
              endTime: '12:30',
              clinic: '皮膚科 001',
              period: '上午診',
              limit: 30,
              isInterval: false,
              isPublic: true,
            },
            {
              name: '李英雄',
              startTime: '8:30',
              endTime: '12:30',
              clinic: '皮膚科 001',
              limit: 30,
              isInterval: false,
              isPublic: true,
            },
          ],
          下午診002: [
            {
              name: '李英雄',
              startTime: '8:30',
              endTime: '12:30',
              clinic: '皮膚科 001',
              limit: 30,
              isInterval: false,
              isPublic: true,
            },
          ],
          上午診OR1: [
            {
              name: '李哈哈',
              startTime: '8:30',
              endTime: '12:30',
              clinic: '皮膚科 001',
              limit: 30,
              isInterval: false,
              isPublic: true,
            },
          ],
        },
        6: {
          下午診002: [
            {
              name: '李英雄',
              startTime: '8:30',
              endTime: '12:30',
              clinic: '皮膚科 001',
              limit: 30,
              isInterval: false,
              isPublic: true,
            },
          ],
          晚診001: [],
        },
        9: {
          晚診001: [
            {
              name: '李哈哈',
              startTime: '8:30',
              endTime: '12:30',
              clinic: '皮膚科 001',
              limit: 30,
              isInterval: false,
              isPublic: false,
            },
          ],
        },
        10: {
          下午診001: [
            {
              name: '李哈哈',
              startTime: '8:30',
              endTime: '12:30',
              clinic: '皮膚科 001',
              limit: 30,
              isInterval: false,
              isPublic: true,
            },
          ],
          晚診001: [
            {
              name: '李哈哈',
              startTime: '8:30',
              endTime: '12:30',
              clinic: '皮膚科 001',
              limit: 30,
              isInterval: false,
              isPublic: true,
            },
          ],
          晚診002: [
            {
              name: '李哈哈',
              startTime: '8:30',
              endTime: '12:30',
              clinic: '皮膚科 001',
              limit: 30,
              isInterval: false,
              isPublic: true,
            },
          ],
        },
      },
      weekSchedule: {
        1: {
          下午診001: [
            {
              name: '李哈哈',
              startTime: '8:30',
              endTime: '12:00',
              clinic: '皮膚科 001',
              limit: 30,
              isInterval: true,
              isPublic: true,
            },
          ],
        },
        6: {
          晚診002: [
            {
              name: '李哈哈',
              startTime: '8:30',
              endTime: '12:30',
              clinic: '皮膚科 001',
              limit: 30,
              isInterval: true,
              isPublic: false,
            },
          ],
        },
      },
    };
  },
  mounted() {
    this.labelInit = this.labelPositionInit();
    this.getLabelPosition(this.labelInit);
    this.resources = this.getResourceData(this.label, this.room);
  },
  methods: {
    getHeaderHeight() {
      return this.$refs.myCalendarHeader;
    },
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
    getResourceData(labelData, roomData) {
      const resources = [];
      for (let i = 0; i < labelData.length; i++) {
        for (let j = 0; j < roomData.length; j++) {
          resources.push({
            label: labelData[i] + roomData[j],
            room: roomData[j],
          });
        }
      }
      resources.forEach((item, index) => {
        resources[index].id = index + 1;
        resources[index].height = this.cellHeight;
      });
      resources.unshift({ id: 0, label: '休假人員', height: 100 });
      return resources;
    },
    getLabelPosition(labelInitArray) {
      labelInitArray.forEach((item, index) => {
        if (index) {
          labelInitArray[index].top = this.doTopDistance(labelInitArray, index);
        }
      });
    },
    labelPositionInit() {
      const labelInitArray = this.label.map((item, index) => {
        return {
          name: item,
          top: this.calendarHeaderHeight + 30 + this.cellHeight + 3 + 3,
          height:
            this.cellHeight * this.room.length + (this.room.length - 1) * 1.5,
          backgroundColor:
            index === 0 || index === 2 ? 'rgb(236, 235, 235)' : 'white',
        };
      });
      return labelInitArray;
    },
    doTopDistance(labelInitArray, index) {
      const firstDistance =
        this.calendarHeaderHeight + 30 + this.cellHeight + 3 + 3;
      if (index === 0) {
        return firstDistance;
      } else {
        return (
          labelInitArray[index - 1].top +
          labelInitArray[index - 1].height +
          (parseInt(this.room.length / 2) * 1.5 - index)
        );
      }
    },
    getTimeDuring(startTime, endTime) {
      const startTimeArray = startTime.split(':');
      const endTimeArray = endTime.split(':');
      const hours = Number(endTimeArray[0]) - Number(startTimeArray[0]);
      const minutes = Number(endTimeArray[1]) - Number(startTimeArray[1]);
      if (hours) {
        return hours + '時' + minutes + '分';
      } else {
        return minutes + '分';
      }
    },
    getTimeDuring1(startTime, endTime) {
      const startTimeArray = startTime.split(':');
      const endTimeArray = endTime.split(':');
      const hours = Number(endTimeArray[0]) - Number(startTimeArray[0]);
      const minutes = Number(endTimeArray[1]) - Number(startTimeArray[1]);
      return (hours * 60 + minutes) / 60 + 'H';
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
    onClickDate(data) {
      console.log('onClickDate', data);
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
    isEdit : {{ isEdit }} ,myCalendarHeader: {{ getHeaderHeight() }},
    labelPosition: {{ this.labelInit }}
    <div class="subcontent myCalendar">
      <div class="row justify-center myCalendar--layout">
        <div class="myCalendar__container">
          <div
            class="myCalendar__header row justify-between"
            ref="myCalendarHeader"
          >
            <div class="edit__container column justify-end q-gutter-sm">
              <q-btn size="md" color="blue-grey-2" text-color="black" dense>
                編輯模式
                <q-toggle v-model="isEdit" size="xs" />
              </q-btn>

              <q-btn outline size="md" color="purple-5" text-color="black">
                <q-icon
                  left
                  name="fa-regular fa-calendar-plus"
                  color="black"
                  size="xs"
                ></q-icon>
                新增週期排班
              </q-btn>
            </div>
            <div class="filter__container column items-center justify-center">
              <div class="during_week">
                <p style="font-size: 30px">
                  {{ duringWeek }}
                </p>
              </div>
              <div class="filter-group row justify-center q-gutter-sm">
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
            <div class="download__container column justify-center q-gutter-sm">
              <div class="myNavigation">
                <navigation-bar
                  @today="onToday"
                  @prev="onPrev"
                  @next="onNext"
                />
              </div>
              <q-btn size="md" color="accent">
                <q-icon
                  left
                  name="fa-solid fa-eye"
                  size="xs"
                  color="blue-grey-1"
                ></q-icon>
                快速發佈</q-btn
              >
              <q-btn size="md" outline color="white" text-color="black">
                <q-icon
                  left
                  name="fa-solid fa-download"
                  size="xs"
                  color="black"
                ></q-icon>
                下載 excel 檔
              </q-btn>
            </div>
          </div>
          <template v-for="cross in this.labelInit">
            <div
              class="resources-container__cross"
              :style="{
                top: `${cross['top']}px`,
                height: `${cross['height']}px`,
                backgroundColor: `${cross['backgroundColor']}`,
              }"
            >
              <input v-if="isEdit" type="checkbox" />
              <p v-for="name in cross.name">{{ name }}</p>
              <div class="cross__time">
                <p>8:30</p>
                <p>~</p>
                <p>12:30</p>
              </div>
            </div>
          </template>
          <div class="qcalendar__container">
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
              bordered
              style="width: 100%"
              cell-width="200px"
              @change="onWeek"
              @moved="onMoved"
              @click-date="onClickDate"
            >
              <!-- <template #head-day-event>
                  <div>hello</div>
                </template> -->
              <template #head-day="{ scope }">
                <div class="qcalendar__header">
                  <div class="qcalendar__checkbox">
                    <input v-show="isEdit" type="checkbox" />
                  </div>
                  <div class="qcalendar__header__day">
                    <span>星期{{ whichWeek(scope.timestamp.weekday) }} </span>
                    <span
                      :class="
                        selectedDate === scope.timestamp.date
                          ? 'todayColor'
                          : ''
                      "
                      >{{ scope.timestamp.day }}</span
                    >
                  </div>
                  <div class="qcalendar__header__feature row items-center">
                    <q-btn
                      v-show="isEdit"
                      size="xs"
                      style="color: purple; background: pink"
                      padding="2px"
                      dense
                      unelevated
                    >
                      貼上
                    </q-btn>
                    <q-icon
                      v-show="!isEdit"
                      name="fa-regular fa-calendar-plus"
                      color="accent"
                    ></q-icon>
                  </div>
                </div>
              </template>
              <template #head-resources>
                <div
                  style="
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  "
                >
                  <span>診間/診次</span>
                </div>
              </template>
              <template #resource-label="{ scope: { resource } }">
                <div
                  class="resources-container"
                  v-if="resource.label === '休假人員'"
                  style="font-size: 16px; font-weight: bold"
                >
                  {{ resource.label }}
                </div>
                <template v-for="item in resources">
                  <div
                    class="resources-container"
                    v-if="resource.label === item.label"
                  >
                    <div></div>
                    <div
                      class="resources-container__label"
                      v-if="item.label !== '休假人員'"
                    >
                      <input v-if="isEdit" type="checkbox" />
                      <p>{{ item.room }}</p>
                    </div>
                  </div>
                </template>
              </template>
              <!-- <template #resource-days="{ scope }">
                  <p>22</p>
                </template> -->
              <template #day="{ scope }">
                <template v-for="r in getRestSchedule(scope)" :key="r.name">
                  <div class="qcalendar__day__rest row justify-between">
                    <p>{{ r.startTime }} ~ {{ r.endTime }}</p>
                    <p>{{ r.name }} 醫師</p>
                    <q-btn
                      size="xs"
                      outline
                      text-color="black"
                      dense
                      style="background: white"
                    >
                      {{ getTimeDuring1(r.startTime, r.endTime) }}
                    </q-btn>
                  </div>
                </template>
                <div class="qcalendar__day">
                  <div class="qcalendar__day__card-group">
                    <template
                      v-for="s in getSingleSchedule(scope)"
                      :key="s.name + s.time"
                    >
                      <div
                        class="qcalendar__day__single column justify-between"
                        :class="
                          s.isPublic
                            ? 'qcalendar__day__single--public'
                            : 'qcalendar__day__single--draft'
                        "
                      >
                        <div v-if="isEdit" class="row justify-between">
                          <input type="checkbox" />
                          <div>
                            <q-icon
                              name="fa-solid fa-trash-can"
                              size="xs"
                              color="negative"
                            ></q-icon>
                            <q-icon
                              name="fa-solid fa-clone"
                              size="xs"
                              color="primary"
                            ></q-icon>
                          </div>
                        </div>
                        <p class="q-mb-none">
                          {{ s.startTime + '~' + s.endTime }} ({{
                            getTimeDuring(s.startTime, s.endTime)
                          }})
                        </p>
                        <div class="row q-gutter-xs">
                          <div
                            class="q-mb-none row justify-center items-center"
                            :class="
                              s.isPublic
                                ? 'qcalendar__day__single--public__clinic-name '
                                : 'qcalendar__day__single--draft__clinic-name '
                            "
                          >
                            皮
                          </div>
                          <div>
                            <p class="q-mb-none">{{ s.name }} 醫生</p>
                            <p class="q-mb-none">
                              上限
                              <span style="font-weight: bold">
                                {{ s.limit }}
                              </span>
                              位
                            </p>
                          </div>
                        </div>
                        <div class="row justify-between items-center">
                          <q-btn
                            size="12px"
                            flat
                            style="color: black; background: lightgray"
                            padding="2px"
                            dense
                          >
                            {{ s.isInterval ? '週期排班' : '單筆排班' }}
                          </q-btn>
                          <q-btn
                            v-if="s.isPublic"
                            size="12px"
                            flat
                            style="color: black; background: gold"
                            padding="2px"
                            dense
                          >
                            已發佈
                          </q-btn>
                          <q-btn
                            v-else
                            size="12px"
                            outline
                            style="color: black"
                            padding="2px"
                            dense
                          >
                            草稿
                          </q-btn>
                        </div>
                      </div>
                    </template>
                    <template
                      v-for="w in getWeekSchedule(scope)"
                      :key="w.name + w.time"
                    >
                      <div
                        class="qcalendar__day__week column justify-between"
                        :class="
                          w.isPublic
                            ? 'qcalendar__day__week--public'
                            : 'qcalendar__day__week--draft'
                        "
                      >
                        <div v-if="isEdit" class="row justify-between">
                          <input type="checkbox" />
                          <div>
                            <q-icon
                              name="fa-solid fa-trash-can"
                              size="xs"
                              color="negative"
                            ></q-icon>
                            <q-icon
                              name="fa-solid fa-clone"
                              size="xs"
                              color="primary"
                            ></q-icon>
                          </div>
                        </div>
                        <p class="q-mb-none">
                          {{ w.startTime + '~' + w.endTime }} ({{
                            getTimeDuring(w.startTime, w.endTime)
                          }})
                        </p>
                        <div class="row q-gutter-xs">
                          <div
                            class="q-mb-none row justify-center items-center"
                            :class="
                              w.isPublic
                                ? 'qcalendar__day__week--public__clinic-name '
                                : 'qcalendar__day__week--draft__clinic-name '
                            "
                          >
                            皮
                          </div>
                          <div>
                            <p class="q-mb-none">{{ w.name }} 醫師</p>
                            <p class="q-mb-none">
                              上限
                              <span style="font-weight: bold">
                                {{ w.limit }}
                              </span>
                              位
                            </p>
                          </div>
                        </div>
                        <div class="row justify-between items-center">
                          <q-btn
                            size="12px"
                            flat
                            style="color: black; background: lightgray"
                            padding="2px"
                            dense
                          >
                            {{ w.isInterval ? '週期排班' : '單筆排班' }}
                          </q-btn>
                          <q-btn
                            v-if="w.isPublic"
                            size="12px"
                            flat
                            style="color: black; background: gold"
                            padding="2px"
                            dense
                          >
                            已發佈
                          </q-btn>
                          <q-btn
                            v-else
                            size="12px"
                            outline
                            style="color: black"
                            padding="2px"
                            dense
                          >
                            草稿
                          </q-btn>
                        </div>
                      </div>
                    </template>
                  </div>
                  <template v-if="scope.resource.label !== '休假人員'">
                    <q-icon
                      v-show="!isEdit"
                      name="fa-regular fa-calendar-plus"
                      color="accent"
                    ></q-icon>
                  </template>
                </div>
              </template>
            </q-calendar-scheduler>
          </div>
        </div>
      </div>
    </div>
    <pre>
      {{ resources }}
    </pre>
  </div>
</template>

<style lang="scss">
@mixin cross {
  position: absolute;
  left: 0;
  z-index: 2;
  width: 60px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  font-size: 16px;
  font-weight: bold;
  border-right: 1.5px solid rgb(197, 195, 195);
  border-left: 1.5px solid rgb(197, 195, 195);
}

.myCalendar {
  --calendar-border: #bebebeff 1.5px solid;

  .qcalendar__container {
    width: 100%;
  }

  .row.justify-center.myCalendar--layout {
    max-width: 1500px;
    width: 100%;
    margin: 0 auto;
  }
  &__container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    position: relative;
    gap: 10px;
    width: 100%;
    padding: 0;

    .resources-container {
      position: relative;
      display: grid;
      grid-template-columns: 55px 40px;

      &__cross {
        @include cross;

        .cross__time {
          text-align: center;
          font-size: 15px;
          font-weight: 400;
        }
      }

      &__label {
        text-align: center;
        margin: 0;
      }
    }
  }
  &__header {
    width: 100%;
  }
  .qcalendar__header {
    padding: 5px;
    height: 30px;

    display: grid;
    grid-template-columns: 0.5fr 4fr 1.5fr;
    justify-content: space-between;
    flex-direction: row;
    font-size: 14px;
    .qcalendar__checkbox {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    &__day {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 3px;
    }

    &__feature {
      display: flex;
      justify-content: flex-end;
    }
  }

  .qcalendar__day {
    padding: 5px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    &__card-group {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    &__rest {
      padding: 2px;
      color: black;
      background-color: rgb(241, 220, 229);
      border: 1px solid rgb(248, 121, 159);
      margin: 3px;
      p {
        margin: 0;
      }
    }

    &__single {
      color: black;
      width: 150px;
      font-size: 14px;
      padding: 3px;

      &--draft {
        outline: dashed 1px gray;
        background-color: white;

        &__clinic-name {
          height: 30px;
          width: 30px;
          border-radius: 2px;
          outline: pink 1px solid;
        }
      }
      &--public {
        outline: 1px solid gray;
        background-color: rgb(218, 235, 244);

        &__clinic-name {
          height: 30px;
          width: 30px;
          border-radius: 2px;
          background-color: rgb(253, 205, 234);
        }
      }
    }

    &__week {
      color: black;
      width: 150px;
      font-size: 14px;
      padding: 3px;

      &--draft {
        outline: dashed 1px gray;
        background-color: white;

        &__clinic-name {
          height: 30px;
          width: 30px;
          border-radius: 2px;
          outline: rgb(242, 145, 35) 1px solid;
        }
      }
      &--public {
        outline: 1px solid gray;
        background-color: rgb(250, 216, 175);

        &__clinic-name {
          height: 30px;
          width: 30px;
          border-radius: 2px;
          background-color: rgb(255, 179, 0);
        }
      }
    }
  }
}

// 設定背景顏色
.myCalendar .q-calendar-scheduler__resource--row {
  .q-calendar-scheduler__resource--days {
    &:first-child {
      background-color: red;
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

.todayColor {
  color: orange;
}
</style>
