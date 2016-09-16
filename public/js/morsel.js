var Morsel = {
  init: function () {
    this.setElements()
    this.setHandlers()
  },

  setElements: function () {
    this.$shortenForm = $('#shorten_form')
    this.$spinner = $('#spinner')
    this.$result = $('#result')
  },

  setHandlers: function () {
    this.$shortenForm.on('submit', this.handleSubmit.bind(this))
  },

  handleSubmit: function (event) {
    event.preventDefault()

    this.$result.empty()
    this.$spinner.removeClass('hidden')

    var $form = $(event.target)

    $.ajax({
      method: 'GET',
      cache: false,
      url: $form.attr('action'),
      data: $form.serialize(),
      success: this.success.bind(this)
    })
  },

  success: function (data) {
    this.$shortenForm.find('input[type=url]').val('')
    this.$spinner.addClass('hidden')
    this.$result.attr('href', data)
    this.$result.text(data)
  }
}
