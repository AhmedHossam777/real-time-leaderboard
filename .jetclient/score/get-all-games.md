```toml
name = 'get-all-games'
method = 'GET'
url = 'http://localhost:3000/game'
sortWeight = 2000000
id = '60e1a5f4-69d0-4304-b3f8-19700be530f8'

[body]
type = 'JSON'
raw = '''
{
  "email": "test@email.com",
  "password": "123456"
}'''
```
