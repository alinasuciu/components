import {Observable} from 'rxjs';

/**
 * Helper function for deep merge on objects.
 *
 * @param {object} dest - The destination object.
 * @param {object} src - The source object.
 */
export function deepMerge(dest, src) {
  const result = dest;

  for (const [key, val] of Object.entries(src)) {
    if (val?.constructor === Object) {
      deepMerge(result[key], val);
    } else {
      result[key] = val;
    }
  }
}

/**
 * Custom rxjs operator for chaining dependent observables.
 * Usage:
  ```js
  obs.pipe(
    chainWith((lastMessage) => createDependentObservable(lastMessage),
  );
  ```
 * @param {function(lastMessage): Observable} createDependentObservable  Function that is passed the last message emitted by the source observable and returns a new observable
 * @returns {Observable} observable
 */
export function chainWith(createDependentObservable) {
  return (source) => new Observable((subscriber) => {
    let lastValue;
    let subscription;

    subscription = source.subscribe(
      (value) => {
        subscriber.next(value);
        lastValue = value;
      },
      (error) => subscriber.error(error),
      () => {
        subscription = createDependentObservable(lastValue).subscribe(
          (value) => subscriber.next(value),
          (error) => subscriber.error(error),
          () => subscriber.complete(),
        );
      },
    );

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  });
}

export default {
  deepMerge,
  chainWith,
};
