```toml
name = 'create-user'
method = 'POST'
url = 'http://localhost:3000/user'
sortWeight = 1000000
id = '5f941454-019a-4011-91b4-7c055a808d23'

[body]
type = 'JSON'
raw = '''
{
  "email": "test@email.com",
  "password": "123456"
}'''
```
