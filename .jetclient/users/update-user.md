```toml
name = 'update-user'
method = 'DELETE'
url = 'http://localhost:3000/user/1'
sortWeight = 5000000
id = 'dbd50512-8f3f-4ff3-91ee-a8aec485d28f'

[body]
type = 'JSON'
raw = '''
{
  "email": "test1@email.com",
}'''
```
