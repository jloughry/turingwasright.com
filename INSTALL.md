First, `scp` new or changed files to the home directory of the web server,
then SSH in.

````
cd ~
sudo mv index.html www
sudo chown -Rv www:www www/*`
````

