```toml
name = 'login'
method = 'POST'
url = 'whttp://localhost:3000/auth/login'
sortWeight = 2000000
id = 'd3dde889-bad5-4c72-be22-bb2532a58001'

[body]
type = 'JSON'
raw = '''
{
  "email": "admin@admin.com",
  "password": "admin"
}'''
```
