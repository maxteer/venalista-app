import {
  EmitterSubscription,
  NativeEventEmitter,
  NativeModules,
} from 'react-native';

const {UpdaterManager} = NativeModules;

const DL_NativeEventEmitter = new NativeEventEmitter(UpdaterManager);

const convertError = (err: any) => {
  if (err.isOperational && err.cause) {
    err = err.cause;
  }

  var error = new Error(err.description || err.message);
  throw error;
};

type ProgressFunction = (progress: number) => void;

export function downloadUpdate(url: string, progress: ProgressFunction) {
  const subscriptions: EmitterSubscription[] = [];

  subscriptions.push(
    DL_NativeEventEmitter.addListener('UPDATE_DOWNLOAD_PROGRESS', progress),
  );

  const clearSubscriptions = () =>
    subscriptions.forEach(subscription => subscription.remove());

  return UpdaterManager.downloadUpdate(url)
    .then((res: any) => {
      clearSubscriptions();
      return res;
    })
    .catch((err: any) => {
      clearSubscriptions();
      Promise.reject(convertError(err));
    });
}

export function installUpdate() {
  return UpdaterManager.installUpdate().catch((err: any) =>
    Promise.reject(convertError(err)),
  );
}
