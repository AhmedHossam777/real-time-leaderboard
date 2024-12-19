```toml
name = 'delete-user'
method = 'PATCH'
url = 'http://localhost:3000/user/1'
sortWeight = 6000000
id = 'dfc04786-2fd0-4c17-8537-1166d5dbc00e'

[body]
type = 'JSON'
raw = '''
{
  "email": "test1@email.com",
}'''
```
