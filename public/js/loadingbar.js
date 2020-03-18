(function( $ ){
  $.fn.animateProgress = function(progress, callback) {
    return this.each(function() {
      $(this).animate({
        width: progress+'%'
      }, {
        duration: 2000,
  
        easing: 'swing',
  
        step: function( progress ){
          var labelEl = $('.ui-label', this);
  
         if (progress >= 7 && labelEl.is(':hidden')) {
            labelEl.html('').fadeIn();
          };
  
          if (Math.ceil(progress) == 100) {
            labelEl.html('Done');
            setTimeout(function() {
              labelEl.fadeOut();
            }, 1000);
          }else if (progress >= 10) {
            labelEl.html('Processing <b>' + Math.ceil(progress) + '%</b>');
          } 
        },
        complete: function(scope, i, elem) {
          if (callback) {
            callback.call(this, i, elem );
          };
        }
      });
    });
  };
})( jQuery );
  
$(function() {
    $('#progress_bar').hide();
    $('#start').click(function() {
      $('#main_content').hide();
      $('#progress_bar').show();
      $('#progress_bar .ui-progress').css('width', '7%').
        animateProgress(43, function() {
          $(this).animateProgress(79, function() {
            setTimeout(function() {
              $('#progress_bar .ui-progress').animateProgress(100, function() {
                $('#progress_bar').hide();
                $('#main_content').slideDown();
              });
            }, 2000);
          });
      });
    });
  
});
