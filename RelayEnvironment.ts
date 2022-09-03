// your-app-name/src/RelayEnvironment.js
import Constants from "expo-constants";
import {
  Environment,
  Network,
  RecordSource,
  Store,
  RequestParameters,
  Variables,
} from "relay-runtime";
import axios from "axios";

const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
  timeout: 10000,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error("axios error", JSON.stringify(error));
    throw error;
  }
);

async function fetchGraphQL(text: string, variables: Variables) {
  try {
    const data = await axiosInstance.post(
      `${Constants.manifest?.extra?.apiRoot}${Constants.manifest?.extra?.graphqlPath}`,
      JSON.stringify({
        query: text,
        variables,
      })
    );

    return data;
  } catch (e) {
    throw e;
  }
}

// Relay passes a "params" object with the query name and text. So we define a helper function
// to call our fetchGraphQL utility with params.text.
async function fetchRelay(params: RequestParameters, variables: any) {
  return fetchGraphQL(<string>params.text, variables);
}

// const storeObject = new Store(new RecordSource());

// Export a singleton instance of Relay Environment configured with our network function:
export default new Environment({
  network: Network.create(fetchRelay),
  store: new Store(new RecordSource()),
});
