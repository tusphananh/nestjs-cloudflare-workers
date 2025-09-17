import { Container, getRandom } from "@cloudflare/containers";

export class MyContainer extends Container<Env> {
  // Port the container listens on (default: 8080)
  defaultPort = 8080;
  // Time before container sleeps due to inactivity (default: 30s)
  sleepAfter = "2m";
  // // Environment variables passed to the container
  // envVars = {
  //   MESSAGE: "I was passed in via the container class!",
  // };

  // // Optional lifecycle hooks
  // override onStart() {
  //   console.log("Container successfully started");
  // }

  // override onStop() {
  //   console.log("Container successfully shut down");
  // }

  // override onError(error: unknown) {
  //   console.log("Container error:", error);
  // }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // note: "getRandom" to be replaced with latency-aware routing in the near future
    const containerInstance = await getRandom(env.MY_CONTAINER, 3);
    const rs = await containerInstance.fetch(request);
    return rs;
  },
};
