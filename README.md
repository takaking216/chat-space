# README

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key:true|

### Association
- belongs_to :group
- belongs_to :user


## usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|string|null: false, foreign_key: true|
|name|string|null: false, foreign_key:true|
|password|string|null: false,foreign_key:true|
|email|string|null: false, foreign_key:true|

### Association
- has_many :groups through :groups_users


## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|group_id|integer|null: false, foreign_key: true|
|group-name|integer|null: false, foreign_key:true|

### Association
- has_many :users through :groups_useers


## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|message_id|integer|null: false, foreign_key: true|
|text|text||
|photo|image||

### Association
- belongs_to :user

