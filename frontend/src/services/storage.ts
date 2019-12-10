const storage = window.localStorage;

export function set(key: string, value: any): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      storage && storage.setItem(key, JSON.stringify(value));

      resolve();
    } catch (err) {
      reject(`Couldn't store object ${err}`);
    }
  });
}


export function remove(key: string): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      storage && storage.removeItem(key);

      resolve();
    } catch (err) {
      reject(`Couldn't remove object ${err}`);;
    }
  });
}

export function get(key: string): Promise<any> {
  return new Promise((resolve, reject) => {
    try {
      if (storage) {
        const item = storage.getItem(key);

        resolve(JSON.parse(item));
      }

      resolve(undefined);
    } catch (err) {
      reject(`Coudn't get object ${err}`);
    }
  });
}

export const loadState = () => {
  try {
    const state = storage.getItem('state');

    if (state == null) {
      return undefined;
    }

    return JSON.parse(state);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state: any) => {
  // only save certain parts of the state

  let savedState = (({ auth, wishlist}) => ({auth, wishlist}))(state);

  try {
    storage.setItem('state', JSON.stringify(savedState));
  } catch (err) {
    console.log(err);
  }
};
