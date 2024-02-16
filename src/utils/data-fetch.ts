// Datafetch

class FetchError extends Error {
  status: number;
  info: any;

  constructor(message: string, status: number, info: any) {
    super(message);
    this.status = status;
    this.info = info;
  }
}

// General data fetch async function
async function dataFetch(endpoint: string, successMessage: string = "Datafetch successful") {
  // General fetch response
  console.log(`${process.env.BASE_URL}${endpoint}`)
  const response = await fetch(`http://127.0.0.1:8000${endpoint}`// ${process.env.BASE_URL
    // , { 
    // headers: {
       // JWT Token Authorität HTTP header
    //   Authorization: `Bearer ${process.env.PUBLIC_BAERER}`, // Baerer !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // },
    // }
  );

  // check ob response ok ist
  if (!response.ok) {
    const info = await response.json();
      throw new FetchError(
        "An error ocurred while fetching the data.",
        response.status,
        info
      );
  }

  console.log(successMessage);

  // return response json um Datenzugang in den components zu erhalten
  return response.json();
}

export default dataFetch;