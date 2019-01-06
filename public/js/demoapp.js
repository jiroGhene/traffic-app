$(function () {
  function icon() {
    $("#icon-lights i").each(function (i) {
      $(this).fadeOut(500).fadeIn(500);
    });
    setTimeout(icon, 3000);
  }
  icon();

  $("#select_road").on('change', function () {
    var val = $(this).val();
    var url = '/ajaxRoute/' + val;
    $.get(url, function (data) {
      $('#display_routes').html(data);
    });
  });

  $("#display_routes").on('change', function () {
    var val = parseInt($(this).val());
    var commentsUrl = '/get_comments/' + val;
    var commentboxUrl = '/get_comment_box/' + val;
    $("#comments_wrapper").attr('comm_list', val)
    if (isNaN(val)) {
      $("#comments_wrapper").html('');
      $("#comment_box").html('');
    } else {
      $.get(commentsUrl, function (comments) {
        $.get(commentboxUrl, function (box) {
          $("#comments_wrapper").html(comments);
          $("#comment_box").html(box);
        });
      });
    }
  });

  let socket = io();
  socket.on("append-comment", function (route) {
    var val = parseInt(route);
    var url = '/get_comments/' + val;
    $.get(url, function (comments) {
      $("#comments_wrapper[comm_list='" + val + "']").html(comments);
    });
  });

});
