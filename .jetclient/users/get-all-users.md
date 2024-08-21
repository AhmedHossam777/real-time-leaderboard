```toml
name = 'get-all-users'
method = 'GET'
url = 'http://localhost:3000/user'
sortWeight = 2000000
id = '70be35c1-2bb5-4ef2-ba42-37035a232a93'

[body]
type = 'JSON'
raw = '''
{
  "email": "test@email.com",
  "password": "123456"
}'''
```
