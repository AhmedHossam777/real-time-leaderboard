```toml
name = 'delete-user'
method = 'PATCH'
url = 'http://localhost:3000/user/1'
sortWeight = 6000000
id = '9a771730-39e8-4fb0-b3a2-4cbd268a33b6'

[body]
type = 'JSON'
raw = '''
{
  "email": "test1@email.com",
}'''
```
