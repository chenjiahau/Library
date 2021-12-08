(function (global, $) {
  var Calendar = function (year, month, day, hour, minute) {
    return new Calendar.init(year, month, day, hour, minute);
  };

  Calendar.prototype = {};

  Calendar.init = function (year, month, day, hour, minute) {
    var self = this;

    year = parseInt(year);
    month = parseInt(month);
    day = parseInt(day);
    hour = parseInt(hour) || 0;
    minute = parseInt(minute) || 0;
    self.target = null;

    if (year && month && day) {
      self.target = new Date(year, month - 1, day, hour, minute);
    } else {
      self.target = new Date();
    }
  };

  Calendar.init.prototype = Calendar.prototype;

  global.Calendar = Calendar;
})(window);
