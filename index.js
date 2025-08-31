const axios = require("axios");

class SmmlaunchApi {
  /**
   * @param {string} apiKey - your API key
   * @param {string} apiUrl - API base url (default: https://smmlaunch.com/api/v2)
   */
  constructor(apiKey, apiUrl = "https://smmlaunch.com/api/v2") {
    this.apiKey = apiKey;
    this.apiUrl = apiUrl;

    this.client = axios.create({
      baseURL: this.apiUrl,
      timeout: 30000,
      headers: {
        "User-Agent": "Mozilla/5.0 (Node.js; Axios)",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  }

  // ------------------- Public APIs -------------------
  order(data) {
    return this._post({ action: "add", ...data });
  }

  status(orderId) {
    return this._post({ action: "status", order: orderId });
  }

  multiStatus(orderIds) {
    return this._post({ action: "status", orders: orderIds.join(",") });
  }

  services() {
    return this._post({ action: "services" });
  }

  refill(orderId) {
    return this._post({ action: "refill", order: orderId });
  }

  multiRefill(orderIds) {
    return this._post({ action: "refill", orders: orderIds.join(",") });
  }

  refillStatus(refillId) {
    return this._post({ action: "refill_status", refill: refillId });
  }

  multiRefillStatus(refillIds) {
    return this._post({ action: "refill_status", refills: refillIds.join(",") });
  }

  cancel(orderIds) {
    return this._post({ action: "cancel", orders: orderIds.join(",") });
  }

  balance() {
    return this._post({ action: "balance" });
  }

  // ------------------- Private Helper -------------------
  async _post(payload) {
    const body = new URLSearchParams({ key: this.apiKey, ...payload }).toString();
    try {
      const { data } = await this.client.post("", body);
      if (typeof data === "string") {
        try { return JSON.parse(data); } catch { return data; }
      }
      return data;
    } catch (err) {
      const res = err.response;
      throw new Error(
        `API error ${res}`
      );
    }
  }
}

module.exports = SmmlaunchApi;
