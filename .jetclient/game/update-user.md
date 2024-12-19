```toml
name = 'update-user'
method = 'DELETE'
url = 'http://localhost:3000/user/1'
sortWeight = 5000000
id = 'bf72e51e-992c-4db0-a12b-f0ca5789b669'

[body]
type = 'JSON'
raw = '''
{
  "email": "test1@email.com",
}'''
```
