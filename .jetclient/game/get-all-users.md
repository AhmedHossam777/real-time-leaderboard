```toml
name = 'get-all-users'
method = 'GET'
url = 'http://localhost:3000/user'
sortWeight = 2000000
id = 'cbf47fd3-0316-4b58-9fc0-bbc419f0768a'

[body]
type = 'JSON'
raw = '''
{
  "email": "test@email.com",
  "password": "123456"
}'''
```
