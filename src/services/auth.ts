const BASE_URL = process.env.REACT_APP_BASE_URL;

export type LoginResponse = {
  access_token: string;
};

export const handleLogin = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/auth/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data: LoginResponse = await response.json();
    return data;

  } catch (error) {
    throw new Error(`API auth failed: ${error}`);
  }
};
