$(function(){
  function buildHTML(message){
    if (message.image) {
      var html = `<div class="message" data-message-id=${message.id}>
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
      }else{
        var html =  `<div class="message" data-message-id=${message.id}>
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
          </p>
        
        </div>
        </div>`
      return html;
    }
  }

  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    var groupList = window.location.href;
    var result = groupList.match(/\/groups\/\d+\/messages/)

  last_message_id = $('.message').last().data('message')
  if(result){
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      console.log('success');
    })
    .fail(function() {
      console.log('error');
      });
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
  setInterval(reloadMessages, 7000);
})


