// The interface which define the list of variables
export interface EnvironmentConfig {
  API_URL: string;
  API_CLIENT_ID: string;
  API_CLIENT_SECRET: string;
  BASE_URL: string;
}

export function setupConfig(config: EnvironmentConfig) {
  if (!window) {
      return;
  }

  const win = window as any;
  const StencilApp = win.StencilApp;

  if (StencilApp && StencilApp.config &&
      StencilApp.config.constructor.name !== 'Object') {
      console.error('StencilApp config was already initialized');
      return;
  }

  win.StencilApp = win.StencilApp || {};
  win.StencilApp.config = {
      ...win.StencilApp.config,
      ...config
  };

  return win.StencilApp.config;
}
