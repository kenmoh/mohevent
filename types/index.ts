// ==== USER PARAMS
export type CreateUserParams = {
  clerkId: string;
  firstName: string;
  lastName: string;
  username: string;
  photo: string;
  email: string;
};

// ====UPDATE  USER PARAMS
export type UpdateUserParams = {
  firstName: string;
  lastName: string;
  username: string;
  photo: string;
};
