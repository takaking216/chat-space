$(function(){
  function buildHTML(message){
    if (message.image) {
      var html = `<div class="message"> {message-id: #{message.id}}
      <div class="upper-message">
        <div class="upper-message__user-name">
          ${message.user_name}
        </div>
        <div class="upper-message__date">
          ${message.created_at}
        </div>
      </div>
      <div class="lower-message">
        <p class="lower-message__content">
          ${message.content}
        <img src"${message.image.url}">
        </p>
      
      </div>
      </div>`
      }else{
        var html = `<div class="message">
        <div class="upper-message">
          <div class="upper-message__user-name">
            ${message.user_name}
          </div>
          <div class="upper-message__date">
            ${message.created_at}
          </div>
          </div>
        <div class="lower-message">
          <p class="lower-message__content">
            ${message.content}
          <img src"${message.image}">
          </p>
        
        </div>
        </div>`
      return html;
    }
  }
  $(`#new_message`).on('submit', function(e){
    e.preventDefault(e)
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(message){
      var html = buildHTML(message);
      $('.messages').append(html);
      $('.main__chat--footer__message').val('');
      $('.main__chat--footer__send').prop('disabled', false);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    })
  })
})
