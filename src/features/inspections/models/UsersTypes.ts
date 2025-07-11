export enum UserStatus {
  Unauthorized = 0,
  Admin = 1,
  Mechanic = 2,
}

export const UserStatusLabel: Record<UserStatus, string> = {
  [UserStatus.Unauthorized]: "Sin autorización",
  [UserStatus.Admin]: "Admin",
  [UserStatus.Mechanic]: "Mechanic",
};
