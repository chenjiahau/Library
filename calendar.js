(function (global, $) {
  function transformParameter(year, month, day, hour, minute) {
    year = parseInt(year);
    month = parseInt(month);
    day = parseInt(day);
    hour = parseInt(hour) || 0;
    minute = parseInt(minute) || 0;

    return {
      year,
      month,
      day,
      hour,
      minute,
    };
  }

  var Calendar = function (year, month, day, hour, minute) {
    return new Calendar.init(year, month, day, hour, minute);
  };

  Calendar.prototype = {
    setTo: function (year, month, day, hour, minute) {
      var parameter = transformParameter(year, month, day, hour, minute);

      if (parameter.year && parameter.month && parameter.day) {
        this.toDate = new Date(
          parameter.year,
          parameter.month,
          parameter.day,
          parameter.hour,
          parameter.minute
        );
      }

      return this;
    },
  };

  Calendar.init = function (year, month, day, hour, minute) {
    var self = this;
    var parameter = transformParameter(year, month, day, hour, minute);

    self.from = null;
    self.to = null;
    self.year = null;
    self.month = null;
    self.day = null;
    self.timestampe = null;
    self.unixTimestampe = null;

    if (parameter.year && parameter.month && parameter.day) {
      self.from = new Date(
        parameter.year,
        parameter.month - 1,
        parameter.day,
        parameter.hour,
        parameter.minute
      );
      self.year = parameter.year;
      self.month = parameter.month;
      self.day = parameter.day;
    } else {
      self.from = new Date();
      self.year = self.from.getFullYear();
      self.month = self.from.getMonth() + 1;
      self.day = self.from.getDate();
    }

    self.timestampe = self.from.getTime();
    self.unixTimestampe = self.timestampe / 1000;
  };

  Calendar.init.prototype = Calendar.prototype;

  global.Calendar = Calendar;
})(window);
