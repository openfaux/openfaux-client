![OpenFaux](https://raw.github.com/openfaux/openfaux-website/master/HTML/IMG/openfaux-horizontal-2500px.png)

## Client-side core API
Uniform API for dealing with different `chrome` APIs exposed by browsers. Use the `api` object instead of `chrome` object. The api is supposed to look as close to Chromium's API as possible. Reason- Chromium, Chrome, Opera, Safari uses the same API. This project is essentially an adapter for Gecko based browsers to Chromium's API.

### Storage
See http://developer.chrome.com/extensions/storage.html
#### Notes
* Use `api.storage` instead of `chrome.storage`

##### Caveats for Gecko
* All the methods are sync
* Exact information on bytes available/consumed not available
* `runtime.lastError` not currently available
* `storage.managed` not available