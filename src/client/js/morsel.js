class Morsel {
  static init () {
    return new this
  }

  constructor () {
    this.setElements()
    this.setHandlers()
  }

  setElements () {
    this.$shortenForm = $('#shorten_form')
    this.$spinner = $('#spinner')
    this.$result = $('#result')
  }

  setHandlers () {
    this.$shortenForm.on('submit', this.handleSubmit.bind(this))
  }

  handleSubmit (event) {
    event.preventDefault()

    this.$result.empty()
    this.$spinner.removeClass('hidden')

    const $form = $(event.target)
    const options = {
      method: 'GET',
      cache: false,
      url: $form.attr('action'),
      data: $form.serialize()
    }

    $.ajax(options).done(this.success.bind(this))
  }

  success (data) {
    this.$shortenForm.find('input[type=url]').val('')
    this.$spinner.addClass('hidden')
    this.$result.attr('href', data)
    this.$result.text(data)
  }
}

export default Morsel
