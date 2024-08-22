```toml
name = 'get-users-by-email'
method = 'GET'
url = 'http://localhost:3000/user/1'
sortWeight = 4000000
id = '1c5d2840-d40f-4020-bf09-b12fb77d91a8'

[body]
type = 'JSON'
raw = '''
{
  "email": "test@email.com",
  "password": "123456"
}'''
```
