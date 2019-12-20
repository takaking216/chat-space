$(function(){
  function buildHTML(message){
    if (message.content && message.image) {
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
        </p>
        <img src="${message.image}"," class="lower-message__image" >
      </div>
      </div>`
      }else if (message.content){
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
      }else if (message.image) {
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
        <img src="${message.image}"," class="lower-message__image" >
          </p>
        </div>
        </div>`
      }
      return html;
  }

  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    var groupList = window.location.href;
    var result = groupList.match(/\/groups\/\d+\/messages/)

  last_message_id = $('.message:last').data("message-id");
  
  console.log(last_message_id)
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
      // console.log(messages)
      var insertHTML = '';
      //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      })
      //メッセージが入ったHTMLに、入れ物ごと追加
      // console.log(insertHTML)
      $('.main__chat').append(insertHTML);
      $('.main__chat').animate({ scrollTop: $('.main__chat')[0].scrollHeight});
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
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
      console.table(message)
      var html = buildHTML(message);
      $('.main__chat').append(html);
      $('.main__chat--footer__message').val('');
      $('.main__chat--footer__send').prop('disabled', false);
      $('.main__chat').animate({ scrollTop: $('.main__chat')[0].scrollHeight});
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    })
  })
  setInterval(reloadMessages, 7000);
})


