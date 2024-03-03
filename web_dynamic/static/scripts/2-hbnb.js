$(document).ready(function () {
    const checked_list = {};
    $(document).on('change', "input[type='checkbox']", function () {
        if (this.checked) {
            checked_list[$(this).data('id')] = $(this).data('name');
        } else {
            delete checked_list[$(this).data('id')];
        }
        let lst = Object.values(checked_list);
        if (lst.length > 0) {
            $('div.amenities > h4').text(Object.values(checked_list).join(', '));
        } else {
            $('div.amenities > h4').html('&nbsp;');
        }
    });
    $.get('http://0.0.0.0:5001/api/v1/status/', function (data, status_str) {
      if (status_str === 'success') {
        if (data.status === 'OK') {
          $('#api_status').addClass('available');
        } else {
          $('#api_status').removeClass('available');
        }
      }
    });
});