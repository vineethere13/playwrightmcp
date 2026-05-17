const { request } = require('@playwright/test');

async function createAPIContext() {
  return await request.newContext({
    baseURL: process.env.API_BASE_URL
  });
}

module.exports = {
  createAPIContext
};