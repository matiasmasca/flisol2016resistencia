(function() {
  var actions;

  actions = {
    display_coverage: function(snippet) {
      var color, index, line, line_coverage, line_position, lines, _i, _len, _ref, _results;
      lines = $(snippet).find('pre');
      _ref = $(snippet).data('coverage');
      _results = [];
      for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
        line_coverage = _ref[index];
        color = (function() {
          switch (false) {
            case line_coverage !== null:
              return '#EDEDED';
            case !(line_coverage > 0):
              return '#BCED91';
            default:
              return 'red';
          }
        })();
        line_position = index + 1;
        _results.push(line = lines.find(".line-numbers").eq(line_position).css("background-color", color));
      }
      return _results;
    },
    display_all_coverage: function(article) {
      var snippets;
      return snippets = $(article).find('section[data-coverage]').each((function(_this) {
        return function(index, snippet) {
          return actions.display_coverage(snippet);
        };
      })(this));
    },
    setup_coverage: function() {
      var section, _i, _len, _ref, _results;
      _ref = $("article[data-category='test_infection']");
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        section = _ref[_i];
        _results.push(actions.display_all_coverage(section));
      }
      return _results;
    },
    setup_ignore_rule: function(select_part) {
      $(select_part + " .ignore-rule").hide();
      $(select_part + " article").on("mouseover", function() {
        var ignore;
        ignore = $(this).find(".ignore-rule");
        return ignore.show();
      });
      $(select_part + " article").on("mouseleave", function() {
        var ignore;
        ignore = $(this).find(".ignore-rule");
        return ignore.hide();
      });
      return $(select_part + " a[data-remote]").on("ajax:success", function(e, data, status, xhr) {
        var article, nbr, update_number;
        if (data.message.match('scheduled !')) {
          return;
        }
        if (data.message.match('commented !')) {
          return;
        }
        article = $(this).parents("article");
        article.slideToggle("slow");
        nbr = parseInt(article.data("size"));
        update_number = function(selector, subtrahend) {
          var content, elem, total;
          elem = $(selector);
          content = elem.text();
          total = parseInt(content.match(/\d+/));
          return elem.text(content.replace(/\d+/, total - subtrahend));
        };
        update_number("a[data-filter-category=" + article.data("category") + "]", nbr);
        update_number("a[data-filter-severity=" + article.data("severity") + "]", nbr);
        update_number("#category_button", nbr);
        return update_number("#severity_button", nbr);
      });
    }
  };

  window.actions = actions;

  $(function() {
    actions.setup_coverage();
    return actions.setup_ignore_rule("");
  });

}).call(this);
