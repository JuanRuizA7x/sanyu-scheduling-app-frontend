import { ScheduleExtension } from "./schedule-extension.interface";
import { Schedule } from "./schedule.interface";

export interface WorkShift {
  workShiftId:          number,
  date:                 string;
  schedule:             Schedule,
  userId:               number,
  scheduleExtensions:   ScheduleExtension[],
  isStarted:            string,
  startedAt:            string
}
