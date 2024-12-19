```toml
name = 'get-top-player-report'
method = 'GET'
url = 'http://localhost:3000/score/top-players?gameId=2&startDate=2024-08-01&endDate=2024-08-30&limit=10'
sortWeight = 3000000
id = '82d0db7f-34eb-49b8-bfcf-e49c8324b21f'

[[queryParams]]
key = 'gameId'
value = '2'

[[queryParams]]
key = 'startDate'
value = '2024-08-01'

[[queryParams]]
key = 'endDate'
value = '2024-08-30'

[[queryParams]]
key = 'limit'
value = '10'

[auth.bearer]
token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImlhdCI6MTcyNDQ4NjI5MywiZXhwIjoxNzI0NDg3MTkzfQ.GlR905A9BJKYOTPL7pkkULkVYrq1J3dMyVjet4CwHz0'
```
