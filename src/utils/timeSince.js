function timeSince(date) {
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 2) {
    return Math.floor(interval) + " years";
  }
  if (interval > 1) {
    return Math.floor(interval) + " year";
  }
  interval = seconds / 2592000;
  if (interval > 2) {
    return Math.floor(interval) + " months";
  }
  if (interval > 1) {
    return Math.floor(interval) + " month";
  }
  interval = seconds / 86400;
  if (interval > 2) {
    return Math.floor(interval) + " days";
  }
  if (interval > 1) {
    return Math.floor(interval) + " day";
  }
  interval = seconds / 3600;
  if (interval > 2) {
    return Math.floor(interval) + " hours";
  }
  if (interval > 1) {
    return Math.floor(interval) + " hour";
  }
  interval = seconds / 60;
  if (interval > 2) {
    return Math.floor(interval) + " minutes";
  }
  if (interval > 1) {
    return Math.floor(interval) + " minute";
  }
  //   return Math.floor(seconds) + " seconds";
  return "less than a minute";
}

export default timeSince;
