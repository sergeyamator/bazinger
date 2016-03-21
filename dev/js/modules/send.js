var formAjax = (function() {
  var $form,
      data,
      error = false;


  function setUpListener() {
    $form.on('submit', send);
  }

  function destroySend() {
    $form.off('submit', send);
  }

  function send(e) {
    e.preventDefault();

    var $this    = $(this),
        inputs   = $this.find('input'),
        textarea = $this.find('textarea');

    validate(inputs);
    validate(textarea);

    if (error) return;


    data = $(this).serialize();

    $.ajax({
        type: 'POST',
        url: '/php/mail.php',
        data: data
      })
      .done(function() {
        successMessage($this);
      })
      .fail(function() {
        failMessage($this);
      });
  }

  function successMessage() {
    $('.map_form-wrapper').html('<div class="thank-you">Спасибо</div>');
  }

  function failMessage($this) {
    $('.map_form-wrapper').html('<div class="thank-you.thank-you--error">Ууууп, ошибка</div>');
  }

  function validate(inputs) {
    inputs.each(function() {

      if (!$(this).val().length) {
        $(this).addClass('error');
        error = true;

        $(this).on('keyup', removeError);
      }
    });
  }

  function removeError() {
    if ($(this).val()) {
      $(this).removeClass('error');
      error = false;
    }
  }

  function init(form) {
    $form = form;
    setUpListener();
  }

  return {
    init: init,

    destroySend: destroySend
  }

})();
