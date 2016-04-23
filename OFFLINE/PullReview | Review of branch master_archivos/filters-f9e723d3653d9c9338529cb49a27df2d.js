(function() {
  $(function() {
    $('[data-filter-category]').click(function() {
      var category;
      category = $(this).attr('data-filter-category');
      $(".action[data-category!='" + category + "']").hide();
      $(".action[data-category='" + category + "']").show();
      $('#category_button').html($(this).html());
      return e.preventDefault();
    });
    $("[data-filter-severity]").click(function() {
      var severity;
      severity = $(this).attr('data-filter-severity');
      $(".action[data-severity!='" + severity + "']").hide();
      $(".action[data-severity='" + severity + "']").show();
      $('#severity_button').html($(this).html());
      return e.preventDefault();
    });
    $("[data-filter-language]").click(function() {
      var language;
      language = $(this).attr('data-filter-language');
      $(".action[data-language!='" + language + "']").hide();
      $(".action[data-language='" + language + "']").show();
      $('#language_button').html($(this).html());
      return e.preventDefault();
    });
    $("[data-filter-all]").click(function() {
      $(".action").show();
      $('#category_button').html($('#all_categories').html());
      $('#severity_button').html($('#all_severities').html());
      $('#language_button').html($('#all_languages').html());
      return e.preventDefault();
    });
    $("[data-filter-repo]").click(function() {
      switch ($(this).data('filter-repo')) {
        case 'reviewable':
          $(".hidden-repo").hide();
          $(".repo").show();
          break;
        case 'all':
          $(".hidden-repo").show();
          $(".repo").show();
          break;
        case 'hidden':
        case 'unauthorized':
          $(".repo").hide();
          $(".hidden-repo").show();
      }
      $('#repo_button').html($(this).html());
      return e.preventDefault();
    });
    return $("[data-sort-reviews]").click(function(e) {
      var attribute, sorted_reviews;
      attribute = $(this).data('sort-reviews');
      console.log(attribute);
      sorted_reviews = $("article.reviewlist-item").toArray().sort(function(a, b) {
        console.log("coucou" + $(b).data(attribute));
        return $(b).data(attribute) - $(a).data(attribute);
      });
      $(sorted_reviews).appendTo('section.content');
      $('#sort-reviews').html($(this).html());
      return e.preventDefault();
    });
  });

}).call(this);
