Remove-Item -Recurse -Force node_modules/flag-icons/flags/1x1 -ErrorAction SilentlyContinue
$css = Get-Content -Raw node_modules/flag-icons/css/flag-icons.min.css
$patched = $css -replace '\.fi-[a-z0-9-]+\.fis\{background-image:url\(\.\./flags/1x1/[a-z0-9.-]+\.svg\)\}', ''
$patched | Set-Content -NoNewline node_modules/flag-icons/css/flag-icons.4x3.css
