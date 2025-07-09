// types/inspection/GroupTypes.ts
export interface IGroup {
  groupId: number;
  name: string;
  status: StatusEnum;
}

export enum StatusEnum {
  Active = 0,
  Inactive = 1,
}

export const GroupStatusLabel: Record<StatusEnum, string> = {
  [StatusEnum.Active]: "Active",
  [StatusEnum.Inactive]: "Inactive",
};
