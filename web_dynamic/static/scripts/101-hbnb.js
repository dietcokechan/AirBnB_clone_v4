$(document).ready(function () {
  let checked_a = {};
  let checked_s = {};
  let checked_c = {};
  let checked_p = {};
  $(document).on('change', ".amenities > .popover > li > input[type='checkbox']", function () {
    if (this.checked) {
      checked_a[$(this).data('id')] = $(this).data('name');
    } else {
      delete checked_a[$(this).data('id')];
    }
    let lst = Object.values(checked_a);
    if (lst.length > 0) {
      $('div.amenities > h4').text(Object.values(checked_a).join(', '));
    } else {
      $('div.amenities > h4').html('&nbsp;');
    }
  });
  $(document).on('change', ".locations > .popover > li > input[type='checkbox']", function () {
    if (this.checked) {
      checked_s[$(this).data('id')] = $(this).data('name');
      checked_p[$(this).data('id')] = $(this).data('name');
    } else {
      delete checked_s[$(this).data('id')];
      delete checked_p[$(this).data('id')];
    }
    let lst = Object.values(checked_p);
    if (lst.length > 0) {
      $('div.locations > h4').text(lst.join(', '));
    } else {
      $('div.locations > h4').html('&nbsp;');
    }
  });
  $(document).on('change', ".locations > .popover > li > ul > li > input[type='checkbox']", function () {
    if (this.checked) {
      checked_c[$(this).data('id')] = $(this).data('name');
      checked_p[$(this).data('id')] = $(this).data('name');
    } else {
      delete checked_c[$(this).data('id')];
      delete checked_p[$(this).data('id')];
    }
    let lst = Object.values(checked_p);
    if (lst.length > 0) {
      $('div.locations > h4').text(lst.join(', '));
    } else {
      $('div.locations > h4').html('&nbsp;');
    }
  });
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data, textStatus) {
    if (textStatus === 'success') {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    }
  });
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    data: '{}',
    dataType: 'json',
    contentType: 'application/json',
    success: function (data) {
      for (let i = 0; i < data.length; i++) {
        let place = data[i];
        $('.places ').append('<article><h2>' + place.name + '</h2><div class="price_by_night"><p>$' + place.price_by_night + '</p></div><div class="information"><div class="max_guest"><div class="guest_image"></div><p>' + place.max_guest + '</p></div><div class="number_rooms"><div class="bed_image"></div><p>' + place.number_rooms + '</p></div><div class="number_bathrooms"><div class="bath_image"></div><p>' + place.number_bathrooms + '</p></div></div><div class="description"><p>' + place.description + '</p></div></article>');
      }
    }
  });
  $('.filters > button').click(function () {
    $('.places > article').remove();
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      data: JSON.stringify({ 'amenities': Object.keys(checked_a), 'states': Object.keys(checked_s), 'cities': Object.keys(checked_c) }),
      dataType: 'json',
      contentType: 'application/json',
      success: function (data) {
        for (let i = 0; i < data.length; i++) {
          let place = data[i];
          $('.places ').append('<article><h2>' + place.name + '</h2><div class="price_by_night"><p>$' + place.price_by_night + '</p></div><div class="information"><div class="max_guest"><div class="guest_image"></div><p>' + place.max_guest + '</p></div><div class="number_rooms"><div class="bed_image"></div><p>' + place.number_rooms + '</p></div><div class="number_bathrooms"><div class="bath_image"></div><p>' + place.number_bathrooms + '</p></div></div><div class="description"><p>' + place.description + '</p></div></article>');
        }
      }
    });
  });
  $('.reviewSpan').click(function (event) {
    $.ajax('http://0.0.0.0:5001/api/v1/places/' + $(this).attr('data-id') + '/reviews').done(function (data) {
      $('span').addClass('hideReview');
      if ($('.reviewSpan').text('show')) {
        for (const review of data) {
          $('.reviews ul').append(`<li>${review.text}</li>`);
        }
        console.log($('.reviewSpan li'));
        $('.hideReview').text('hide');
      } else if ($('.hideReview').text('hide')) {
        $('.reviews ul').empty();
        $('.reviewSpan').text('show');
      }
    });
  });
});