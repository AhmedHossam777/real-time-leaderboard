```toml
name = 'get-one-user'
method = 'GET'
url = 'http://localhost:3000/user?email=test@email.com'
sortWeight = 3000000
id = '3ca169fe-637a-48f4-a2e4-7de7a64f63ec'

[[queryParams]]
key = 'email'
value = 'test@email.com'

[body]
type = 'JSON'
raw = '''
{
  "email": "test@email.com",
  "password": "123456"
}'''
```
