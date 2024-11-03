export const CreateUserMessages = {
  email: {
    invalidFormat: 'email must be a valid address'
  },
  avatarUrl: {
    invalidFormat: 'avatarPath is required',
  },
  name: {
    invalidFormat: 'firstname is required',
    lengthField: 'min length is 1, max is 15',
  },
  password: {
    invalidFormat: 'password is required',
    lengthField: 'min length for password is 6, max is 12'
  },
  type: {
    invalidFormat: 'type must be one of: pro, обычный'
  }
} as const;
