import {jwtDecode} from 'jwt-decode';

export const checkTokenExpiration = (token: string): boolean => {
  if (!token) {
    return false; // Token is missing or null
  }

  try {
    console.log('token', token);
    const decodedToken: any = jwtDecode(token.replace('Bearer ', ''), {
      header: true,
    });
    console.log('decodedToken', decodedToken);
    const expirationDate: number = decodedToken.exp * 1000; // Convert seconds since epoch to milliseconds
    const currentTime: number = Date.now();
    return currentTime >= expirationDate; // Check if current time is past the expiration date
  } catch (error) {
    console.error('Error decoding token:', error);
    return true; // Assume token is invalid if decoding fails
  }
};
