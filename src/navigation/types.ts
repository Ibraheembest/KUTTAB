export type RootStackParamList = {
  Students: undefined;
  Halaqat: undefined;
  Attendance: undefined;
  Progress: undefined;
  Leaderboard: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
