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

### /auth/userSignup
- request 

> name : String

> email : String

> password : String

> age : String
 
> sex : String

- response

> token : String

### /auth/userLogin
- request
> email : String
                                                                                                  
> password : String

- response
> token : String

