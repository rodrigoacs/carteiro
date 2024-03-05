const { contextBridge } = require('electron');
const axios = require('axios');

contextBridge.exposeInMainWorld('api', {
  makeRequest: async (options) => {
    let startTime = Date.now(); 
    
    let config = {
      url: options.url,
      method: options.method,
      headers: options.headers || {}, 
      data: options.data,
    };

    try {
      const response = await axios(config);
      const endTime = Date.now();

      return {
        data: response.data,
        status: response.status,
        time: endTime - startTime,
        error: false
      };
    } catch (error) {
      console.error('API error:', error);
      const endTime = Date.now();
      const responseTime = endTime - startTime;

      if (error.response) {
        return {
          data: error.response.data,
          status: error.response.status,
          time: responseTime,
          error: true
        };
      } else {
        return {
          data: error.message,
          status: 0,
          time: responseTime,
          error: true
        };
      }
    }
  }
});
