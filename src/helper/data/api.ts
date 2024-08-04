import fetch from "node-fetch";
export default async (url: string, gql: any, headers: any): Promise<any> => {
  try {
    let response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(gql),
    });
    let result = await response.text();
    if (result && result.length > 0) {
      result = JSON.parse(result);
    }
    return result;
  } catch (e) {
    console.log("api error:", e);
    throw e;
  }
};
