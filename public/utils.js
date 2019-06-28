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

  if (!array) {
    return arr;
  }

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
      memo.blockside = value.blockside;
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
      memo.blockside = value.blockside;
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

  buildSentences() {
    const info = this.buildInfo();
    return {
      streetname: info.streetname,
      left: {
        header: `(${info.left.blockside}) Odd numbers ${info.left.from_address} - ${info.left.to_address}`,
        content: `${info.left.week1ofmon === 'Y' ? '1st, ' : ''}${info.left.week2ofmon === 'Y' ? '2nd, ' : ''}${info.left.week3ofmon === 'Y' ? '3rd, ' : ''}${info.left.week4ofmon === 'Y' ? '4th, ' : ''}${info.left.week5ofmon === 'Y' ? '5th, ' : ''}${info.left.weekdays.join(', ')}, from ${info.left.fromhour} to ${info.left.tohour}`
      },
      right: {
        header: `(${info.right.blockside}) Even numbers ${info.right.from_address} - ${info.right.to_address}`,
        content: `${info.right.week1ofmon === 'Y' ? '1st, ' : ''}${info.right.week2ofmon === 'Y' ? '2nd, ' : ''}${info.right.week3ofmon === 'Y' ? '3rd, ' : ''}${info.right.week4ofmon === 'Y' ? '4th, ' : ''}${info.right.week5ofmon === 'Y' ? '5th, ' : ''}${info.right.weekdays.join(', ')}, from ${info.right.fromhour} to ${info.right.tohour}`
      }
    }
  }
}