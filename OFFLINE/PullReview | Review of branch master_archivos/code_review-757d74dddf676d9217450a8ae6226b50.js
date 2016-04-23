(function() {
  $.fn.textWidth = function(text, font) {
    if (!$.fn.textWidth.fakeEl) {
      $.fn.textWidth.fakeEl = $('<span>').hide().appendTo(document.body);
    }
    $.fn.textWidth.fakeEl.html(text || this.val() || this.text()).css('font', font || this.css('font'));
    return $.fn.textWidth.fakeEl.width();
  };

  (function($, window) {
    var addHelpOn, addTourHelpIcon, createTour;
    addTourHelpIcon = function(tour) {
      $('#main-menu').append('<ul class="nav user-nav"> <li><button id="toggle-tour-markers" class="badge badge-warning tooltip-btn"><i class="fa fa-lightbulb-o icon-lightbulb"></i></button></li> </ul>');
      $('#toggle-tour-markers').on('click', function() {
        tour.markers_visible = !tour.markers_visible;
        $('.tour-marker').css('visibility', tour.markers_visible ? 'visible' : 'hidden');
        if (tour.markers_visible) {
          return tour.restart();
        } else {
          return tour.end();
        }
      });
    };
    window.addTourHelpIcon = addTourHelpIcon;
    createTour = function() {
      var tour;
      tour = new Tour({
        onShown: function(tour) {
          $('.tour-marker').css('visibility', 'visible');
          return $('.tour-marker[data-tour=' + tour._current + ']').css('visibility', 'hidden');
        },
        onEnd: function(tour) {
          return $('.tour-marker').css('visibility', tour.markers_visible ? 'visible' : 'hidden');
        },
        template: '<div class="popover tour"><div class="arrow"></div><button type="button" data-role="end" class="close">&times;</button><h3 class="popover-title"></h3><div class="popover-content"></div><nav class="popover-navigation"><button class="prev pull-left" data-role="prev">&laquo; Prev</button><button class="next pull-right" data-role="next">Next &raquo;</button></nav></div>'
      });
      return tour;
    };
    window.createTour = createTour;
    addHelpOn = function(tour, element, title, content, placement) {
      var bulb, id;
      if (placement == null) {
        placement = 'right';
      }
      id = tour._steps.length;
      bulb = $('<div />');
      bulb.attr('data-tour', id);
      bulb.addClass('tour-marker pointer-btn');
      bulb.append('<span>' + id + '</span>');
      bulb.on('click', function() {
        tour.restart();
        return tour.goto($(this).data('tour'));
      });
      $(element).attr('data-tour', id);
      $(element).addClass('tour-target').wrap('<div class="marker-wrapper" />').before(bulb);
      switch (placement) {
        case 'top':
          bulb.css('top', -bulb.height());
          break;
        case 'bottom':
          bulb.css('bottom', 0);
          break;
        case 'left':
          bulb.css('bottom', 0);
          bulb.css('left', -bulb.width());
          break;
        case 'right':
          bulb.css('bottom', 0);
          bulb.css('right', $(element).textWidth());
      }
      tour.addStep({
        element: '.tour-target[data-tour=' + id + ']',
        title: '<span class="number">' + id + '</span>' + title,
        content: content,
        placement: placement
      });
    };
    return window.addHelpOn = addHelpOn;
  })(jQuery, window);

}).call(this);
/*!
 * jquery.tagcloud.js
 * A Simple Tag Cloud Plugin for JQuery
 *
 * https://github.com/addywaddy/jquery.tagcloud.js
 * created by Adam Groves
 */

(function($) {

  /*global jQuery*/
  "use strict";

  var compareWeights = function(a, b)
  {
    return a - b;
  };

  // Converts hex to an RGB array
  var toRGB = function(code) {
    if (code.length === 4) {
      code = code.replace(/(\w)(\w)(\w)/gi, "\$1\$1\$2\$2\$3\$3");
    }
    var hex = /(\w{2})(\w{2})(\w{2})/.exec(code);
    return [parseInt(hex[1], 16), parseInt(hex[2], 16), parseInt(hex[3], 16)];
  };

  // Converts an RGB array to hex
  var toHex = function(ary) {
    return "#" + jQuery.map(ary, function(i) {
      var hex =  i.toString(16);
      hex = (hex.length === 1) ? "0" + hex : hex;
      return hex;
    }).join("");
  };

  var colorIncrement = function(color, range) {
    return jQuery.map(toRGB(color.end), function(n, i) {
      return (n - toRGB(color.start)[i])/range;
    });
  };

  var tagColor = function(color, increment, weighting) {
    var rgb = jQuery.map(toRGB(color.start), function(n, i) {
      var ref = Math.round(n + (increment[i] * weighting));
      if (ref > 255) {
        ref = 255;
      } else {
        if (ref < 0) {
          ref = 0;
        }
      }
      return ref;
    });
    return toHex(rgb);
  };

  $.fn.tagcloud = function(options) {

    var opts = $.extend({}, $.fn.tagcloud.defaults, options);
    var tagWeights = this.map(function(){
      return $(this).attr("rel");
    });
    tagWeights = jQuery.makeArray(tagWeights).sort(compareWeights);
    var lowest = tagWeights[0];
    var highest = tagWeights.pop();
    var range = highest - lowest;
    if(range === 0) {range = 1;}
    // Sizes
    var fontIncr, colorIncr;
    if (opts.size) {
      fontIncr = (opts.size.end - opts.size.start)/range;
    }
    // Colors
    if (opts.color) {
      colorIncr = colorIncrement (opts.color, range);
    }
    return this.each(function() {
      var weighting = $(this).attr("rel") - lowest;
      if (opts.size) {
        $(this).css({"font-size": opts.size.start + (weighting * fontIncr) + opts.size.unit});
      }
      if (opts.color) {
        $(this).css({"color": tagColor(opts.color, colorIncr, weighting)});
      }
    });
  };

  $.fn.tagcloud.defaults = {
    size: {start: 14, end: 18, unit: "pt"}
  };

})(jQuery);
(function() {
  $(function() {
    var tour, violations_number;
    violations_number = $("#head").data("violations");
    Tinycon.setBubble(violations_number);
    tour = createTour();
    addTourHelpIcon(tour);
    addHelpOn(tour, "#title>h1", "The Review!", "You're on the Review Page! Below, I'll tell you how to improve your code.", "left");
    addHelpOn(tour, ".actions-header", "The Review!", "Filter by severity, category or access the analytics page. This last one contains detailed statistics and trends graph.", "left");
    $(".popup").click(function(event) {
      var height, left, opts, top, url, width;
      width = 575;
      height = 400;
      left = ($(window).width() - width) / 2;
      top = ($(window).height() - height) / 2;
      url = this.href;
      opts = "status=1" + ",width=" + width + ",height=" + height + ",top=" + top + ",left=" + left;
      window.open(url, "twitter", opts);
      return false;
    });
    $.fn.tagcloud.defaults = {
      size: {
        start: 14,
        end: 70,
        unit: 'pt'
      },
      color: {
        start: '#cde',
        end: '#eb0000'
      }
    };
    return $('#tagcloud a').tagcloud();
  });

}).call(this);
