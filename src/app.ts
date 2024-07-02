type MyStorageTypeAlias<T> = { [key: string]: T };

abstract class MyLocalStorage<T> {
  constructor(public localStorage: MyStorageTypeAlias<T> = {}) {}

  abstract get(key: string): T | void;
  abstract set(key: string, value: T): void;
  abstract remove(key: string): void;
  abstract clear(): void;

  storageCheckByKey(key: string): boolean {
    if (this.localStorage[key] === undefined) {
      console.log(`Can't find key: ${key}`);
      return false;
    } else {
      return true;
    }
  }
}

class LocalStorage<T> extends MyLocalStorage<T> {
  get(key: string): T | void {
    if (this.storageCheckByKey(key)) {
      return this.localStorage[key];
    } else {
      console.log(`Key ${key} not found`);
    }
  }

  set(key: string, value: T): void {
    if (!this.storageCheckByKey(key)) {
      console.log(`Storage Success`);
      this.localStorage[key] = value;
    } else {
      console.log(`Key ${key} already exists`);
    }
  }

  remove(key: string): void {
    if (this.storageCheckByKey(key)) {
      console.log(`Remove Success`);
      delete this.localStorage[key];
    } else {
      console.log(`Can't find key: ${key}`);
    }
  }

  clear(): void {
    if (Object.keys(this.localStorage).length === 0) {
      console.log(`Already Empty`);
    } else {
      console.log(`Success clear`);
      this.localStorage = {};
    }
  }
}

const stringStorage = new LocalStorage<string>();

stringStorage.set('testKey', 'testValue');
console.log(stringStorage.get('testKey'));
stringStorage.remove('testKey');
console.log(stringStorage.get('testKey'));
stringStorage.set('anotherKey', 'anotherValue');
stringStorage.clear();
console.log(stringStorage.get('anotherKey'));

// geolocation
// geolocation
// geolocation
type Position = {
  latitude: number;
  longitude: number;
  altitude?: string | null;
  accuracy?: string;
  altitudeAccuracy?: string | null;
  heading?: number | null;
  speed?: number | null;
};

type OptionsObj = {
  enableHighAccuracy: boolean;
  timeout: number;
  maximumAge: number;
};

type SuccessFn = (position: Position) => void;
type ErrorFn = (error: Error) => void;

interface MyGeolocation {
  getCurrentPosition(successFn: SuccessFn): void;
  getCurrentPosition(successFn: SuccessFn, errorFn: ErrorFn): void;
  getCurrentPosition(
    successFn: SuccessFn,
    errorFn: ErrorFn,
    optionsObj: OptionsObj
  ): void;

  watchPosition(success: SuccessFn): boolean;
  watchPosition(success: SuccessFn, error: ErrorFn): boolean;
  watchPosition(
    success: SuccessFn,
    error: ErrorFn,
    options: OptionsObj
  ): boolean;

  clearWatch(): void;
}

class BGeolocation implements MyGeolocation {
  private dummyPosition: Position = {
    latitude: 37,
    longitude: 127,
  };

  private watchActive = false;

  getCurrentPosition(successFn: SuccessFn): void;
  getCurrentPosition(successFn: SuccessFn, errorFn: ErrorFn): void;
  getCurrentPosition(
    successFn: SuccessFn,
    errorFn: ErrorFn,
    optionsObj: OptionsObj
  ): void;
  getCurrentPosition(successFn: SuccessFn, errorFn?: ErrorFn): void {
    try {
      const position = this.dummyPosition;
      successFn(position);
    } catch (error) {
      if (errorFn) {
        errorFn(new Error('Failed to get position'));
      }
    }
  }

  watchPosition(success: SuccessFn): boolean;
  watchPosition(success: SuccessFn, error: ErrorFn): boolean;
  watchPosition(
    success: SuccessFn,
    error: ErrorFn,
    options: OptionsObj
  ): boolean;
  watchPosition(success: SuccessFn, error?: ErrorFn): boolean {
    this.watchActive = true;
    try {
      const position = this.dummyPosition;
      success(position);
    } catch (e) {
      if (error) {
        error(new Error('Failed to watch position'));
      }
    }
    return this.watchActive;
  }

  clearWatch(): void {
    this.watchActive = false;
    console.log('Position watching cleared.');
  }
}

const geo = new BGeolocation();
const successFn: SuccessFn = (position) => {
  console.log('Position: ', position);
};
const errorFn: ErrorFn = (error) => {
  console.error('Error: ', error.message);
};
geo.getCurrentPosition(successFn);
geo.getCurrentPosition(successFn, errorFn);

const watchActive = geo.watchPosition(successFn);
geo.watchPosition(successFn, errorFn);

geo.clearWatch();

// https://huchu.link/IY3xgYy