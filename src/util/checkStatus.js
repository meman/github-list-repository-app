// simple wrapper arround the checking if a fetch response is valid
export default (response) => {
  if (response.ok) {
    return response;
  }
  const error = new Error(response.statusText);
  // attach the response to intract later if needed
  error.response = response;
  throw error;
};
