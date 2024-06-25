const API_BASE_URL = "https://api.videosdk.live";
const VIDEOSDK_TOKEN = process.env.REACT_APP_VIDEOSDK_TOKEN;
const API_AUTH_URL = "";

const ENDPOINTS = {
  GET_TOKEN: "/get-token",
  CREATE_MEETING: "/v2/rooms",
  VALIDATE_MEETING: (roomId) => `/v2/rooms/validate/${roomId}`,
};

export const getToken = async () => {
  try {
    if (VIDEOSDK_TOKEN && API_AUTH_URL) {
      throw new Error("Provide only ONE PARAMETER - either Token or Auth API");
    } else if (VIDEOSDK_TOKEN) {
      return VIDEOSDK_TOKEN;
    } else if (API_AUTH_URL) {
      const res = await fetch(`${API_AUTH_URL}${ENDPOINTS.GET_TOKEN}`, {
        method: "GET",
      });
      if (!res.ok) {
        throw new Error(`Failed to fetch token: ${res.statusText}`);
      }
      const { token } = await res.json();
      return token;
    } else {
      throw new Error("Please add a token or Auth Server URL");
    }
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};

const fetchWithAuth = async (url, options) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || response.statusText);
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error.message);
    throw error;
  }
};

export const createMeeting = async ({ token }) => {
  const url = `${API_BASE_URL}${ENDPOINTS.CREATE_MEETING}`;
  const options = {
    method: "POST",
    headers: { Authorization: token, "Content-Type": "application/json" },
  };

  try {
    const data = await fetchWithAuth(url, options);
    return {
      meetingId: data.roomId || null,
      err: data.roomId ? null : data.error,
    };
  } catch (error) {
    return { meetingId: null, err: error.message };
  }
};

export const validateMeeting = async ({ roomId, token }) => {
  const url = `${API_BASE_URL}${ENDPOINTS.VALIDATE_MEETING(roomId)}`;
  const options = {
    method: "GET",
    headers: { Authorization: token, "Content-Type": "application/json" },
  };

  try {
    const data = await fetchWithAuth(url, options);
    return {
      meetingId: data.roomId || null,
      err: data.roomId ? null : data.error,
    };
  } catch (error) {
    return { meetingId: null, err: error.message };
  }
};
