import Cookies from "cookies";
import httpProxy from "http-proxy";
import { NextApiRequest, NextApiResponse } from "next";
import url from "url";

// Get the actual API_URL as an environment variable. For real
// applications, you might want to get it from 'next/config' instead.
const API_URL = process.env.API_URL;

const proxy = httpProxy.createProxyServer();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return new Promise((resolve, reject) => {
    const pathname = url.parse(req.url!).pathname;
    const isLogin = pathname === "/api/proxy/login";

    // req.url = req.url.replace(/^\/api\/proxy/, '')
    req.url = req.url!.replace("proxy", "auth");

    req.headers.cookie = "";

    proxy
      .once("proxyRes", (proxyRes) => {
        let responseBody = "";
        proxyRes.on("data", (chunk) => {
          responseBody += chunk;
        });

        if (isLogin) {
          proxyRes.on("end", () => {
            try {
              const { token, email, error } = JSON.parse(responseBody);

              if (token && email) {
                const cookies = new Cookies(req, res);
                cookies.set("token", token, {
                  httpOnly: true,
                  sameSite: "lax", // CSRF protection
                });
                cookies.set("email", email, {
                  httpOnly: true,
                  sameSite: "lax", // CSRF protection
                });
                res.status(proxyRes.statusCode!).json({ loggedIn: true });
              } else {
                res.status(proxyRes.statusCode!).json({ error });
              }
              resolve(null);
            } catch (err) {
              reject(err);
            }
          });
        } else {
          const cookies = new Cookies(req, res);
          const authToken = cookies.get("token");

          if (authToken) {
            req.headers["Authorization"] = `Bearer ${authToken}`;
          }

          proxyRes.on("end", () => {
            const response = JSON.parse(responseBody);

            res.status(proxyRes.statusCode!).json(response);

            resolve(null);
          });
        }
      })
      .once("error", reject)
      .web(req, res, {
        target: "http://localhost:3000",
        autoRewrite: false,
        selfHandleResponse: isLogin,
      });
  });
}
