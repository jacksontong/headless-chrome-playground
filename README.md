# Puppeteer docker

```bash
curl --location --request POST 'http://localhost:3000' \
--header 'Content-Type: application/json' \
--data-raw '{
    "url": "https://google.com",
    "paperSize": {
        "format": "a4",
        "printBackground": true,
        "margin": {
            "left": 0,
            "right": 0,
            "top": "25mm",
            "bottom": "25mm"
        }
    }
}'
```
