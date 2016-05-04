(function ($) {

  // Set size.
  setCrepidoSize();
  $(window).on('resize', function() {
    setCrepidoSize();
  });

  // Sets the crepido size.
  function setCrepidoSize() {
    $('.crepido').width(function() {
      var boards = $(this).find('.board');
      var width = parseInt(boards.eq(1).width());
      var gutter = parseInt(boards.eq(1).css('marginLeft'));
      return parseInt(boards.length * width) + parseInt((boards.length - 1) * gutter) + 40;
    });
  }

  // Task status.
  $('.status').each(function() {
    if ($(this).val() == 1) {
      $(this).parent('li').addClass('done');
      $(this)[0].checked = "true";
    }
  });

  // Add tooltip.
  $('[data-toggle="tooltip"]').tooltip();

  // Build progress bar.
  $('.board').each(function() {
    // Build projects array.
    var total = 0;
    var totaldone = 0;

    $(this).find('.timer').each(function() {
      var value = $(this).data().value;
      if ($(this).parent('li').hasClass('done')) {
       totaldone += value;
      };
      total += value;

    });
    
    if (total > 0) {
      $(this).find('.board__header').append('<div class=\"progress\"></div>');
       
      var progress = $('<div class="progress-bar" data-placement="top" data-toggle="tooltip" data-title=""></div>');
      progress.html(Math.floor(totaldone/total * 100) + '%');
      progress.width((totaldone/total * 100) + '%');
      
      $(this).find('.board__header .progress').append(progress);
    }

    $('[data-toggle="tooltip"]').tooltip();
  });

  // Collapsible boards
  $('.board__card--collapsible h1').click(function(e) {
    e.preventDefault();
    $(this).parent('.board__card--collapsible').toggleClass('closed');
  });

  $('.label').click(function(e) {
    e.preventDefault();
    var filterLabel = ($(this).attr('data-name'));
    
    $('.board').find('.label').each(function(){
      if ($(this).attr('data-name') !== filterLabel) {
        $(this).parent('li').toggleClass('hidden');
      }
    });
  });
})(jQuery)
