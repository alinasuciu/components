import {Observable} from 'rxjs';
import {MeetingControlState} from '@webex/component-adapter-interfaces';
import MeetingControl from './MeetingControl';

/**
 * Display options of a meeting control.
 *
 * @external MeetingControlDisplay
 * @see {@link https://github.com/webex/component-adapter-interfaces/blob/master/src/MeetingsAdapter.js#L58}
 */

export default class DisabledJoinControl extends MeetingControl {
  /**
   * Returns an observable that emits the display data of a disabled meeting control.
   *
   * @returns {Observable.<MeetingControlDisplay>} Observable that emits control display data
   */
  // eslint-disable-next-line class-methods-use-this
  display() {
    return Observable.create((observer) => {
      observer.next({
        ID: this.ID,
        text: 'Join meeting',
        tooltip: 'Join meeting',
        state: MeetingControlState.DISABLED,
      });

      observer.complete();
    });
  }
}
