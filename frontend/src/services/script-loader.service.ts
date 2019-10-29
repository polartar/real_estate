class ScriptLoaderServiceInstance {
  private loadedScripts: any = {};

  loadScript(name, url) {
    return new Promise((resolve, reject) => {
      if (this.loadedScripts[name] && this.loadedScripts[name] === url) {
        resolve(true);

        return;
      }

      const script = document.createElement('script');
      script.src = url;
      script.async = true;
      script.defer = true;

      script.onload = () => {
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
