class ScriptLoaderServiceInstance {
  public loadedScripts: any = {};
  public loadingScripts: any = {};

  loadScript(name, url) {
    if (this.loadedScripts[name] && this.loadedScripts[name] === url) {
      return new Promise(resolve => resolve(true));
    }

    // prevent double-loading of scripts if called from different components at the same time
    if (this.loadingScripts[name] && this.loadingScripts[name] === url) {

      // the script has been requested elsewhere and is waiting on being loaded
      // check for when it's loaded
      return new Promise(resolve => {
        const interval = setInterval(() => {
          if (ScriptLoaderService.loadedScripts[name] === url) {
            clearInterval(interval);
            resolve();
          }
        }, 250);
      });
    }

    this.loadingScripts[name] = url;

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = url;
      script.async = true;
      script.defer = true;

      script.onload = () => {
        this.loadingScripts[name] = null;
        this.loadedScripts[name] = url;
        resolve(true);
      }

      script.onerror = reject;
      script.onabort = reject;

      document.head.appendChild(script);
    });
  }
}

export const ScriptLoaderService = new ScriptLoaderServiceInstance();
