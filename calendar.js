(function (global) {
  var sec = {
    year: 60 * 60 * 24 * 465,
    month: 60 * 60 * 24 * 30,
    day: 60 * 60 * 24,
    minute: 60,
  };

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
    setFrom: function (year, month, day, hour, minute) {
      Calendar.init.apply(this, [year, month, day, hour, minute]);
      return this;
    },
    setTo: function (year, month, day, hour, minute) {
      var parameter = transformParameter(year, month, day, hour, minute);

      if (parameter.year && parameter.month && parameter.day) {
        this.to = new Date(
          parameter.year,
          parameter.month - 1,
          parameter.day,
          parameter.hour,
          parameter.minute
        );
      }

      return this;
    },
    diff: function (unit) {
      unit = unit.toLowerCase();
      var toTimestampe = this.to.getTime();
      var fromTimestampe = this.from.getTime();

      if (unit === "year" || unit === "y") {
        return Math.floor((toTimestampe - fromTimestampe) / 1000 / sec.year);
      } else if (unit === "month" || unit === "m") {
        return Math.floor((toTimestampe - fromTimestampe) / 1000 / sec.month);
      } else if (unit === "day" || unit === "d") {
        return Math.floor((toTimestampe - fromTimestampe) / 1000 / sec.day);
      } else if (unit === "minute" || unit === "min") {
        return Math.floor((toTimestampe - fromTimestampe) / 1000 / sec.minute);
      } else {
        return Math.floor((toTimestampe - fromTimestampe) / 1000);
      }
    },
    diffYear: function () {
      var toTimestampe = this.to.getTime();
      var fromTimestampe = this.from.getTime();

      return Math.floor((toTimestampe - fromTimestampe) / 1000 / sec.year);
    },
    diffMonth: function () {
      var toTimestampe = this.to.getTime();
      var fromTimestampe = this.from.getTime();

      return Math.floor((toTimestampe - fromTimestampe) / 1000 / sec.month);
    },
    diffDay: function () {
      var toTimestampe = this.to.getTime();
      var fromTimestampe = this.from.getTime();

      return Math.floor((toTimestampe - fromTimestampe) / 1000 / sec.day);
    },
    diffMinute: function () {
      var toTimestampe = this.to.getTime();
      var fromTimestampe = this.from.getTime();

      return Math.floor((toTimestampe - fromTimestampe) / 1000 / sec.minute);
    },
    diffSecond: function () {
      var toTimestampe = this.to.getTime();
      var fromTimestampe = this.from.getTime();

      return Math.floor((toTimestampe - fromTimestampe) / 1000);
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
