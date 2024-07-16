export async function request(url: string, options: RequestInit = {}): Promise<any> {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }
  return await response.json();
}
