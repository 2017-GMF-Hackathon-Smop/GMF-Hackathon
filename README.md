# ReadMe

# Schema
- email : 유저 아이디
- password : 유저 비밀번호
- age : 유저 나이
- sex : 유저 성별
- name : 유저 이름
- friends : 유저 친구
- token : 유저 토큰

# Query

## Auth

### POST : /auth/userSignup
- request 

> name : String

> email : String

> password : String

> age : String
 
> sex : String

- response

> token : String

### POST : /auth/userLogin
- request
> email : String
                                                                                                  
> password : String

- response
> token : String

## friend

### POST :  /friends/friendSave

- request
> token : String

> friends : String

- response

> Status : 200

### GET : /friends/friendsList

- request
> token : String

- response
> friends model : 친구 목록 array


### GET : /friends/friendsData

- request 
> name : String

- response

> friends model : 친구 정보 array 스키마 참조

## Graph

### GET : /graph/graph

- request 
> 없음 

- require

> graph model : 모든 사용자의 데이터 array

### POST : /graph/userData

- request
> token : String

- response
> graph model : 사용자의 데이터 array

### POST : /graph/updateUserData

- request
> token : String

> graphData : String

- require
> Status 200

## Smoke

### POST : /smoke/getData

- request
> token : String

- require
> smoke array : 사용자의 횟수 데이터 Array

### POST : /smoke/userUpdate

- request
> token : String

- require
> Stauts : 200


## Time

### POST : /time/userData

- request
> token : String

- require
> time model : 유저가 금연 시간 Array

### POST : /time/userDataUpdate

- request
> token : String

- require
> Status : 200:
