export interface Env {
  API_URL_DEV: string;
  API_URL_TEST: string;
  API_URL_STAGING: string;
  API_URL_PRODUCTION: string;
}

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const data = await (await fetch(env.API_URL_DEV)).json();

    console.log(request.url, ctx);

    return new Response(JSON.stringify(data), {
      headers: {
        "content-type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    });
  },
};
