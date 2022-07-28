export interface Env {
  API_URL_DEV: string;
  API_URL_TEST: string;
  API_URL_STAGING: string;
  API_URL_PRODUCTION: string;
  PRODUCTION_URL: string;
  DEV_URL: string;
  TESTING_URL: string;
  STAGING_URL: string;
}

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    let API_URL;

    if (request.url === env.PRODUCTION_URL) API_URL = env.API_URL_PRODUCTION;
    else if (request.url === env.STAGING_URL) API_URL = env.API_URL_STAGING;
    else if (request.url === env.TESTING_URL) API_URL = env.API_URL_TEST;
    else API_URL = env.API_URL_DEV;

    const data = await (await fetch(API_URL)).json();

    return new Response(JSON.stringify(data), {
      headers: {
        "content-type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    });
  },
};
