const API_BASE_URL = "http://localhost:3087";

export async function fetchdata(endpoint, options = {}) {
 
  const token = localStorage.getItem("token");
  let total_options;


  let fetch_options = {
    headers: {
      Authorization: "Bearer" + " " + `${token}`,
    },
  };
  total_options = { ...fetch_options };

  if (Object.keys(options).length !== 0) {
    if (Object.prototype.hasOwnProperty.call(options, "headers")) {
      options.headers = {
        Authorization: "Bearer" + " " + `${token}`,
        ...options.headers,
      };
    } else {
      options.headers = {
        Authorization: "Bearer" + " " + `${token}`,
      };
    }
    total_options = { ...options };
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, total_options);
    if (!response.ok) {
      localStorage.clear();
      location.reload();
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    handleError(error);
  }
}

const handleError = (error) => {
  console.error("API call error:", error.message);
  throw error; // Re-throw the error after logging
};
