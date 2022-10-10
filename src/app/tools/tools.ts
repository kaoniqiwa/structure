export function wait(
  whether: () => boolean,
  reject: () => void,
  timeout = 100
) {
  setTimeout(() => {
    if (whether()) {
      reject();
    } else {
      wait(whether, reject, timeout);
    }
  }, timeout);
}

export const ValidLogitude =
  /^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{1,6})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,6}|180)$/;

export const ValidLatitude =
  /^(\-|\+)?([0-8]?\d{1}\.\d{0,6}|90\.0{0,6}|[0-8]?\d{1}|90)$/;
