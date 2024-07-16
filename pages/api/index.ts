import { ProfileFormValues } from '../../validator/profile';
import { request } from './request';

export async function fetchUserData() {
  return await request('/api/user');
}

export async function saveUserData(userData: ProfileFormValues) {
  const response = await request('/api/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  return response;
}
