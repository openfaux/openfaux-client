![OpenFaux](https://raw.githubusercontent.com/openfaux/openfaux-website/master/HTML/IMG/openfaux-horizontal-600px.png)

### Browser add-on for encrypting and masking internet traffic.

[![devDependency status](https://david-dm.org/openfaux/openfaux-client/dev-status.png?theme=shields.io)](https://david-dm.org/openfaux/openfaux-client#info=devDependencies)

Our mission is to advance the security of the internet and privacy for all online users. To begin fulfulling our mission, we've began working on OpenFaux. OpenFaux is an open source browser add-on for encrypting and masking internet traffic.

For more information, please see https://www.openfaux.org

**Warning:** OpenFaux is experimental, early-stage software. There may be flaws.

## Threat Model

* MITM attacks, specifically in situations that possible SSL stripping is a factor. 

## Use Case

* John the Journalist is at his local coffee shop and needs to send a very sensitive email over their Wi-Fi network. OpenFaux allows him to send an email over Gmail.com, but to someone sniffing the network it would look as if he’s simply doing a Google search.

## Features

* **Data Obfuscation** - OpenFaux masks your real data with benign data, misleading outsiders looking in.
* **Encryption** - OpenFaux adds an additional layer of security by encrypting the benign data.
* **Hide IP** - By routing your data through servers of your choice, your IP Address is masked.
* **Simplicity** - No manual configuration. UI has been simplified to one-click.
* **Free** - Free software allows for accessibility and aligns with our mission.

## Flowchart
![OpenFaux](https://raw.github.com/openfaux/openfaux-website/master/HTML/IMG/OpenFaux.png)

## Software Stack

* **Server-Side**
 * Python
* **Client-Side**
 * HTML
 * CSS
 * JavaScript
  * AJAX
  * jQuery
* **Website**
 * HTML
 * CSS
 * JavaScript
 * Foundation

## FAQs

* **OpenFaux vs _Proxy_** - Proxies just mask your IP.

* **OpenFaux vs _SSL/TLS_** - SSL/TLS is an encryption standard that we are utilizing. 
 
* **OpenFaux vs _Tor_** - Tor is a network of proxies used for masking your IP. Anyone can host a server and join their network.

* **OpenFaux vs _VPN_** - VPNs (Virtual Private Networks), have you login (private) and enable you to have access to all of the network's resources, including their internet. VPNs have added security measures in place that are used in the connection (tunneling) process and "mask" your IP in a way, but it's a private network so they can see who owns the network then there's records of all of the members so it can be traced back to you.

## Contact

Twitter: `@OpenFaux`

Email: `nbernard[at]openfaux.org`

## License

##### OpenFaux is released under the [GNU Affero General Public License (AGPL3)](https://www.gnu.org/licenses/agpl-3.0.html).
The full license text is included in `LICENSE.txt`.
