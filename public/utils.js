export const getLocation = () => new Promise((resolve, reject) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(resolve);
  } else {
    reject(new Error("Geolocation is not supported by this browser."));
  }
});

export function notify(message) {
  Notification.requestPermission(function(result) {
    if (result === 'granted') {
      navigator.serviceWorker.ready.then(function(registration) {
        registration.showNotification(message, {
          body: 'Buzz! Buzz!',
          vibrate: [200, 100, 200, 100, 200, 100, 200],
          tag: 'vibration-sample'
        });
      });
    }
  });
}

export function uniq(array) {
  const arr = [];

  array.forEach(elt => {
    if (arr.indexOf(elt) === -1) {
      arr.push(elt);
    }
  });

  return arr;
}

function weekOfMonth(date) {
    return Math.floor(date.getDate() / 7) + 1;
}


export class SweepingInfo {
  constructor(payload) {
    this.rawSweepingInfo = this.cleanPayload(payload);
  }

  cleanPayload(payload) {
    // There may be info from several LINESTRINGs.
    // Only return the clostest ones.
    return payload.reduce((memo, value) => {
      if (value.distance < memo.distance) {
        memo.info = [];
        memo.distance = value.distance;
      }

      if (value.distance === memo.distance) {
        memo.info.push(value);
      }

      return memo;
    }, { distance: Infinity, info: [] }).info;
  }

  leftSideInfo() {
    return this.rawSweepingInfo.filter(i => i.cnnrightle === 'L');
  }

  rightSideInfo() {
    return this.rawSweepingInfo.filter(i => i.cnnrightle === 'R');
  }

  buildInfo() {
    const info = {};
    const commonInfo = this.rawSweepingInfo[0];
    info.streetname = commonInfo.streetname;

    info.left = this.leftSideInfo().reduce((memo, value) => {
      memo.fromhour = value.fromhour;
      memo.tohour = value.tohour;
      memo.from_address = value.lf_fadd;
      memo.to_address = value.lf_toadd;
      memo.week1ofmon = value.week1ofmon;
      memo.week2ofmon = value.week2ofmon;
      memo.week3ofmon = value.week3ofmon;
      memo.week4ofmon = value.week4ofmon;
      memo.week5ofmon = value.week5ofmon;
      if (!memo.weekdays) {
        memo.weekdays = [];
      }
      memo.weekdays.push(value.weekday);

      return memo;
    }, {});

    info.right = this.rightSideInfo().reduce((memo, value) => {
      memo.fromhour = value.fromhour;
      memo.tohour = value.tohour;
      memo.from_address = value.rt_fadd;
      memo.to_address = value.rt_toadd;
      memo.week1ofmon = value.week1ofmon;
      memo.week2ofmon = value.week2ofmon;
      memo.week3ofmon = value.week3ofmon;
      memo.week4ofmon = value.week4ofmon;
      memo.week5ofmon = value.week5ofmon;
      if (!memo.weekdays) {
        memo.weekdays = [];
      }
      memo.weekdays.push(value.weekday);

      return memo;
    }, {});

    info.left.weekdays = uniq(info.left.weekdays);
    info.right.weekdays = uniq(info.left.weekdays);

    return info;
  }
}