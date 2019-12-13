json.array! @messages do |message|
  json.text @message.content
  json.created @message.created_at.strftime("%Y/%m/%d %H:%M")
  json.image @message.image.url
  json.user_name  @message.user. name
  json.message_id @message.message_id
end