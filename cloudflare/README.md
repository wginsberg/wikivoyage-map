To enable CORS on the cloudflare r2 bucket:
```
aws s3api put-bucket-cors --endpoint-url https://eaa9530670776e296794e489f3a5024e.r2.cloudflarestorage.com --bucket pmtiles --cors-configuration file://cors_rules.json
```

To uplad a large file to the cloudflare r2 bucket:
```
aws s3api put-object --bucket pmtiles --endpoint-url https://eaa9530670776e296794e489f3a5024e.r2.cloudflarestorage.com --key protomaps_vector_planet_odbl_z10.pmtiles --body /Users/Will/Downloads/protomaps_vector_planet_odbl_z10.pmtiles
```
