```toml
name = 'refresh-token'
method = 'POST'
url = 'http://localhost:3000/auth/refreshToken'
sortWeight = 4000000
id = '0e0f5046-df25-416f-99c0-5fcd9d98d8d7'

[body]
type = 'JSON'
raw = '''
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTcyNDI5OTYzMywiZXhwIjoxNzI0OTA0NDMzfQ.P_JPtRkw_5IZvItjIV2d_ZmT_Dvi2w1ncvbTIP5_wqU"
}'''
```
