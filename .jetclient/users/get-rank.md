```toml
name = 'get-rank'
method = 'GET'
url = 'http://localhost:3000/user/ranking?gameName=FIFA'
sortWeight = 7000000
id = '10183516-8b52-42d9-b509-d96e0053c788'

[[queryParams]]
key = 'gameName'
value = 'FIFA'

[auth.bearer]
token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTcyNDM4NzA2NiwiZXhwIjoxNzI0Mzg3OTY2fQ.3OlaXppDextXuxhmwywNFqLjTxZHm5l4K1vuzm3yIZ4'

[body]
type = 'JSON'
```
