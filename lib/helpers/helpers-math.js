(function() {
  module.exports.register = function(Handlebars, options) {
    Handlebars.registerHelper('add', function(value, addition) {
      return value + addition;
    });
    Handlebars.registerHelper('subtract', function(value, substraction) {
      return value - substraction;
    });
    Handlebars.registerHelper('divide', function(value, divisor) {
      return value / divisor;
    });
    Handlebars.registerHelper('multiply', function(value, multiplier) {
      return value * multiplier;
    });
    Handlebars.registerHelper('floor', function(value) {
      return Math.floor(value);
    });
    Handlebars.registerHelper('ceil', function(value) {
      return Math.ceil(value);
    });
    return Handlebars.registerHelper('round', function(value) {
      return Math.round(value);
    });
  };

}).call(this);